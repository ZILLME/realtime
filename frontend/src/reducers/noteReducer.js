import { SET_NOTE, UPDATE_NOTE, SET_SUMMARY, SET_SENTIMENT, SET_HISTORY } from '../actions/types';

const initialState = {
  content: '',
  summary: '',
  sentiment: '',
  history: []
};

export default function noteReducer(state = initialState, action) {
  switch(action.type) {
    case SET_NOTE:
      return { ...state, content: action.payload };
    case UPDATE_NOTE:
      return { ...state, content: action.payload };
    case SET_SUMMARY:
      return { ...state, summary: action.payload };
    case SET_SENTIMENT:
      return { ...state, sentiment: action.payload };
    case SET_HISTORY:
      return { ...state, history: action.payload };
    default:
      return state;
  }
}
