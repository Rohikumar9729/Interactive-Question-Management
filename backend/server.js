const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


let sheetData = { topics: [] };

async function loadInitialData() {
  try {
    const res = await axios.get('https://api.example.com/striver-sde-sheet'); // Replace with actual Striver SDE Sheet API endpoint

    const express = require('express');
    const cors = require('cors');
    const axios = require('axios');

    const app = express();
    app.use(cors());
    app.use(express.json());

    const PORT = process.env.PORT || 5000;
    let sheetData = { topics: [] };

    // Load Striver SDE Sheet data once on startup
    async function loadInitialData() {
      try {
        const response = await axios.get(
          'https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet'
        );
        const raw = response.data.data.sheet;
        const topicsMap = {};
        raw.questions.forEach(q => {
          const topicName = q.topic;
          if (!topicsMap[topicName]) {
            topicsMap[topicName] = {
              _id: topicName.toLowerCase().replace(/\s+/g, '-'),
              name: topicName,
              subTopics: [],
              questions: []
            };
          }
          topicsMap[topicName].questions.push({
            _id: q._id,
            title: q.title,
            difficulty: q.questionId?.difficulty || 'Unknown',
            leetcodeUrl: q.questionId?.problemUrl || '',
            resource: q.resource || ''
          });
        });
        sheetData.topics = Object.values(topicsMap);
        console.log(`Loaded ${sheetData.topics.length} topics`);
      } catch (err) {
        console.error('Failed to load Striver data:', err.message);
      }
    }
    loadInitialData();

    // Get full sheet
    app.get('/api/sheet', (req, res) => res.json(sheetData));

    // CRUD for topics
    app.post('/api/topics', (req, res) => {
      const newTopic = {
        _id: Date.now().toString(),
        name: req.body.name || 'New Topic',
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

    // Question CRUD under topic
    app.post('/api/topics/:topicId/questions', (req, res) => {
      const topic = sheetData.topics.find(t => t._id === req.params.topicId);
      if (!topic) return res.status(404).json({ error: 'Topic not found' });
      const newQ = { _id: Date.now().toString(), ...req.body };
      topic.questions.push(newQ);
      res.status(201).json(newQ);
    });

    // Reorder topics
    app.put('/api/sheet/reorder-topics', (req, res) => {
      const { orderedIds } = req.body;
      sheetData.topics = orderedIds
        .map(id => sheetData.topics.find(t => t._id === id))
        .filter(Boolean);
      res.json({ success: true });
    });

    app.listen(PORT, () => {
      console.log(`Backend running → http://localhost:${PORT}`);
    });
