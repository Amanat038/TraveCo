export const loginSuccess = (userData) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userData, // Pass the user data to the reducer
  };
};

export const logout = () => {
  return {
    type: "LOGOUT", // Clear user data when logging out
  };
};

export const loginError = () => {
  return {
    type: "LOGIN_ERROR", // Handle login errors
  };
};