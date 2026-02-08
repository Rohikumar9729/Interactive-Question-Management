
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Static initial data: Striver A2Z topics (18 steps)
let sheetData = {
  name: "Striver A2Z DSA Sheet",
  topics: [
    { _id: "step1", name: "Learn the basics", subTopics: [], questions: [] },
    { _id: "step2", name: "Learn Important Sorting Techniques", subTopics: [], questions: [] },
    { _id: "step3", name: "Solve Problems on Arrays [Easy -> Medium -> Hard]", subTopics: [], questions: [] },
    { _id: "step4", name: "Binary Search [1D, 2D Arrays, Search Space]", subTopics: [], questions: [] },
    { _id: "step5", name: "Strings [Basic and Medium]", subTopics: [], questions: [] },
    { _id: "step6", name: "Learn LinkedList [Single LL, Double LL, Medium, Hard]", subTopics: [], questions: [] },
    { _id: "step7", name: "Recursion [PatternWise]", subTopics: [], questions: [] },
    { _id: "step8", name: "Bit Manipulation [Concepts & Problems]", subTopics: [], questions: [] },
    { _id: "step9", name: "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic]", subTopics: [], questions: [] },
    { _id: "step10", name: "Sliding Window & Two Pointer Combined Problems", subTopics: [], questions: [] },
    { _id: "step11", name: "Heaps [Learning, Medium, Hard Problems]", subTopics: [], questions: [] },
    { _id: "step12", name: "Greedy Algorithms [Easy, Medium/Hard]", subTopics: [], questions: [] },
    { _id: "step13", name: "Binary Trees [Traversals, Medium and Hard]", subTopics: [], questions: [] },
    { _id: "step14", name: "Binary Search Trees [Concept and Problems]", subTopics: [], questions: [] },
    { _id: "step15", name: "Graphs [Concepts & Problems]", subTopics: [], questions: [] },
    { _id: "step16", name: "Dynamic Programming [Patterns and Problems]", subTopics: [], questions: [] },
    { _id: "step17", name: "Tries", subTopics: [], questions: [] },
    { _id: "step18", name: "Strings (Advanced?)", subTopics: [], questions: [] },
  ]
};

// ─── CRUD Endpoints ───

app.get('/api/sheet', (req, res) => {
  res.json(sheetData);
});

app.post('/api/topics', (req, res) => {
  const newTopic = {
    _id: Date.now().toString(),
    name: req.body.name || 'New Step',
    subTopics: [],
    questions: []
  };
  sheetData.topics.push(newTopic);
  res.status(201).json(newTopic);
});

app.put('/api/topics/:id', (req, res) => {
  const topic = sheetData.topics.find(t => t._id === req.params.id);
  if (!topic) return res.status(404).json({ error: 'Not found' });
  Object.assign(topic, req.body);
  res.json(topic);
});

app.delete('/api/topics/:id', (req, res) => {
  sheetData.topics = sheetData.topics.filter(t => t._id !== req.params.id);
  res.json({ success: true });
});

// Question example under topic
app.post('/api/topics/:topicId/questions', (req, res) => {
  const topic = sheetData.topics.find(t => t._id === req.params.topicId);
  if (!topic) return res.status(404).json({ error: 'Topic not found' });
  const newQ = {
    _id: Date.now().toString(),
    title: req.body.title || 'New Problem',
    difficulty: req.body.difficulty || 'Medium',
    link: req.body.link || ''
  };
  topic.questions.push(newQ);
  res.status(201).json(newQ);
});

// Reorder topics
app.put('/api/sheet/reorder', (req, res) => {
  const { orderedIds } = req.body;
  sheetData.topics = orderedIds
    .map(id => sheetData.topics.find(t => t._id === id))
    .filter(Boolean);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend live → http://localhost:${PORT}/api/sheet`);
});
