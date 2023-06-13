import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Button from '../components/primitives/Button';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Text from '../components/primitives/Text';
import {useSelectJourney} from '../modules/content/useSelectJourney';
import QuestionnaireWidget from '../modules/questionnaire/components/QuestionnaireWidget';
import {useAfterMonthQuestionnaireQuery} from '../modules/questionnaire/useAfterMonthQuestionnaireQuery';
import {useMeQuery} from '../modules/user/useMeQuery';
import type {AppScreen} from '../navigation/Navigation';

const AfterMonthQuestionnaireScreen: AppScreen<'AfterMonthQuestionnaire'> = ({
  navigation,
}) => {
  const {haveToChooseJourney, questionnaire, loading, refetch} =
    useAfterMonthQuestionnaireQuery();
  const {selectJourneyMutation} = useSelectJourney();
  // eslint-disable-next-line no-empty-pattern
  const {} = useMeQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (!questionnaire && loading) {
    return <Text textVariant="header">Loading</Text>;
  }

  const allFinished =
    questionnaire?.questionnaires.filter(item => !item.finished).length === 0;

  const handlePress = async () => {
    if (haveToChooseJourney) {
      navigation.navigate('SelectJourneyScreen');
    } else {
      await selectJourneyMutation();
      navigation.replace('Dashboard');
    }
  };

  return (
    <ColoredSafeAreaView>
      <MainContainerWrapper>
        <ScrollView>
          <MainContainer align="left" style={{marginBottom: 48}}>
            <Text textVariant="header">Dobrý den,</Text>

            {questionnaire?.occasion === 2 && (
              <Text>
                již je to měsíc od Vašeho prvního přihlášení do Kogito . Prosíme
                Vás o druhé vyplnění dotazníků, tak abychom mohli určit, jak
                aplikace pomáhá.
              </Text>
            )}
            {questionnaire?.occasion === 1 && (
              <Text>
                již je to měsíc od Vašeho prvního přihlášení do Kogito:).
                Prosíme Vás o druhé vyplnění dotazníků. Díky tomu budeme schopni
                určit, jak aplikace pomáhá. Po jejich vyplnění se Vám již
                zpřístupní celý obsah Kogito. Moc děkujeme za spolupráci a
                doufáme, že se Vám obsah bude líbit.
              </Text>
            )}
            {questionnaire?.occasion === 2 && (
              <>
                <Text />
                <Text>Moc děkujeme!</Text>
              </>
            )}
            <Text>Tým Kogito</Text>

            <View style={{marginTop: 15, width: '100%'}}>
              {questionnaire &&
                questionnaire.questionnaires.map(item => (
                  <QuestionnaireWidget
                    key={item.id}
                    count={item.questionnaire.questionCount}
                    finished={item.finished}
                    name={item.questionnaire.name}
                    press={() =>
                      !item.finished &&
                      navigation.navigate('AfterMonthQuestionnaireDetail', {
                        id: item.id,
                      })
                    }
                  />
                ))}
            </View>
            {allFinished && (
              <Button
                style={{
                  marginTop: 14,
                }}
                title="Dokončit"
                onPress={handlePress}
              />
            )}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default AfterMonthQuestionnaireScreen;
