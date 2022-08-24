import React, { createContext, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  isAdmin: JSON.parse(sessionStorage.getItem('isAdmin')) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const AuthReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN_START':
        return {
          user: null,
          isAdmin: null,
          isFetching: true,
          error: false,
        };
      case 'LOGIN_SUCCESS':
        return {
          user: action.payload,
          isAdmin: action.adminState,
          isFetching: false,
          error: false,
        };
      case 'LOGIN_FAILURE':
        return {
          user: null,
          isAdmin: null,
          isFetching: false,
          error: true,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    sessionStorage.setItem('isAdmin', JSON.stringify(state.isAdmin));
  }, [state.isAdmin]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAdmin: state.isAdmin,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
