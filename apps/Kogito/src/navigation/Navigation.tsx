import React from 'react';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {StackScreenProps} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';

import IconMyDay from '../assets/icon-my-day.svg';
import IconRoad from '../assets/icon-road.svg';
import IconSun from '../assets/icon-sun.svg';
import IconTodo from '../assets/icon-todo.svg';
import AfterMonthQuestionnaireDetailScreen from '../screens/AfterMonthQuestionnaireDetailScreen';
import AfterMonthQuestionnaireScreen from '../screens/AfterMonthQuestionnaireScreen';
import ArticleScreen from '../screens/ArticleScreen';
import AudioScreen from '../screens/AudioScreen';
import AvailableQuestionnairesScreen from '../screens/AvailableQuestionnairesScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DiaryEditScreen from '../screens/DiaryEditScreen';
import DiaryScreen from '../screens/DiaryScreen';
import FinishRegistrationScreen from '../screens/FinishRegistrationScreen';
import JourneyProgressScreen from '../screens/JourneyProgressScreen';
import JourneyScreen from '../screens/JourneyScreen';
import JourneySwitchScreen from '../screens/JourneySwitchScreen';
import LoginScreen from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogoutScreen';
import MoodListScreen from '../screens/MoodListScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import QuestionnaireResultScreen from '../screens/QuestionnaireResultScreen';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RelaxationScreen from '../screens/RelaxationScreen';
import ScheduleDayScreen from '../screens/ScheduleDayScreen';
import SelectJourneyScreen from '../screens/SelectJourneyScreen';
import SplashScreen from '../screens/SplashScreen';
import StoriesListScreen from '../screens/StoriesListScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';
import TermsScreen from '../screens/TermsScreen';
import TodosScreen from '../screens/TodosScreen';
import ViciousCircleEditScreen from '../screens/ViciousCircleEditScreen';
import ViciousCircleScreen from '../screens/ViciousCircleScreen';
import VideoScreen from '../screens/VideoScreen';

export type RootStackParamList = {
  AfterMonthQuestionnaire: undefined;
  AfterMonthQuestionnaireDetail: {id: string};
  Article: {id: string};
  Audio: {id: string};
  Dashboard: undefined;
  Diary: undefined;
  DiaryEdit: {id: string | null};
  JourneySwitch: undefined;
  Login: undefined;
  Logout: undefined;
  MoodList: undefined;
  ProfileSettings: undefined;

  Registration: undefined;
  ScheduleDay: undefined;

  SelectJourneyScreen: undefined;

  Signpost: undefined;
  Splash: undefined;

  StoriesList: undefined;

  StoryDetail: {id: string};

  Terms: undefined;
  Todos: undefined;
  ViciousCircle: undefined;

  ViciousCircleEdit: {id: string | null};

  Video: {id: string};
};

export type RegistrationStackParamList = {
  AvailableQuestionnaires: undefined;
  FinishRegistrationScreen: undefined;
  QuestionnaireResultScreen: undefined;
  QuestionnaireScreen: {id: string};
  Register: undefined;
  SelectJourneyScreen: undefined;
};

export type DashboardStackParamList = {
  Journey: {id: string; level: number};
  MyDay: undefined;
};

type DashboardTabParamList = Record<
  'DashboardTab' | 'JourneyProgress' | 'Relaxation' | 'Todos',
  undefined
>;
//TODO: is it actually used?
type UnusedScreensParamList = {
  RelaxationLocked: undefined;
  RoadPhase: undefined;
  RoadRelaxation: undefined;
  RoadTodos: undefined;
  RoadTools: undefined;
};
export type AppParamList = DashboardStackParamList &
  RegistrationStackParamList &
  RootStackParamList &
  DashboardTabParamList &
  UnusedScreensParamList;

export type AppScreenName = keyof AppParamList;

export type AppScreen<T extends AppScreenName> = React.FC<
  T extends keyof DashboardTabParamList
    ? BottomTabScreenProps<DashboardTabParamList, T> &
        StackScreenProps<AppParamList, T>
    : StackScreenProps<AppParamList, T>
>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends AppParamList {}
  }
}

const Stack = createStackNavigator<RootStackParamList>();
const RegistrationStack = createStackNavigator<RegistrationStackParamList>();
const DashboardStack = createStackNavigator<DashboardStackParamList>();

const UnfinishedRegistrationScreens: React.FC = () => {
  return (
    <RegistrationStack.Navigator initialRouteName="Register">
      <RegistrationStack.Screen
        component={RegisterScreen}
        name="Register"
        options={{headerShown: false}}
      />
      <RegistrationStack.Screen
        component={AvailableQuestionnairesScreen}
        name="AvailableQuestionnaires"
        options={{headerShown: false}}
      />
      <RegistrationStack.Screen
        component={QuestionnaireScreen}
        name="QuestionnaireScreen"
        options={{headerShown: false}}
      />
      <RegistrationStack.Screen
        component={QuestionnaireResultScreen}
        name="QuestionnaireResultScreen"
        options={{headerShown: false}}
      />
      <RegistrationStack.Screen
        component={SelectJourneyScreen}
        name="SelectJourneyScreen"
        options={{headerShown: false}}
      />
      <RegistrationStack.Screen
        component={FinishRegistrationScreen}
        name="FinishRegistrationScreen"
        options={{headerShown: false}}
      />
    </RegistrationStack.Navigator>
  );
};

const DashboardScreens: React.FC = () => {
  return (
    <DashboardStack.Navigator initialRouteName="MyDay">
      <DashboardStack.Screen
        component={DashboardScreen}
        name="MyDay"
        options={{headerShown: false}}
      />
      <DashboardStack.Screen
        component={JourneyScreen}
        name="Journey"
        options={{headerShown: false}}
      />
    </DashboardStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<DashboardTabParamList>();

const DashboardTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#F2AC33',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {height: 80, paddingTop: 12, paddingBottom: 22},
        tabBarIcon: ({focused}) => {
          const iconColor = focused ? '#F2AC33' : '#8e8e93';

          switch (route.name) {
            case 'DashboardTab':
              return <IconMyDay color={iconColor} />;
            case 'JourneyProgress':
              return <IconRoad color={iconColor} />;
            case 'Relaxation':
              return <IconSun color={iconColor} />;
            case 'Todos':
              return <IconTodo color={iconColor} />;
          }
        },
      })}>
      <Tab.Screen
        component={DashboardScreens}
        name="DashboardTab"
        options={{title: 'Můj den'}}
      />
      <Tab.Screen
        component={JourneyProgressScreen}
        name="JourneyProgress"
        options={{title: 'Cesta'}}
      />
      <Tab.Screen
        component={RelaxationScreen}
        name="Relaxation"
        options={{title: 'Relaxace'}}
      />
      <Tab.Screen
        component={TodosScreen}
        name="Todos"
        options={{title: 'Plánovač'}}
      />
    </Tab.Navigator>
  );
};

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        component={SplashScreen}
        name="Splash"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={TermsScreen}
        name="Terms"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={LoginScreen}
        name="Login"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={UnfinishedRegistrationScreens}
        name="Registration"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={DashboardTabNavigation}
        name="Dashboard"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ProfileSettingsScreen}
        name="ProfileSettings"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={AudioScreen}
        name="Audio"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={VideoScreen}
        name="Video"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ArticleScreen}
        name="Article"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={StoriesListScreen}
        name="StoriesList"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={StoryDetailScreen}
        name="StoryDetail"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={DiaryScreen}
        name="Diary"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={DiaryEditScreen}
        name="DiaryEdit"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={MoodListScreen}
        name="MoodList"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ViciousCircleScreen}
        name="ViciousCircle"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ViciousCircleEditScreen}
        name="ViciousCircleEdit"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ScheduleDayScreen}
        name="ScheduleDay"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={AfterMonthQuestionnaireScreen}
        name="AfterMonthQuestionnaire"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={AfterMonthQuestionnaireDetailScreen}
        name="AfterMonthQuestionnaireDetail"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={SelectJourneyScreen}
        name="SelectJourneyScreen"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={JourneySwitchScreen}
        name="JourneySwitch"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={LogoutScreen}
        name="Logout"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
