export const setLoading = (loading: boolean) => {
  return { type: 'SET_IS_LOADING', payload: loading };
};

export const setErrorMessage = message => {
  return { type: 'SET_ERROR_MESSAGE', payload: message };
};
