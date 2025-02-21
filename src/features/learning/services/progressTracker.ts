import { dailyChallengeService } from '../../../services/dailyChallengeService';
import { progressService } from '../../../services/progressService';
import { notificationService } from '../../../services/notificationService';
import { DailyChallenge, Progress } from '../../../types/database';

export const progressTracker = {
  async updateProgress(userId: string, challengeId: string, challengeIndex: number): Promise<void> {
    try {
      // Get the challenge and current progress
      const [challenge, todayProgress] = await Promise.all([
        dailyChallengeService.getDailyChallenge(challengeId),
        this.getTodayProgress(userId)
      ]);

      // Update challenge status
      await dailyChallengeService.updateChallengeStatus(challengeId, challengeIndex, 'done');

      // Extract topics from the challenge
      const completedChallenge = challenge.challenges[challengeIndex];
      const challengeContent = JSON.parse(completedChallenge.content);
      const topics = this.extractTopics(challengeContent);

      // Update progress
      await this.updateProgressDetails(todayProgress.$id!, {
        topics,
        timeSpent: 30, // Assuming 30 minutes per challenge
        difficulty: completedChallenge.difficulty
      });

      // Check and notify achievements
      await this.checkAchievements(userId, challenge);
    } catch (error) {
      console.error('Failed to update progress:', error);
      throw error;
    }
  },

  async getTodayProgress(userId: string): Promise<Progress> {
    const today = new Date().toISOString().split('T')[0];
    const existingProgress = await progressService.getUserProgress(userId, today);

    if (existingProgress.length > 0) {
      return existingProgress[0];
    }

    // Create new progress entry for today
    return progressService.createProgress({
      userId,
      date: today,
      timeSpent: 0,
      topicsCovered: [],
      quizScores: [],
      weaknesses: []
    });
  },

  async updateProgressDetails(
    progressId: string,
    {
      topics,
      timeSpent,
      difficulty
    }: {
      topics: string[];
      timeSpent: number;
      difficulty: 'Easy' | 'Medium' | 'Hard';
    }
  ): Promise<void> {
    const progress = await progressService.getProgress(progressId);

    // Update time spent
    const updatedTimeSpent = progress.timeSpent + timeSpent;

    // Update topics covered
    await progressService.addTopicsCovered(progressId, topics);

    // Analyze performance based on difficulty
    if (difficulty === 'Hard') {
      // If completed a hard challenge, remove related topics from weaknesses
      const updatedWeaknesses = progress.weaknesses.filter((w: string) => !topics.includes(w));
      await progressService.updateWeaknesses(progressId, updatedWeaknesses);
    }

    // Update total time spent
    await progressService.updateProgress(progressId, { timeSpent: updatedTimeSpent });
  },

  extractTopics(challengeContent: { topics?: string[]; title?: string }): string[] {
    // Extract topics from challenge content
    // This implementation depends on the structure of your challenge content
    const topics: string[] = [];
    if (challengeContent.topics) {
      topics.push(...challengeContent.topics);
    }
    if (challengeContent.title) {
      // Extract potential topics from title
      const titleWords = challengeContent.title.split(' ');
      topics.push(...titleWords.filter(word => 
        word.length > 3 && !['Basic', 'Advanced', 'Practice'].includes(word)
      ));
    }
    return [...new Set(topics)];
  },

  async checkAchievements(userId: string, challenge: DailyChallenge): Promise<void> {
    const completedChallenges = challenge.challenges.filter((c: { status: string; }) => c.status === 'done').length;
    
    // Check for achievements
    if (completedChallenges === challenge.challenges.length) {
      await notificationService.createNotification({
        userId,
        message: '🎉 Congratulations! You completed all daily challenges!',
        read: false
      });
    } else if (completedChallenges === Math.floor(challenge.challenges.length / 2)) {
      await notificationService.createNotification({
        userId,
        message: '👍 Great progress! You\'re halfway through today\'s challenges!',
        read: false
      });
    }
  }
};