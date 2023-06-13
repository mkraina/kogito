import type {MixpanelProperties} from 'mixpanel-react-native';

import {useMixPanelTrackingContext} from './MixPanelTracking';

const useMixPanelTracking = () => {
  const mixPanel = useMixPanelTrackingContext();

  const track = (eventName: string, properties?: MixpanelProperties) => {
    console.log(`Tracking ${eventName} with properties`, properties);
    mixPanel.track(eventName, properties);
  };

  const identifyUser = async (userId: string) => {
    mixPanel.alias(userId, await mixPanel.getDistinctId());
    mixPanel.identify(userId);
    // mixPanel.getPeople().set('$email', email);
  };

  return {
    identifyUser,
    trackRegistrationPhoneNumberEntered: () => {
      track('Registration Phone Number Entered');
    },
    trackApplicationOpened: () => {
      track('Application opened');
    },
    trackRelaxationOpened: (
      relaxationTitle: string,
      relaxationLevel?: string | number,
    ) => {
      track('Relaxation opened', {
        relaxationTitle,
        relaxationLevel,
      });
    },
    trackRelaxationCompleted: (
      relaxationTitle: string,
      relaxationLevel: string,
    ) => {
      track('Relaxation completed', {
        relaxationTitle,
        relaxationLevel,
      });
    },
    trackEmotionTrackingOpened: () => {
      track('Emotion Tracking opened');
    },
    trackEmotionEvaluated: (mood: string, lastMood: string) => {
      track('Emotion Evaluated', {
        mood,
        lastMood,
      });
    },
    trackJournalOpened: () => {
      track('Journal Opened');
    },
    trackJournalEntryAdded: () => {
      track('Journal Entry Added');
    },
    trackJournalEntryOpened: () => {
      track('Journal Entry Opened');
    },
    trackDayPlannerOpened: () => {
      track('Day Planner Opened');
    },
    trackTodoScreenOpened: () => {
      track('Todo Screen Opened');
    },
    trackTodoCreated: () => {
      track('Todo Created');
    },
    trackTodoCompleted: () => {
      track('Todo Completed');
    },
    trackTodoDeleted: () => {
      track('Todo Deleted');
    },
    trackLessonOpened: (lessonTitle: string, lessonLevel: number) => {
      track('Lesson Opened', {
        lessonTitle,
        lessonLevel,
      });
    },
    trackLessonCompleted: (lessonTitle: string) => {
      track('Lesson completed', {
        lessonTitle,
      });
    },
    trackStoryOpened: (storyTitle: string, storyLevel: number) => {
      track('Story opened', {
        storyTitle,
        storyLevel,
      });
    },
    trackStoryCompleted: (storyTitle: string, storyLevel: number) => {
      track('Story completed', {
        storyTitle,
        storyLevel,
      });
    },
    trackLevelProgressed: (
      newLevel: number,
      maxLevel: number,
      currentMaxLevel: number,
    ) => {
      track('Level Progressed', {
        newLevel,
        maxLevel,
        currentMaxLevel,
      });
    },
    trackViciousCycleOpened: () => {
      track('Vicious cycle opened');
    },
    trackViciousCycleEdited: () => {
      track('Vicious cycle edited');
    },
    trackToolsScreenOpened: () => {
      track('Tools screen opened');
    },
    trackRelaxationScreenOpened: () => {
      track('Relaxations screen opened');
    },
    trackTasksScreenOpened: () => {
      track('Tasks screen opened');
    },
    trackSwitchJourneyScreenOpened: () => {
      track('Switch screen opened');
    },
    trackSwitchJourney: (id: string) => {
      track('Switch journey', {
        newJourney: id,
      });
    },
  };
};

export default useMixPanelTracking;
