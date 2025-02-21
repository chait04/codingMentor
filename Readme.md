# CodingMentor - Personalized Learning Platform

[Visit CodingMentor](https://codingmentor.netlify.app/)

CodingMentor is an interactive platform that helps developers master programming with personalized learning paths, daily challenges, and AI-powered support. It adapts to your schedule and productivity, optimizing your learning experience for consistent progress, whether you have 15 minutes or 2 hours.

## Features

### 1. Personalized Learning Paths
- Customized learning journeys based on skill level and goals
- Progressive difficulty scaling
- Multi-week structured courses
- Mixed content types (videos, challenges, exercises)

### 2. Daily Challenges & Tasks
- Daily coding exercises
- Interactive video tutorials
- Progress tracking
- Difficulty-based task categorization

### 3. Progress Tracking
- Visual progress indicators
- Daily statistics
- Completion tracking
- Time spent monitoring

### 4. Interactive Learning
- Code editor with real-time feedback
- Video lessons
- Quizzes and assessments
- Practice exercises

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Code Editor**: Codeium Editor
- **Icons**: Lucide Icons
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/codingmentor.git
cd codingmentor
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file based on .env.Reference
```bash
cp .env.Reference .env
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/          # Static data and mock content
├── features/      # Feature-specific components
├── lib/           # Third-party integrations
├── pages/         # Page components
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.