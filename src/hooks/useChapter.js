import { useMemo } from 'react';
import { getChapter } from '../data/chapters';

export function useChapter(id) {
  const chapter = useMemo(() => getChapter(id), [id]);
  return chapter ? chapter.data : null;
}
