import type {NormalizedCacheObject} from '@apollo/client';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  fromPromise,
  gql,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from 'apollo-link-error';

import type {
  RefreshAccessTokenMutation,
  RefreshAccessTokenMutationVariables,
} from '../../gql/__generated__/graphql';
import {ENV} from '../env';
import {getAccessToken, getRefreshToken, saveTokens} from '../modules/auth/api';

console.log('APOLLO USING:', ENV.API_URL);

let isRefreshing = false;
// @ts-expect-error
let pendingRequests = [];
// eslint-disable-next-line prefer-const
let apolloClient: ApolloClient<NormalizedCacheObject>;

const resolvePendingRequests = () => {
  // @ts-expect-error
  pendingRequests.map(callback => callback());
  pendingRequests = [];
};

const refreshTokensAction = gql`
  mutation refreshAccessToken($input: RefreshTokensInput!) {
    refreshAccessToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

const refreshAuthToken = async () => {
  console.log('refreshing token');
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();
  if (!accessToken) {
    throw new Error('Cant refresh token, accessToken missing');
  }
  if (!refreshToken) {
    throw new Error('Cant refresh token, refreshToken missing');
  }

  const response = await apolloClient.mutate<
    RefreshAccessTokenMutation,
    RefreshAccessTokenMutationVariables
  >({
    mutation: refreshTokensAction,
    variables: {
      input: {
        accessToken,
        refreshToken,
      },
    },
  });

  console.log('response from refreshing', refreshToken);

  if (response.data?.refreshAccessToken) {
    await saveTokens(
      response.data.refreshAccessToken.accessToken,
      response.data.refreshAccessToken.refreshToken,
    );
    return;
  }

  throw new Error('Cant refresh token');
};

const targetEndPointLink = createHttpLink({
  uri: ENV.API_URL,
});

const authLink = setContext(async () => {
  const accessToken = await getAccessToken();
  console.log('USING ACCESS TOKEN', accessToken);
  return {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
});

// @ts-expect-error
const errorLink = onError(({graphQLErrors, operation, forward}) => {
  console.log({graphQLErrors});
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.message) {
        case 'Unauthorized':
          // eslint-disable-next-line no-case-declarations
          let forward$;

          // eslint-disable-next-line max-depth, no-negated-condition
          if (!isRefreshing) {
            isRefreshing = true;
            forward$ = fromPromise(
              refreshAuthToken()
                .then(() => {
                  // Store the new tokens for your auth link
                  resolvePendingRequests();
                  return true;
                })
                // eslint-disable-next-line no-loop-func
                .catch(() => {
                  pendingRequests = [];
                  // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                  throw new Error();
                })
                // eslint-disable-next-line no-loop-func
                .finally(() => {
                  isRefreshing = false;
                }),
            ).filter(value => Boolean(value));
          } else {
            // Will only emit once the Promise is resolved
            forward$ = fromPromise(
              // eslint-disable-next-line no-loop-func
              new Promise(resolve => {
                // @ts-expect-error
                pendingRequests.push(() => resolve());
              }),
            );
          }

          // @ts-expect-error
          return forward$.flatMap(() => forward(operation));
      }
    }
  }
});

apolloClient = new ApolloClient({
  // @ts-expect-error
  link: ApolloLink.from([errorLink, authLink, targetEndPointLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
