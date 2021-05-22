import { setRequest } from './requestActions';

const INITIAL_STATE = {
  request: {},
};

const requestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_REQUEST':
      return { ...state, request: action.payload };
  }
};

export default requestReducer;
