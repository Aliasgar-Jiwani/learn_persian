import book from '../assets/images/book.png';
import notebook from '../assets/images/notebook.png';
import pencil from '../assets/images/pencil.png';
import pen from '../assets/images/pen.png';
import desk from '../assets/images/desk.png';
import door from '../assets/images/door.png';
import professor from '../assets/images/professor.png';
import student from '../assets/images/student.png';
import boy from '../assets/images/boy.png';
import girl from '../assets/images/girl.png';
import man from '../assets/images/man.png';
import woman from '../assets/images/woman.png';
import house from '../assets/images/house.png';
import room from '../assets/images/room.png';

// Map English words to their vector illustration
const imageMap = {
  'book': book,
  'notebook': notebook,
  'pencil': pencil,
  'pen': pen,
  'desk': desk,
  'desk / table': desk,
  'table': desk,
  'door': door,
  'professor': professor,
  'professor / teacher': professor,
  'teacher': professor,
  'student': student,
  'boy': boy,
  'boy / son': boy,
  'son': boy,
  'girl': girl,
  'girl / daughter': girl,
  'daughter': girl,
  'man': man,
  'woman': woman,
  'house': house,
  'room': room,
  'school': house, // fallback to house since school image failed to generate
};

// Emoji fallbacks for words without images
const emojiFallback = {
  'book': '📕',
  'notebook': '📓',
  'pencil': '✏️',
  'pen': '🖊️',
  'desk': '🪑',
  'desk / table': '🪑',
  'door': '🚪',
  'professor': '👨‍🏫',
  'professor / teacher': '👨‍🏫',
  'student': '🎓',
  'boy': '👦',
  'boy / son': '👦',
  'girl': '👧',
  'girl / daughter': '👧',
  'man': '👨',
  'woman': '👩',
  'house': '🏠',
  'room': '🏠',
  'school': '🏫',
  'this': '👉',
  'that': '👈',
  'is (3rd person singular copula)': '✅',
  'is not (negative copula)': '❌',
  'yes': '✅',
  'no': '❌',
  'question particle (yes/no marker)': '❓',
  'one / a (indefinite article)': '1️⃣',
  'big / large': '⬆️',
  'small / little': '⬇️',
  'tall / long / high': '📏',
  'short': '📐',
  'heavy': '🏋️',
  'light (weight)': '🪶',
  'beautiful': '✨',
  'ugly': '💩',
  'young': '👶',
  'old (person)': '👴',
  'healthy': '💪',
  'sick / ill': '🤒',
  'chic / trendy': '💎',
  'simple / plain': '📄',
  'old / ancient (things/places)': '🏛️',
};

export function getImage(englishWord) {
  if (!englishWord) return null;
  const lower = englishWord.toLowerCase();
  return imageMap[lower] || imageMap[lower.split(' / ')[0]] || null;
}

export function getEmoji(englishWord) {
  if (!englishWord) return '📚';
  const lower = englishWord.toLowerCase();
  return emojiFallback[lower] || emojiFallback[lower.split(' / ')[0]] || '📚';
}

export default imageMap;
