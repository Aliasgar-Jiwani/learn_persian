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

// Scene images for Lesson 2 pattern sentences
import bookOnTable from '../assets/images/book_on_table.png';
import pencilOnNotebook from '../assets/images/pencil_on_notebook.png';
import bagOnTable from '../assets/images/bag_on_table.png';
import notebookUnderTable from '../assets/images/notebook_under_table.png';
import girlUnderTable from '../assets/images/girl_under_table.png';
import boyAtSchool from '../assets/images/boy_at_school.png';
import girlInClassroom from '../assets/images/girl_in_classroom.png';
import bagInClassroom from '../assets/images/bag_in_classroom.png';
import pencilInBag from '../assets/images/pencil_in_bag.png';
import girlInRoom from '../assets/images/girl_in_room.png';
import boyAtHome from '../assets/images/boy_at_home.png';
import womanAtHome from '../assets/images/woman_at_home.png';
import oldManInRoom from '../assets/images/old_man_in_room.png';
import notebookInBag from '../assets/images/notebook_in_bag.png';
import professorInClassroom from '../assets/images/professor_in_classroom.png';

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

// Scene image map for Lesson 2 pattern sentences (maps English sentence to scene image)
const sceneImageMap = {
  // Pattern 1: X on Y
  'the book is on the table.': bookOnTable,
  'the pencil is on the notebook.': pencilOnNotebook,
  'the bag is on the table.': bagOnTable,
  'the small bag is on the table.': bagOnTable,
  // Pattern 2: X under Y
  'the notebook is under the table.': notebookUnderTable,
  'the pen is under the book.': pen,
  'the little girl is under the table.': girlUnderTable,
  'your small pencil is under the book.': pencil,
  // Pattern 3: Ezafe noun+adj
  'the small book is under the table.': notebookUnderTable,
  'the big book is on the table.': bookOnTable,
  'the short pen is under the book.': pen,
  'the long pencil is on the notebook.': pencilOnNotebook,
  'the big notebook is in the bag.': notebookInBag,
  'the old bag is on the table.': bagOnTable,
  // Pattern 4: X in/at Y
  'the boy is at school.': boyAtSchool,
  'the girl is in the classroom.': girlInClassroom,
  'the bag is in the classroom.': bagInClassroom,
  'the pencil is in the bag.': pencilInBag,
  'the little girl is in the room.': girlInRoom,
  'the little boy is at home.': boyAtHome,
  'the young woman is at home.': womanAtHome,
  'the old man is in the room.': oldManInRoom,
  // Pattern 5: Possession (all about "this book")
  'this book is mine.': book,
  'this book is yours.': book,
  'this book is his or hers.': book,
  'this book is ours.': book,
  'this book is yours (formal/plural).': book,
  'this book is theirs.': book,
  // Pattern 6: Full noun phrase
  'this big book is mine.': book,
  'my big book is on the table.': bookOnTable,
  'this big notebook is his or hers.': notebook,
  'his or her big notebook is in the bag.': notebookInBag,
  'this small pencil is yours.': pencil,
  'your small pencil is under the book.': pencil,
  'our young professor is in the classroom.': professorInClassroom,
};

export function getSceneImage(englishSentence) {
  if (!englishSentence) return null;
  const lower = englishSentence.toLowerCase();
  return sceneImageMap[lower] || null;
}

export default imageMap;

