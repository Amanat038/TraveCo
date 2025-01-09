
const initialState = {
  user:null,
  
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
    case "LOGIN_ERROR":
      return initialState;
    default:
      return state;
  }
};


export const loginSuccess = (userData) => {
  return {
     type: "LOGIN_SUCCESS",
     payload: userData,
  };
};

export const logout = () => {
  return {
     type: "LOGOUT",
  };
};

export const loginError = () => {
  return {
     type: "LOGIN_ERROR",
  };
};