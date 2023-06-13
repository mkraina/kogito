import type {Reducer} from 'react';

import type {AuthStatus} from './auth-types';

const START_AUTH = 'startAuthenticating';
const FINISH_AUTH = 'finishAuthenticating';
const ERROR = 'error';
const RESET = 'reset';

type BaseAction<T, P = unknown> = {
  type: T;
  payload?: P;
};

const createAction = <T, P>(type: T, payload?: P): BaseAction<T, P> => {
  return {
    type,
    payload,
  };
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  status: AuthStatus;
};

export type AuthAction =
  | BaseAction<typeof START_AUTH>
  | BaseAction<typeof FINISH_AUTH, string | null>
  | BaseAction<typeof ERROR, string>
  | BaseAction<typeof RESET>;

const AuthReducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case 'finishAuthenticating':
      if (action.payload) {
        return {
          ...state,
          accessToken: action.payload,
          status: 'authenticated',
        };
      }

      return {...state, status: 'unauthenticated'};
    case 'reset':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const startAuthenticating = (): AuthAction => createAction(START_AUTH);

export const finishAuthenticating = (
  accessToken: string | null = null,
): AuthAction => createAction(FINISH_AUTH, accessToken);

export const throwError = (errorCode: string): AuthAction =>
  createAction(ERROR, errorCode);

export const reset = (): AuthAction => createAction(RESET);

export default AuthReducer;
