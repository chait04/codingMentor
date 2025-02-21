import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shell, ChevronRight, ChevronLeft } from 'lucide-react';

type Step = {
  id: number;
  title: string;
};

const steps: Step[] = [
  { id: 1, title: 'Goals' },
  { id: 2, title: 'Language' },
  { id: 3, title: 'Skill Level' },
  { id: 4, title: 'Availability' },
];

const programmingLanguages = [
  { id: "python", name: "Python", icon: "🐍", color: "bg-pastel-beige" },
  { id: "javascript", name: "JavaScript", icon: "💛", color: "bg-pastel-pink" },
  { id: "java", name: "Java", icon: "☕", color: "bg-mint-100" },
  { id: "cpp", name: "C++", icon: "⚡", color: "bg-mint-50" },
  { id: "ruby", name: "Ruby", icon: "💎", color: "bg-mint-50" },
  { id: "go", name: "Go", icon: "🔵", color: "bg-mint-100" },
];

export function OnboardingSurvey() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    goal: '',
    language: '',
    skillLevel: '',
    hoursPerDay: 1,
    preferredTime: '',
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/onboarding/path');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">What's your goal?</h3>
            {['Learn a new language', 'Practice your skills', 'Ace interviews'].map((goal) => (
              <label
                key={goal}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.goal === goal
                    ? 'border-mint-600 bg-mint-50'
                    : 'border-gray-200 hover:border-mint-300'
                }`}
              >
                <input
                  type="radio"
                  name="goal"
                  value={goal}
                  checked={formData.goal === goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="sr-only"
                />
                <span className="text-gray-800">{goal}</span>
              </label>
            ))}
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Choose your preferred language</h3>
            <div className="grid grid-cols-2 gap-4">
              {programmingLanguages.map((lang) => (
                <label
                  key={lang.id}
                  className={`block p-6 rounded-lg cursor-pointer transition-all ${lang.color} ${
                    formData.language === lang.id
                      ? 'ring-2 ring-mint-600'
                      : 'hover:ring-2 hover:ring-mint-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="language"
                    value={lang.id}
                    checked={formData.language === lang.id}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="sr-only"
                  />
                  <span className="text-gray-800 font-medium flex items-center gap-2">
                    <span className="text-2xl">{lang.icon}</span>
                    {lang.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">What's your skill level?</h3>
            {[
              { id: 'beginner', label: 'Beginner (0-6 months)' },
              { id: 'intermediate', label: 'Intermediate (6-18 months)' },
              { id: 'advanced', label: 'Advanced (18+ months)' },
            ].map((level) => (
              <label
                key={level.id}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.skillLevel === level.id
                    ? 'border-mint-600 bg-mint-50'
                    : 'border-gray-200 hover:border-mint-300'
                }`}
              >
                <input
                  type="radio"
                  name="skillLevel"
                  value={level.id}
                  checked={formData.skillLevel === level.id}
                  onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                  className="sr-only"
                />
                <span className="text-gray-800">{level.label}</span>
              </label>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">How much time can you dedicate daily?</h3>
              <input
                type="range"
                min="0.25"
                max="3"
                step="0.25"
                value={formData.hoursPerDay}
                onChange={(e) => setFormData({ ...formData, hoursPerDay: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mint-600"
              />
              <div className="text-center mt-2 text-gray-600">
                {formData.hoursPerDay} hours per day
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">When do you prefer to learn?</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Morning (8-12)',
                  'Afternoon (12-5)',
                  'Evening (5-10)',
                  'Custom',
                ].map((time) => (
                  <label
                    key={time}
                    className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.preferredTime === time
                        ? 'border-mint-600 bg-mint-50'
                        : 'border-gray-200 hover:border-mint-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredTime"
                      value={time}
                      checked={formData.preferredTime === time}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="sr-only"
                    />
                    <span className="text-gray-800">{time}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shell className="w-8 h-8 text-mint-600" />
            <h1 className="text-2xl font-bold text-gray-800">Tell Us About You</h1>
          </div>
          <div className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </div>
        </div>
      </header>

      {/* Progress Dots */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                step.id === currentStep
                  ? 'bg-mint-600'
                  : step.id < currentStep
                  ? 'bg-mint-300'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors ${
              currentStep === 1 ? 'invisible' : ''
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-mint-600 text-white hover:bg-mint-700 transition-colors"
            >
              {currentStep === steps.length ? 'Complete' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}