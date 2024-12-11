import React, { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useDispatch } from 'react-redux';
import { updateNote } from '../actions/noteActions';

let ws;

const EditorComponent = ({ content }) => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editorRef = useRef(null);

  useEffect(() => {
    // 初期コンテンツ設定
    if (content && editorState.getCurrentContent().getPlainText() !== content) {
      setEditorState(EditorState.createWithContent(ContentState.createFromText(content)));
    }
  }, [content]);

  useEffect(() => {
    // WebSocket接続
    ws = new WebSocket('ws://localhost:5000');
    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'NOTE_UPDATED') {
        if (editorState.getCurrentContent().getPlainText() !== data.content) {
          setEditorState(EditorState.createWithContent(ContentState.createFromText(data.content)));
        }
      }
    };
    return () => {
      ws.close();
    };
  }, [editorState]);

  const onChange = (newState) => {
    setEditorState(newState);
    const text = newState.getCurrentContent().getPlainText();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'UPDATE_NOTE', content: text }));
    } else {
      dispatch(updateNote(text));
    }
  };

  return (
    <div className="editor-container" onClick={() => editorRef.current.focus()}>
      <Editor ref={editorRef} editorState={editorState} onChange={onChange} />
    </div>
  );
};

export default EditorComponent;
