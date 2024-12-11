import React from 'react';
import { useSelector } from 'react-redux';

const SummaryComponent = () => {
  const summary = useSelector(state => state.note.summary);
  return (
    <div className="summary">
      <h3>要約</h3>
      <div>{summary}</div>
    </div>
  );
};

export default SummaryComponent;
