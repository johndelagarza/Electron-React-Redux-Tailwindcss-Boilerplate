export const login = (data) => {
    return {
      type: 'LOGIN',
      data: data
    };
};
  
export const logout = () => {
    return {
      type: 'LOGOUT'
    };
};
  
export const setUser = (data) => {
    return {
        type: 'SET_USER',
        data: data
    };
};