import React, { createContext, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
    user:JSON.parse(sessionStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
  };

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const AuthReducer = (state, action) => {
        switch (action.type) {
          case "LOGIN_START":
            return {
              user: null,
              isFetching: true,
              error: false,
            };
          case "LOGIN_SUCCESS":
            return {
              user: action.payload,
              isFetching: false,
              error: false,
            };
          case "LOGIN_FAILURE":
            return {
              user: null,
              isFetching: false,
              error: true,
            };
          default:
            return state;
        }
      };

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(()=>{
      sessionStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])
    
    return (
      <AuthContext.Provider
        value={{
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
