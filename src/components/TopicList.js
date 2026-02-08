import { useSheetStore } from '../store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TopicItem from './TopicItem';


const TopicList = ({ topics: propTopics }) => {
  const { topics: storeTopics, addTopic, reorderTopics } = useSheetStore();
  const topics = propTopics || storeTopics;

  const moveTopic = (from, to) => {
    const updated = [...topics];
    const [removed] = updated.splice(from, 1);
    updated.splice(to, 0, removed);
    reorderTopics(updated);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {topics.map((topic, idx) => (
          <TopicItem key={idx} topic={topic} index={idx} moveTopic={moveTopic} />
        ))}
        <button
          onClick={() => addTopic({ name: 'New Topic', subTopics: [], questions: [] })}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-blue-900/30 transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span className="text-xl group-hover:rotate-90 transition-transform">+</span>
          Add New Topic
        </button>
      </div>
    </DndProvider>
  );
};

export default TopicList;
