import { create } from 'zustand';

// Sample data structure (abridged for brevity)
const sampleTopics = [
  {
    name: 'Array',
    subTopics: [],
    questions: [
      {
        title: 'Set Matrix Zeroes',
        difficulty: 'Medium',
        links: ['https://leetcode.com/problems/set-matrix-zeroes/']
      },
      {
        title: 'Pascal Triangle',
        difficulty: 'Easy',
        links: ['https://leetcode.com/problems/pascals-triangle/']
      }
    ]
  },
  {
    name: 'Linked List',
    subTopics: [],
    questions: [
      {
        title: 'Reverse a Linked List',
        difficulty: 'Easy',
        links: ['https://leetcode.com/problems/reverse-linked-list/']
      }
    ]
  }
];

export const useSheetStore = create((set) => ({
  topics: [],
  addTopic: (topic) => set((state) => ({ topics: [...state.topics, topic] })),
  editTopic: (index, updatedTopic) => set((state) => {
    const topics = [...state.topics];
    topics[index] = updatedTopic;
    return { topics };
  }),
  deleteTopic: (index) => set((state) => {
    const topics = [...state.topics];
    topics.splice(index, 1);
    return { topics };
  }),
  addSubTopic: (topicIndex, subTopic) => set((state) => {
    const topics = [...state.topics];
    topics[topicIndex].subTopics = [...(topics[topicIndex].subTopics || []), subTopic];
    return { topics };
  }),
  reorderTopics: (newTopics) => set({ topics: newTopics }),
  loadInitialData: (data) => set({ topics: data }),
}));

// Load sample data on first import
useSheetStore.getState().loadInitialData(sampleTopics);
