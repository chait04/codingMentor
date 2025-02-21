import { useParams } from 'react-router-dom';
import { tutorials } from '../../data/tutorials';
import { markGoalAsComplete } from '../../data/dailyGoals';

export function VideoPlayer() {
  const { id } = useParams();
  const tutorial = tutorials.find(t => t.id === id);

  const handleCompletion = () => {
    // Find the goal associated with this tutorial and mark it as complete
    const goalId = tutorial?.id;
    if (goalId) {
      markGoalAsComplete(goalId);
    }
  };

  if (!tutorial) {
    return <div>Tutorial not found</div>;
  }

  return (
    <div className="animate-fadeIn py-6 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{tutorial.title}</h1>
        
        <div className="aspect-video w-full mb-6">
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/GBIIQ0kP15E"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-4">{tutorial.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Duration: {tutorial.duration}</span>
                <span className="text-sm text-gray-500">Instructor: {tutorial.instructor}</span>
              </div>
            </div>
            <button
              onClick={handleCompletion}
              className="rounded-lg bg-mint-600 px-6 py-2 text-sm font-medium text-white hover:bg-mint-700 transition-colors"
            >
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}