import {useCallback, useEffect, useState} from 'react';

import type {Question, UserAnswer} from '../../../gql/__generated__/graphql';

import {useQuestionnaireDetail} from './useQuestionnaireDetail';
import {useUpdateQuestionnaire} from './useUpdateQuestionnaire';

export const useQuestionnaireBackup = (id: string) => {
  const {questionnaire} = useQuestionnaireDetail(id);
  const {saveUserQuestionnaire} = useUpdateQuestionnaire();

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const [actualAnswer, setActualAnswer] = useState<number | null>(null);
  const [actualQuestion, setActualQuestion] = useState<Question | null>(null);

  const [havePrevious, setHavePrevious] = useState(false);
  const [haveNext, setHaveNext] = useState(false);
  const [finished, setFinished] = useState(false);

  const saveProgress = useCallback(async () => {
    if (userAnswers.length) {
      console.log('save!');
      await saveUserQuestionnaire(id, userAnswers);
    }
  }, [saveUserQuestionnaire, id, userAnswers]);

  const solvePosition = useCallback(async () => {
    if (questionnaire) {
      const savePromise = saveProgress();

      const questions = questionnaire.questionnaire.questions;

      const index = actualQuestion ? questions.indexOf(actualQuestion) : 0;

      console.log('Index', actualQuestion, index);

      setHavePrevious(index >= 0);
      setHaveNext(questions.length >= index);

      if (actualQuestion && userAnswers) {
        const haveAnswer = userAnswers.find(
          answer => answer.questionId === actualQuestion.id,
        );

        setActualAnswer(haveAnswer ? haveAnswer.answerIndex : null);
      } else {
        setActualAnswer(null);
      }

      await savePromise;
    }
  }, [
    questionnaire,
    actualQuestion,
    setHavePrevious,
    setHaveNext,
    userAnswers,
    setActualAnswer,
    saveProgress,
  ]);

  const previousQuestion = useCallback(async () => {
    if (questionnaire && actualQuestion) {
      const questions = questionnaire.questionnaire.questions;
      const index = questions.indexOf(actualQuestion);

      if (index - 1 >= 0) {
        setActualQuestion(questions[index - 1]);
      }
    }

    await solvePosition();
  }, [questionnaire, actualQuestion, solvePosition]);

  const nextQuestion = useCallback(async () => {
    let applyFinished = false;
    if (questionnaire) {
      const questions = questionnaire.questionnaire.questions;
      let next = null;
      if (actualQuestion) {
        const index = questions.indexOf(actualQuestion);

        if (questions.length > index + 1) {
          next = questions[index + 1];
        }

        if (questions.length === index + 1) {
          applyFinished = true;
        }
      } else if (questions.length) {
        next = questions[0];
        console.log({next});

        const prepare = questionnaire.answers.map(answer => {
          return {
            answerIndex: answer.answerIndex,
            questionId: answer.questionId,
          };
        });
        setUserAnswers(prepare);
      }

      if (next) {
        setActualQuestion(next);
      }
    }

    await solvePosition();

    if (applyFinished) {
      setFinished(true);
    }
  }, [
    questionnaire,
    setUserAnswers,
    actualQuestion,
    setActualQuestion,
    setFinished,
    solvePosition,
  ]);

  const saveAnswer = useCallback(
    (index: number) => {
      if (actualQuestion && userAnswers) {
        setActualAnswer(index);

        const answers = [...userAnswers];

        const answer = answers.find(a => a.questionId === actualQuestion.id);

        if (answer) {
          const answerIndex = answers.indexOf(answer);

          console.log({answers, answerIndex});
          answers[answerIndex].answerIndex = index;
        } else {
          answers.push({
            questionId: actualQuestion.id,
            answerIndex: index,
          });
        }

        setUserAnswers(answers);
      }
    },
    [setActualAnswer, userAnswers, setUserAnswers, actualQuestion],
  );

  useEffect(() => {
    console.log('Effect', questionnaire);
    setActualQuestion(null);
    setActualAnswer(null);

    setHavePrevious(false);
    setHaveNext(false);
    setFinished(false);

    setUserAnswers([]);

    if (questionnaire) {
      nextQuestion().then();
    }
  }, [questionnaire]);

  return {
    actualQuestion,
    actualAnswer,

    havePrevious,
    haveNext,
    finished,

    saveAnswer,
    previousQuestion,
    nextQuestion,
  };
};
