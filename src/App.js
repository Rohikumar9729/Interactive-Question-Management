
import './App.css';



import TopicList from './components/TopicList';
import { useState } from 'react';
import { useSheetStore } from './store';


function App() {
  const [search, setSearch] = useState('');
  const topics = useSheetStore((state) => state.topics);

  // Filter topics, subtopics, and questions by search
  const filteredTopics = topics.map(topic => ({
    ...topic,
    subTopics: topic.subTopics?.filter(sub =>
      sub.questions?.some(q => q.title.toLowerCase().includes(search.toLowerCase()))
    ).map(sub => ({
      ...sub,
      questions: sub.questions.filter(q => q.title.toLowerCase().includes(search.toLowerCase()))
    })) || [],
    questions: topic.questions?.filter(q => q.title.toLowerCase().includes(search.toLowerCase())) || []
  })).filter(topic =>
    (topic.subTopics && topic.subTopics.length > 0) ||
    (topic.questions && topic.questions.length > 0)
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Question Management Sheet
          </h1>
          <p className="mt-2 text-gray-400">Organize, reorder, and manage your topics • sub-topics • questions</p>
        </header>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <TopicList topics={filteredTopics} />
      </div>
    </div>
  );
}

export default App;
