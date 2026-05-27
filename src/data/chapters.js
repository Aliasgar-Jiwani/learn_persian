import chapter1 from './chapters/chapter1_farsi.json';
import chapter2 from './chapters/chapter2_farsi.json';

export const chapters = [
  {
    id: 'lesson_1',
    chapter: 1,
    title: 'Lesson One',
    farsi: 'درس اول',
    transliteration: 'dars-e avval',
    data: chapter1
  },
  {
    id: 'lesson_2',
    chapter: 2,
    title: 'Lesson Two',
    farsi: 'درس دوم',
    transliteration: 'dars-e dovvom',
    data: chapter2
  }
];

export function getChapter(id) {
  return chapters.find(ch => ch.id === id);
}
