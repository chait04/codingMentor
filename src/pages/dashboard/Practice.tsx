import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { codingChallenges } from '../../data/challenges';
import { tutorials } from '../../data/tutorials';
import { Play, CheckCircle } from 'lucide-react';
import { CodeiumEditor } from '@codeium/react-code-editor';

export function Practice() {
  const { id } = useParams();
  const [code, setCode] = useState('');

  // Find the content based on the ID
  const challenge = codingChallenges.find((c) => c.id === id);
  const tutorial = tutorials.find((t) => t.id === id);

  const content = challenge || tutorial;

  useEffect(() => {
    if (challenge) {
      setCode(challenge.starterCode);
    }
  }, [challenge]);

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Content not found</p>
      </div>
    );
  }

  const handleCodeChange = (value: string | undefined) => {
    setCode(value ?? '');
  };

  return (
    <div className="space-y-6 py-3 px-5 animate-fadeIn">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
          <p className="mt-1 text-gray-600">{content.description}</p>
        </div>
      </header>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {challenge ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-mint/20 px-2 py-0.5 text-xs font-medium text-mint">
                  {challenge.difficulty}
                </span>
                <span className="text-sm text-gray-600">
                  Estimated time: {challenge.estimatedTime}
                </span>
              </div>
              <button className="rounded-lg bg-mint px-4 py-2 font-medium text-white transition-colors hover:bg-mint/90">
                Run Tests
              </button>
            </div>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <CodeiumEditor
                value={code}
                onChange={handleCodeChange}
                language={challenge.language}
                theme="vs-dark"
                className="min-h-[300px]"
              />
            </div>
            <div className="rounded-lg bg-gray-100 p-4">
              <h3 className="font-medium text-gray-900">Output</h3>
              <pre className="mt-2 text-sm text-gray-600">// Test results will appear here</pre>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="aspect-video rounded-lg bg-gray-100">
              {tutorial?.videoUrl ? (
                <iframe
                  src={tutorial.videoUrl}
                  title={tutorial.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Play className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 text-sm font-medium text-mint">
              <CheckCircle className="h-4 w-4" />
              Mark as Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}