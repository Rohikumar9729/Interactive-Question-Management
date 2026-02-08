import { useSheetStore } from '../store';
import React from 'react';

const QuestionList = ({ topicIndex, subTopicIndex, questions }) => {
  // Placeholder for add/edit/delete/reorder logic for questions
  return (
    <div className="ml-6 mt-2">
      {questions && questions.length > 0 ? (
        questions.map((q, idx) => (
          <div key={idx} className="p-2 border rounded mb-1 bg-gray-50">
            <span className="font-medium">{q.title}</span>
            <span className="ml-2 text-xs text-gray-500">[{q.difficulty}]</span>
            {q.links && q.links.length > 0 && (
              <a href={q.links[0]} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 underline">Link</a>
            )}
          </div>
        ))
      ) : (
        <div className="text-gray-400 italic">No questions</div>
      )}
    </div>
  );
};

const SubTopicList = ({ topicIndex, subTopics }) => {
  // Placeholder for add/edit/delete/reorder logic for subtopics
  return (
    <div className="ml-4 mt-2">
      {subTopics && subTopics.length > 0 ? (
        subTopics.map((sub, idx) => (
          <div key={idx} className="mb-2">
            <input
              className="font-semibold border-b focus:outline-none"
              value={sub.name}
              onChange={() => {}}
              readOnly
            />
            <QuestionList topicIndex={topicIndex} subTopicIndex={idx} questions={sub.questions || []} />
          </div>
        ))
      ) : null}
    </div>
  );
};

export { SubTopicList, QuestionList };
