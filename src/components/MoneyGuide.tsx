import React, { useState } from 'react';
import { Target, DollarSign, TrendingUp, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface DiscussionTopic {
  id: string;
  title: string;
  description: string;
  questions: string[];
}

const discussionTopics: DiscussionTopic[] = [
  {
    id: 'goals',
    title: 'Financial Goals',
    description: 'Define your personal financial objectives',
    questions: [
      'What does financial freedom mean to you?',
      'When would you like to achieve financial independence?',
      'What lifestyle do you want to maintain in retirement?',
      'What are your biggest financial fears or concerns?',
      'What would you do differently if money wasn\'t a concern?'
    ]
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Design',
    description: 'Plan your ideal retirement lifestyle',
    questions: [
      'Where do you want to live in retirement?',
      'What hobbies or activities do you want to pursue?',
      'How much do you want to travel?',
      'What role does work play in your ideal lifestyle?',
      'What legacy do you want to leave behind?'
    ]
  },
  {
    id: 'strategy',
    title: 'Investment Strategy',
    description: 'Build your wealth-building approach',
    questions: [
      'What is your risk tolerance?',
      'How do you want to diversify your investments?',
      'What are your thoughts on passive vs active investing?',
      'How will you rebalance your portfolio over time?',
      'What role should real estate play in your strategy?'
    ]
  },
  {
    id: 'protection',
    title: 'Risk Management',
    description: 'Protect your financial future',
    questions: [
      'How will you handle healthcare costs?',
      'What insurance coverage do you need?',
      'How will you protect against market downturns?',
      'What\'s your emergency fund strategy?',
      'How will you adjust your plan for major life changes?'
    ]
  }
];

const MoneyGuide: React.FC = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <div className="card bg-gradient-to-br from-accent-50 to-white border border-accent-100">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="h-6 w-6 text-accent-500" />
        <h2 className="text-xl font-semibold text-gray-800">Personal Money Guide</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600 mb-6">
          Use these reflection questions to clarify your financial goals and create a solid plan for your future.
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
                      <Target className="h-5 w-5 text-accent-400 flex-shrink-0 mt-0.5" />
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
            <li>Review and update your financial goals quarterly</li>
            <li>Keep an investment journal to track your decisions</li>
            <li>Build multiple income streams for security</li>
            <li>Stay educated about personal finance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoneyGuide;