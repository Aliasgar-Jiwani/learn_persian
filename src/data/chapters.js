import chapter1 from './chapters/chapter1_farsi.json';

export const chapters = [
  {
    id: 'lesson_1',
    chapter: 1,
    title: 'Lesson One',
    farsi: 'درس اول',
    transliteration: 'dars-e avval',
    data: chapter1
  }
];

export function getChapter(id) {
  return chapters.find(ch => ch.id === id);
}
