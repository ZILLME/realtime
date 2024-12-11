import React from 'react';
import { useSelector } from 'react-redux';

const HistoryComponent = () => {
  const history = useSelector(state => state.note.history);
  return (
    <div className="history">
      <h3>履歴</h3>
      <ul>
        {history.map((h, index) => (
          <li key={index}>
            <strong>{new Date(h.timestamp).toLocaleString()}:</strong> {h.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryComponent;
