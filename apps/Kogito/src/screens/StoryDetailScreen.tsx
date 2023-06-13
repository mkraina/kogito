import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import HTML from 'react-native-render-html';
import YoutubePlayer from 'react-native-youtube-iframe';
import type {RouteProp} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

import MainContainer from '../components/container/MainContainer/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import MainHeader from '../components/container/MainHeader/MainHeader';
import Text from '../components/primitives/Text';
import {useStoryContent} from '../modules/content/useStoryContent';
import type {RootStackParamList} from '../navigation/Navigation';
import useMixPanelTracking from '../tracking/useMixPanelTracking';

export type StoryDetail = RouteProp<RootStackParamList, 'StoryDetail'>;

const styles = StyleSheet.create({
  p: {
    textAlign: 'justify',
    marginBottom: 12,
    fontSize: 18,
  },
  li: {
    fontSize: 18,
    margin: 0,
    padding: 0,
    lineHeight: 20,
  },
});

const StoryDetailScreen: React.FC = () => {
  const route = useRoute<StoryDetail>();
  const [playing, setPlaying] = useState(false);
  const {story} = useStoryContent(route.params.id);
  const {trackStoryOpened, trackStoryCompleted} = useMixPanelTracking();

  const onStateChange = (state: string) => {
    if (state === 'ended') {
      if (story) {
        trackStoryCompleted(story.title, 0);
      }
      setPlaying(false);
    }
    if (state !== 'playing') {
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (story) {
      trackStoryOpened(story.title, 0);
    }
  }, [story]);

  return (
    <SafeAreaView>
      {story && (
        <MainContainerWrapper>
          <MainHeader />
          <ScrollView>
            <MainContainer color="white" page="sub">
              <Text textVariant="header">{story.title}</Text>
              {story.videoLink && (
                <View>
                  <YoutubePlayer
                    forceAndroidAutoplay={true}
                    height={200}
                    play={playing}
                    videoId={story.videoLink}
                    onChangeState={onStateChange}
                  />
                  <TouchableOpacity
                    style={{
                      top: 0,
                      height: 50,
                      width: '100%',
                      position: 'absolute',
                    }}
                  />
                </View>
              )}
              <HTML source={{html: story.content}} tagsStyles={styles} />
            </MainContainer>
          </ScrollView>
        </MainContainerWrapper>
      )}
    </SafeAreaView>
  );
};

export default StoryDetailScreen;
