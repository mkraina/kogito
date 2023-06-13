import {gql, useQuery} from '@apollo/client';

import type {
  ContentQueryQuery,
  ContentQueryQueryVariables,
} from '../../../gql/__generated__/graphql';

const query = gql`
  query ContentQuery {
    content {
      userJourney {
        id
        name
        unlocked
        currentLevel
        levels {
          id
          level
          progress
          unlocked
        }
      }
      stories {
        id
        published
        videoLink
        title
      }
      currentRelaxation {
        id
        name
        image
      }
      bonusRelaxation {
        id
        name
        image
      }
      todaySchedule {
        morning {
          id
          name
          completed
        }
        afternoon {
          id
          name
          completed
        }
        evening {
          id
          name
          completed
        }
      }
      journeyRelaxation {
        id
        name
        unlocked
        relaxation {
          id
          name
          subTitle
          locked
          options
          progress
          ... on AudioItem {
            duration
            link
          }
        }
      }
    }
  }
`;

export const useContent = () => {
  const {data, error, refetch} = useQuery<
    ContentQueryQuery,
    ContentQueryQueryVariables
  >(query);

  console.log({error});

  if (data) {
    const currentUserJourneyLevel = data.content.userJourney.levels.find(
      level => level.level === data.content.userJourney.currentLevel,
    );

    return {
      userJourney: data.content.userJourney,
      stories: data.content.stories,
      newestStory: data.content.stories[0],
      currentRelaxation: data.content.currentRelaxation,
      bonusRelaxation: data.content.bonusRelaxation,
      currentUserJourneyLevel,
      todaySchedule: data.content.todaySchedule,
      journeyRelaxation: data.content.journeyRelaxation,
      refetch,
    };
  }

  return {
    userJourney: undefined,
    stories: [],
    newestStory: undefined,
    currentRelaxation: [],
    bonusRelaxation: [],
    currentUserJourneyLevel: undefined,
    todaySchedule: undefined,
    journeyRelaxation: [],
    refetch,
  };
};
