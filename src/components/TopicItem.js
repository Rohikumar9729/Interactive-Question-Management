import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSheetStore } from '../store';

const ItemTypes = { TOPIC: 'topic' };

export default function TopicItem({ topic, index, moveTopic }) {
  const { editTopic, deleteTopic, reorderTopics, addSubTopic } = useSheetStore();
  const [isOpen, setIsOpen] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.TOPIC,
    item: { index },
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TOPIC,
    hover: (item) => {
      if (item.index !== index) {
        const topics = [...useSheetStore.getState().topics];
        const [moved] = topics.splice(item.index, 1);
        topics.splice(index, 0, moved);
        reorderTopics(topics);
        item.index = index;
      }
    },
  }));

  return (
    <div
      ref={node => preview(drop(node))}
      className={`rounded-2xl border border-gray-700/60 bg-gray-900/70 backdrop-blur-sm shadow-xl shadow-black/40 transition-all duration-300 ${
        isDragging ? 'opacity-60 scale-[0.98]' : 'hover:shadow-2xl hover:border-blue-600/40'
      }`}
    >
      <div className="p-5 flex items-center gap-4 group">
        {/* Drag handle */}
        <div
          ref={drag}
          className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-blue-400 transition-colors p-1 rounded"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </div>

        {/* Title + collapse toggle */}
        <input
          value={topic.name}
          onChange={(e) => editTopic(index, { ...topic, name: e.target.value })}
          className="flex-1 bg-transparent text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
          placeholder="Topic name"
        />

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? '▲' : '▼'}
          </button>
          <button
            onClick={() => deleteTopic(index)}
            className="text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded hover:bg-red-950/30"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Collapsible content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-6 pt-2 border-t border-gray-800/60">
          {/* Sub-topics section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-blue-300">Sub-topics</h3>
              <button
                onClick={() => addSubTopic(index, { name: 'New Sub-topic', questions: [] })}
                className="text-sm bg-blue-950/50 hover:bg-blue-900/60 text-blue-300 px-3 py-1.5 rounded-lg transition-colors"
              >
                + Add Sub-topic
              </button>
            </div>

            <div className="space-y-3 pl-6 border-l-2 border-blue-900/40">
              {/* Map subTopics here with SubTopicItem component */}
              <div className="text-gray-500 italic">No sub-topics yet</div>
            </div>
          </div>

          {/* Questions section (direct under topic) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-indigo-300">Questions</h3>
              <button className="text-sm bg-indigo-950/50 hover:bg-indigo-900/60 text-indigo-300 px-3 py-1.5 rounded-lg transition-colors">
                + Add Question
              </button>
            </div>
            <div className="space-y-3 pl-6 border-l-2 border-indigo-900/40">
              {/* Map questions here with QuestionItem component */}
              <div className="text-gray-500 italic">No questions yet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
