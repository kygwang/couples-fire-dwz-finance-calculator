import React, { useState } from 'react';
import { Heart, MessageCircle, DollarSign, Target, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface DiscussionTopic {
  id: string;
  title: string;
  description: string;
  questions: string[];
}

const discussionTopics: DiscussionTopic[] = [
  {
    id: 'values',
    title: 'Money Values & Goals',
    description: 'Understanding each other\'s relationship with money',
    questions: [
      'What did you learn about money growing up?',
      'What does financial security mean to you?',
      'What are your biggest financial fears?',
      'What would you do if money wasn\'t a concern?',
      'How do you feel about debt?'
    ]
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Design',
    description: 'Aligning your vision for retirement',
    questions: [
      'What does your ideal retirement day look like?',
      'Where do you want to live in retirement?',
      'What activities do you want to pursue together?',
      'How often do you want to travel?',
      'What legacy do you want to leave?'
    ]
  },
  {
    id: 'responsibilities',
    title: 'Financial Responsibilities',
    description: 'Managing money as a team',
    questions: [
      'How should we split our expenses?',
      'Who will manage which financial tasks?',
      'How will we make major financial decisions?',
      'What are our individual spending freedoms?',
      'How will we handle unexpected expenses?'
    ]
  },
  {
    id: 'retirement',
    title: 'Retirement Planning',
    description: 'Building your future together',
    questions: [
      'When do each of us want to retire?',
      'What are our non-negotiable retirement needs?',
      'How do we feel about working part-time in retirement?',
      'What healthcare costs should we plan for?',
      'How will we support aging parents if needed?'
    ]
  }
];

const CouplesGuide: React.FC = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <div className="card bg-gradient-to-br from-accent-50 to-white border border-accent-100">
      <div className="flex items-center space-x-2 mb-6">
        <Heart className="h-6 w-6 text-accent-500" />
        <h2 className="text-xl font-semibold text-gray-800">Couples Money Guide</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600 mb-6">
          Use these conversation starters to align your financial goals and create a shared vision for your future together.
        </p>

        {discussionTopics.map((topic) => (
          <div key={topic.id} className="border border-accent-100 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleTopic(topic.id)}
              className="w-full flex items-center justify-between p-4 bg-accent-50 hover:bg-accent-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-800">{topic.title}</span>
                <span className="text-sm text-gray-500">{topic.description}</span>
              </div>
              {expandedTopic === topic.id ? (
                <ChevronUp className="h-5 w-5 text-accent-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-accent-500" />
              )}
            </button>

            {expandedTopic === topic.id && (
              <div className="p-4 bg-white">
                <ul className="space-y-3">
                  {topic.questions.map((question, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <MessageCircle className="h-5 w-5 text-accent-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        <div className="mt-6 p-4 bg-accent-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="h-5 w-5 text-accent-500" />
            <span className="font-medium text-gray-800">Pro Tips</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Schedule regular "money dates" to discuss finances together</li>
            <li>Be honest about your financial fears and aspirations</li>
            <li>Focus on shared goals while respecting individual priorities</li>
            <li>Review and adjust your plan at least quarterly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CouplesGuide;