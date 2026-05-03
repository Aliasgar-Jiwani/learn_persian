import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'learnpersian_progress';

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage full or not available
  }
}

export function useProgress(chapterId) {
  const [progress, setProgress] = useState(() => loadProgress());

  const chapterProgress = progress[chapterId] || {
    vocabulary: false,
    patterns: false,
    reading: false,
    exercises: false,
    summary: false,
    exerciseScores: {},
  };

  const markComplete = useCallback((section) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        [chapterId]: {
          ...prev[chapterId],
          [section]: true,
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, [chapterId]);

  const saveExerciseScore = useCallback((exerciseId, score) => {
    setProgress(prev => {
      const ch = prev[chapterId] || {};
      const updated = {
        ...prev,
        [chapterId]: {
          ...ch,
          exerciseScores: {
            ...(ch.exerciseScores || {}),
            [exerciseId]: score,
          },
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, [chapterId]);

  const getCompletionPercent = useCallback(() => {
    const sections = ['vocabulary', 'patterns', 'reading', 'exercises', 'summary'];
    const completed = sections.filter(s => chapterProgress[s]).length;
    return Math.round((completed / sections.length) * 100);
  }, [chapterProgress]);

  return {
    progress: chapterProgress,
    markComplete,
    saveExerciseScore,
    getCompletionPercent,
  };
}
