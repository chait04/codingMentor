// Training data for CodingMentor's customer support AI

export const trainingData = {
  accountAccess: [
    {
      question: "How do I sign up for CodingMentor?",
      response: "Hi! To sign up for CodingMentor, head to our homepage and click 'Sign Up.' You'll need to provide an email and create a password—or use a quick sign-up option like Google. Once you're in, you can set up your learning preferences right away!"
    },
    {
      question: "I forgot my password. How do I reset it?",
      response: "No worries! Click 'Forgot Password' on the login page, enter your email, and we'll send you a reset link. Follow the instructions there, and you'll be back coding in no time!"
    },
    {
      question: "Why can't I log in to my account?",
      response: "Let's get you back in! Double-check your email and password. If it's still not working, try resetting your password or let me know if you're seeing any error messages—I'll help you troubleshoot!"
    }
  ],
  learningPaths: [
    {
      question: "How do I start a personalized learning path?",
      response: "Great question! After logging in, go to the 'Learning Paths' section and complete the onboarding survey—it asks about your goals, like interview prep or learning Python. We'll generate a custom path just for you!"
    },
    {
      question: "Can I change my learning path?",
      response: "Absolutely! Head to your profile settings, update your preferences—like switching from Java to Python or adjusting your goals—and we'll tweak your learning path accordingly."
    },
    {
      question: "Why isn't my learning path updating?",
      response: "Hmm, let's fix that! Make sure you've saved your latest preferences. If it's still stuck, try refreshing the page or let me know what changes you're expecting—I'll check it out for you."
    }
  ],
  dailyChallenges: [
    {
      question: "Where do I find my daily coding challenges?",
      response: "You'll find them on your dashboard under 'Daily Challenges.' They refresh each day based on your learning path—perfect for keeping your skills sharp!"
    },
    {
      question: "How do I submit a coding challenge?",
      response: "Easy! Open the challenge, write your code in the editor, and hit 'Submit.' You'll get instant feedback on your solution—give it a try!"
    },
    {
      question: "What if I can't solve a daily challenge?",
      response: "No stress! You can view hints or the solution in the challenge details. If you're still stuck, feel free to ask me for a nudge in the right direction!"
    }
  ],
  progressTracking: [
    {
      question: "How do I check my progress?",
      response: "Head to the 'Progress' tab on your dashboard! You'll see your completion percentage, time spent, and analytics on your strengths and weaknesses—pretty cool, right?"
    },
    {
      question: "Why doesn't my progress show my latest work?",
      response: "Let's sort that out! Ensure you've submitted your latest challenges or exercises. If it's still not updating, give it a refresh or let me know—I'll dig into it."
    },
    {
      question: "How do I export my progress report?",
      response: "You can download your progress as a PDF from the 'Progress' section—just click 'Export Report.' It's a great way to track your growth!"
    }
  ],
  resources: [
    {
      question: "Where do I find learning resources?",
      response: "Check out the 'Resources' section! We've got videos, articles, and exercises tailored to your learning path—everything you need to level up!"
    },
    {
      question: "Can I suggest a resource to add?",
      response: "We'd love that! Go to 'Resources,' click 'Suggest a Resource,' and submit your idea. We'll review it and let you know if it makes the cut!"
    }
  ],
  preferencesNotifications: [
    {
      question: "How do I set up study reminders?",
      response: "Go to your profile settings and under 'Preferences,' turn on study reminders. Pick your preferred time—like 6 PM—and we'll ping you to keep you on track!"
    },
    {
      question: "How do I stop notifications?",
      response: "No problem! In your profile settings, under 'Notifications,' toggle off the ones you don't want. You're in control!"
    }
  ],
  technicalSupport: [
    {
      question: "The platform is slow—what's wrong?",
      response: "Sorry about that! Try refreshing the page or clearing your browser cache. If it's still lagging, let me know your device and browser—I'll help figure it out!"
    },
    {
      question: "Why isn't my code editor working?",
      response: "Let's troubleshoot! Check your internet connection first. If that's fine, try reloading the page. Still no luck? Tell me what you're seeing, and I'll assist!"
    }
  ],
  generalGuidance: [
    {
      question: "How do I prepare for a coding interview with CodingMentor?",
      response: "Awesome goal! Start a learning path for 'Interview Prep'—it's packed with challenges and resources like mock questions. Focus on your progress analytics to spot areas to improve, and I'm here if you need tips!"
    },
    {
      question: "What's the best way to learn a new language on CodingMentor?",
      response: "Pick your language in the onboarding survey—like Python or Java—and we'll build a path for you. Tackle daily challenges, explore curated resources, and track your progress. Want a specific tip? Just ask!"
    }
  ]
};

export const platformFeatures = [
  "Personalized learning paths for different goals (interview prep, skill practice, new language learning)",
  "Daily coding challenges and exercises with varying difficulty levels",
  "Progress tracking and performance analytics",
  "Curated learning resources including videos, articles, and hands-on exercises",
  "User preferences for notifications, study reminders, and learning goals",
  "Interactive support for technical questions and platform guidance"
];

export const makeItSoundReal = [
    "Tone: Keep it friendly and conversational (e.g., “No worries!” or “Let’s fix that!”)",

"    Empathy: Acknowledge user frustration (e.g., “Sorry about that!”)",
    "Clarity: Avoid jargon unless explaining coding concepts",
    "Proactivity: Offer next steps (e.g., “If that doesn’t work, let me know!”)"
]