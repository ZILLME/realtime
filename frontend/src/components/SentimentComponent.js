import React from 'react';
import { useSelector } from 'react-redux';

const SentimentComponent = () => {
  const sentiment = useSelector(state => state.note.sentiment);
  return (
    <div className="sentiment">
      <h3>感情トーン</h3>
      <div>{sentiment}</div>
    </div>
  );
};

export default SentimentComponent;
