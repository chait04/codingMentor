import { useState } from 'react';
import {  Play, CheckCircle, Code, Video, FileQuestion } from 'lucide-react';
import { cn } from '../../utils/cn';
import { CodeiumEditor } from "@codeium/react-code-editor";

type Tab = 'code' | 'video' | 'quiz';

const tabs = [
  { id: 'code', label: 'Coding Exercise', icon: Code },
  { id: 'video', label: 'Video Lesson', icon: Video },
  { id: 'quiz', label: 'Quiz', icon: FileQuestion },
] as const;

export function TaskCompletion() {
  const [activeTab, setActiveTab] = useState<Tab>('code');
  const [code, setCode] = useState(`function reverseString(str) {
  // Your code here
  
}`);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  return (
    <div className="space-y-6 py-3 px-5 animate-fadeIn">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Today's Challenges</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Progress:</span>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-2/3 rounded-full bg-mint" />
          </div>
          <span className="text-sm font-medium text-gray-900">2/3</span>
        </div>
      </header>

      <nav className="flex space-x-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              activeTab === id
                ? 'bg-mint-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Reverse a String
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-full bg-mint/20 px-2 py-0.5 text-xs font-medium text-mint">
                    Easy
                  </span>
                  <span className="text-sm text-gray-600">
                    Estimated time: 10 mins
                  </span>
                </div>
              </div>
              <button className="rounded-lg bg-mint px-4 py-2 font-medium text-white transition-colors hover:bg-mint/90">
                Run Tests
              </button>
            </div>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <CodeiumEditor
                value={code}
                onChange={(value: string | undefined) => handleCodeChange(value ?? '')}
                language="javascript"
                theme="vs-dark"
                className="min-h-[300px]"
              />
            </div>
            <div className="rounded-lg bg-gray-100 p-4">
              <h3 className="font-medium text-gray-900">Output</h3>
              <pre className="mt-2 text-sm text-gray-600">// Test results will appear here</pre>
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Understanding String Manipulation
            </h2>
            <div className="aspect-video rounded-lg bg-gray-100">
              <div className="flex h-full items-center justify-center">
                <Play className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-mint">
              <CheckCircle className="h-4 w-4" />
              Mark as Complete
            </button>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Quick Check: String Manipulation
            </h2>
            <div className="space-y-4">
              {[
                {
                  id: '1',
                  question: 'What is the output of "hello".split("").reverse().join("")?',
                  options: ['hello', 'olleh', 'h,e,l,l,o', 'o,l,l,e,h'],
                },
                {
                  id: '2',
                  question: 'Which method is used to remove whitespace from both ends of a string?',
                  options: ['trim()', 'strip()', 'clean()', 'removeSpace()'],
                },
              ].map((q) => (
                <div key={q.id} className="rounded-lg border border-gray-200 p-4">
                  <p className="font-medium text-gray-900">{q.question}</p>
                  <div className="mt-3 space-y-2">
                    {q.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={option}
                          checked={quizAnswers[q.id] === option}
                          onChange={(e) =>
                            setQuizAnswers((prev) => ({
                              ...prev,
                              [q.id]: e.target.value,
                            }))
                          }
                          className="h-4 w-4 text-mint"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="rounded-lg bg-mint px-6 py-2 font-medium text-white transition-colors hover:bg-mint/90">
              Submit Answers
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button className="rounded-lg bg-mint px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-mint/90">
          Next Challenge
        </button>
      </div>
    </div>
  );
}