import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditorComponent from './components/EditorComponent';
import SummaryComponent from './components/SummaryComponent';
import SentimentComponent from './components/SentimentComponent';
import HistoryComponent from './components/HistoryComponent';
import { fetchNote } from './actions/noteActions';
import './styles/style.css';

const App = () => {
  const dispatch = useDispatch();
  const { content } = useSelector(state => state.note);

  useEffect(() => {
    dispatch(fetchNote());
  }, [dispatch]);

  return (
    <div className="app-container">
      <h1>リアルタイムコラボメモ</h1>
      <EditorComponent content={content}/>
      <div className="info-section">
        <SummaryComponent />
        <SentimentComponent />
        <HistoryComponent />
      </div>
    </div>
  );
};

export default App;
