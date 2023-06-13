import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Button from '../components/primitives/Button';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import Text from '../components/primitives/Text';
import QuestionnaireWidget from '../modules/questionnaire/components/QuestionnaireWidget';
import {useUserQuestionnairesQuery} from '../modules/questionnaire/useUserQuestionnairesQuery';
import {useMeQuery} from '../modules/user/useMeQuery';

const AvailableQuestionnairesScreen: React.FC = () => {
  const navigation = useNavigation();
  const {userQuestionnaires, userState, loading, refetch} =
    useUserQuestionnairesQuery();
  // eslint-disable-next-line no-empty-pattern
  const {} = useMeQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (!userQuestionnaires && loading) {
    return <Text textVariant="header">Loading</Text>;
  }

  const allFinished =
    userQuestionnaires?.filter(item => !item.finished).length === 0 &&
    !!userState?.userInfoCompleted;

  return (
    <ColoredSafeAreaView>
      <MainContainerWrapper>
        <ScrollView>
          <MainContainer align="left" style={{marginBottom: 48}}>
            <Text textVariant="header">Dotazník</Text>

            <View style={{marginTop: 15, width: '100%'}}>
              <QuestionnaireWidget
                count={10}
                finished={!!userState?.userInfoCompleted}
                name="Základní údaje"
                press={() =>
                  !userState?.userInfoCompleted &&
                  navigation.navigate('FinishRegistrationScreen')
                }
              />

              {userQuestionnaires &&
                userQuestionnaires.map(item => (
                  <QuestionnaireWidget
                    key={item.id}
                    count={item.questionnaire.questionCount}
                    finished={item.finished}
                    name={item.questionnaire.name}
                    press={() =>
                      !item.finished &&
                      navigation.navigate('QuestionnaireScreen', {
                        id: item.id,
                      })
                    }
                  />
                ))}
            </View>
            <Text style={{marginTop: 14}}>
              Vyplnění celého dotazníku zabere cca 15 minut.
            </Text>
            {allFinished && (
              <Button
                style={{
                  marginTop: 14,
                }}
                title="Dokončit"
                onPress={() => navigation.navigate('QuestionnaireResultScreen')}
              />
            )}
            {/*<Button*/}
            {/*  title="Začít"*/}
            {/*  onPress={() => navigation.navigate('Dashboard')}*/}
            {/*  style={{*/}
            {/*    marginTop: 14,*/}
            {/*  }}*/}
            {/*/>*/}
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default AvailableQuestionnairesScreen;
