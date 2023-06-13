import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import ArticleListBox from '../components/primitives/ArticleListBox';
import Text from '../components/primitives/Text';
import {useContent} from '../modules/content/useContent';
import type {AppScreen} from '../navigation/Navigation';

const StoriesListScreen: AppScreen<'StoriesList'> = ({navigation}) => {
  const {stories} = useContent();

  return (
    <SafeAreaView>
      <MainContainerWrapper>
        <MainHeader />
        <ScrollView>
          <MainContainer color="white" page="dashboard">
            <MainContainer page="subWithoutFooter">
              <Text
                style={{
                  marginTop: -40,
                }}
                textVariant="headerSub">
                Příběhy
              </Text>
              {stories.map(story => (
                <ArticleListBox
                  key={story.id}
                  buttonText={story.videoLink ? 'Přehrát' : 'Přečíst'}
                  title={story.title}
                  onPress={() =>
                    navigation.navigate('StoryDetail', {id: story.id})
                  }
                />
              ))}
            </MainContainer>
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </SafeAreaView>
  );
};

export default StoriesListScreen;
