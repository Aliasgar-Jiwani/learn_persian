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
import bag from '../assets/images/bag.png';
import father from '../assets/images/father.png';
import mother from '../assets/images/mother.png';
import classroom from '../assets/images/classroom.png';
import friend from '../assets/images/friend.png';
import femaleTeacher from '../assets/images/female_teacher.png';
import homemaker from '../assets/images/homemaker.png';
import schoolBuilding from '../assets/images/school_building.png';
import spouse from '../assets/images/spouse.png';

// Map English words to their vector illustration
const imageMap = {
  'book': book,
  'notebook': notebook,
  'pencil': pencil,
  'pen': pen,
  'desk': desk,
  'desk / table': desk,
  'table': desk,
  'table / desk': desk,
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
  'house / home': house,
  'home': house,
  'room': room,
  'school': schoolBuilding,
  // Chapter 2 new vocabulary
  'bag': bag,
  'father': father,
  'mother': mother,
  'spouse': spouse,
  'spouse / husband / wife': spouse,
  'husband': spouse,
  'wife': spouse,
  'friend': friend,
  'pupil': student,
  'pupil / school student': student,
  'school student': student,
  'high school teacher': professor,
  'elementary school teacher': femaleTeacher,
  'homemaker': homemaker,
  'homemaker / housewife': homemaker,
  'housewife': homemaker,
  'mr.': man,
  'mr. / sir / gentleman': man,
  'sir': man,
  'gentleman': man,
  'mrs.': woman,
  'mrs. / ms. / lady': woman,
  'ms.': woman,
  'lady': woman,
  'classroom': classroom,
  'classroom / class': classroom,
  'class': classroom,
  'high school': schoolBuilding,
  'elementary school': schoolBuilding,
  'elementary school / primary school': schoolBuilding,
  'primary school': schoolBuilding,
};

// Emoji fallbacks for words without images
const emojiFallback = {
  'book': '📕',
  'notebook': '📓',
  'pencil': '✏️',
  'pen': '🖊️',
  'desk': '🪑',
  'desk / table': '🪑',
  'table / desk': '🪑',
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
  'house / home': '🏠',
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
  // Chapter 2 new
  'bag': '🎒',
  'father': '👨',
  'mother': '👩',
  'spouse': '💑',
  'spouse / husband / wife': '💑',
  'friend': '🤝',
  'pupil / school student': '🎓',
  'high school teacher': '👨‍🏫',
  'elementary school teacher': '👩‍🏫',
  'homemaker / housewife': '🏠',
  'homemaker': '🏠',
  'mr. / sir / gentleman': '🤵',
  'mrs. / ms. / lady': '👩',
  'classroom / class': '🏫',
  'classroom': '🏫',
  'high school': '🏫',
  'elementary school / primary school': '🏫',
  'on / on top of (preposition)': '⬆️',
  'under / below (preposition)': '⬇️',
  'in / at (preposition)': '📍',
  'and (conjunction)': '➕',
  'here': '📍',
  'name': '🏷️',
  'i / me / my': '👤',
  'you / your (informal singular)': '👆',
  'he / she / him / her / his / her': '👤',
  'we / us / our': '👥',
  'you / your (formal or plural)': '👆',
  'they / them / their': '👥',
  'physics': '⚛️',
  'new': '🆕',
  'old (things)': '🏛️',
  'old / antique (for objects/places)': '🏛️',
  'bright / lit / light': '☀️',
  'dark': '🌙',
  'tall / long': '📏',
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
