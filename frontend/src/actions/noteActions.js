import axios from 'axios';
import { SET_NOTE, UPDATE_NOTE, SET_SUMMARY, SET_SENTIMENT, SET_HISTORY } from './types';

export const fetchNote = () => async (dispatch) => {
  const res = await axios.get('/api/notes');
  dispatch({ type: SET_NOTE, payload: res.data.content });
  fetchSummary()(dispatch);
  fetchSentiment()(dispatch);
  fetchHistory()(dispatch);
};

export const updateNote = (content) => async (dispatch) => {
  // WebSocketで送信済みの場合、API不要だがフォールバック用に残す。
  await axios.post('/api/notes/update', { content });
  dispatch({ type: UPDATE_NOTE, payload: content });
  fetchSummary()(dispatch);
  fetchSentiment()(dispatch);
  fetchHistory()(dispatch);
};

export const fetchSummary = () => async (dispatch) => {
  const res = await axios.get('/api/notes/summary');
  dispatch({ type: SET_SUMMARY, payload: res.data.summary });
};

export const fetchSentiment = () => async (dispatch) => {
  const res = await axios.get('/api/notes/sentiment');
  dispatch({ type: SET_SENTIMENT, payload: res.data.sentiment });
};

export const fetchHistory = () => async (dispatch) => {
  const res = await axios.get('/api/notes/history');
  dispatch({ type: SET_HISTORY, payload: res.data.history });
};
