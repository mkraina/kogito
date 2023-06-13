import {useEffect, useState} from 'react';

import type {Question, UserAnswer} from '../../../gql/__generated__/graphql';

import {useQuestionnaireDetail} from './useQuestionnaireDetail';
import {useUpdateQuestionnaire} from './useUpdateQuestionnaire';

export const useQuestionnaire = (id: string) => {
  const {questionnaire} = useQuestionnaireDetail(id);
  const {saveUserQuestionnaire} = useUpdateQuestionnaire();

  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const [actualAnswer, setActualAnswer] = useState<number | null>(null);
  const [actualQuestion, setActualQuestion] = useState<Question | null>(null);

  const [havePrevious, setHavePrevious] = useState(false);
  const [haveNext, setHaveNext] = useState(false);
  const [finished, setFinished] = useState(false);

  const [questionCount, setQuestionCount] = useState(0);
  const [actualIndex, setActualIndex] = useState(0);

  const saveProgress = async () => {
    if (userAnswers.length) {
      await saveUserQuestionnaire(id, userAnswers);
    }
  };

  const solvePosition = () => {
    if (questionnaire) {
      const questions = questionnaire.questionnaire.questions;

      setQuestionCount(questions.length);

      const index = actualQuestion ? questions.indexOf(actualQuestion) : 0;

      setActualIndex(index);

      setHavePrevious(index > 0);
      setHaveNext(questions.length >= index);

      if (actualQuestion) {
        const haveAnswer = userAnswers.find(
          answer => answer.questionId === actualQuestion.id,
        );

        setActualAnswer(haveAnswer ? haveAnswer.answerIndex : null);
      } else {
        setActualAnswer(null);
      }
    }
  };

  const previousQuestion = () => {
    if (questionnaire && actualQuestion) {
      const questions = questionnaire.questionnaire.questions;
      const index = questions.indexOf(actualQuestion);

      if (index - 1 >= 0) {
        setActualQuestion(questions[index - 1]);
      }
    }
  };

  const nextQuestion = () => {
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

    if (applyFinished) {
      setFinished(true);
    }
  };

  const saveAnswer = (index: number) => {
    if (actualQuestion && userAnswers) {
      setActualAnswer(index);

      const answers = [...userAnswers];

      const answer = answers.find(a => a.questionId === actualQuestion.id);

      if (answer) {
        const answerIndex = answers.indexOf(answer);
        answers[answerIndex].answerIndex = index;
      } else {
        answers.push({
          questionId: actualQuestion.id,
          answerIndex: index,
        });
      }

      setUserAnswers(answers);
    }
  };

  useEffect(() => {
    saveProgress().then();
  }, [actualAnswer, finished]);

  useEffect(() => {
    if (actualQuestion) {
      solvePosition();
    }
  }, [actualQuestion]);

  useEffect(() => {
    setActualQuestion(null);
    setActualAnswer(null);

    setHavePrevious(false);
    setHaveNext(false);
    setFinished(false);

    setQuestionCount(0);
    setActualIndex(0);

    setUserAnswers([]);

    if (questionnaire) {
      nextQuestion();
    }
  }, [questionnaire]);

  return {
    actualQuestion,
    actualAnswer,

    havePrevious,
    haveNext,
    finished,

    questionCount,
    actualIndex,

    saveAnswer,
    previousQuestion,
    nextQuestion,
  };
};
