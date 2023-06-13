import type {Dispatch} from 'react';
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import ApolloClient from '../../apollo/client';
import useMixPanelTracking from '../../tracking/useMixPanelTracking';
import {MeQuery} from '../user/useMeQuery';

import {getAccessToken} from './api';
import type {AuthAction, AuthState} from './auth-reducer';
import AuthReducer, {finishAuthenticating} from './auth-reducer';

const initState = {
  accessToken: null,
  refreshToken: null,
  status: 'unknown',
} as AuthState;

type AuthContextState = {
  dispatch: Dispatch<AuthAction>;
  state: AuthState;
};

const AuthContext = createContext<AuthContextState>({
  state: initState,
  dispatch: () => {},
});

const useAuthContext = (): AuthContextState => useContext(AuthContext);

const AuthProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const {identifyUser} = useMixPanelTracking();
  const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(
    AuthReducer,
    initState,
  );

  const [contextValue, setContextValue] = useState<AuthContextState>({
    state,
    dispatch,
  });

  // Update context value and trigger re-render
  // This patterns avoids unnecessary deep renders
  // https://reactjs.org/docs/context.html#caveats
  useEffect(() => {
    setContextValue((contextValue: AuthContextState) => ({
      ...contextValue,
      state,
    }));
  }, [state]);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const accessToken = await getAccessToken();

        if (accessToken) {
          const result = await ApolloClient.query({
            query: MeQuery,
          });

          await identifyUser(
            result.data.viewer.me.id,
            // result.data.viewer.me.email,
          );

          dispatch(finishAuthenticating(accessToken));
          return;
        } else {
          dispatch(finishAuthenticating(null));
          console.log('Missing tokens');
        }
      } catch (e) {
        dispatch(finishAuthenticating(null));
        console.log('User token not found', e);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export {AuthProvider, useAuthContext};
