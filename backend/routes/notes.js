const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { summarizeContent } = require('../services/gptService');
const { analyzeSentiment } = require('../services/sentiment');

// ノート取得
router.get('/', async (req, res) => {
  let note = await Note.findOne();
  if (!note) {
    note = new Note();
    await note.save();
  }
  res.json(note);
});

// ノート更新
router.post('/update', async (req, res) => {
  const { content } = req.body;
  let note = await Note.findOne();
  if (!note) {
    note = new Note();
  }
  note.content = content;
  note.history.push({ content });
  await note.save();
  res.json(note);
});

// 要約
router.get('/summary', async (req, res) => {
  let note = await Note.findOne();
  if (!note) {
    return res.json({ summary: '' });
  }
  const summary = await summarizeContent(note.content);
  res.json({ summary });
});

// 感情分析
router.get('/sentiment', async (req, res) => {
  let note = await Note.findOne();
  if (!note) return res.json({ sentiment: 'neutral' });
  
  const sentiment = await analyzeSentiment(note.content);
  res.json({ sentiment });
});

// 履歴取得
router.get('/history', async (req, res) => {
  let note = await Note.findOne();
  if (!note) return res.json({ history: [] });
  res.json({ history: note.history });
});

module.exports = router;
