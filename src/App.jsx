import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import ChapterHome from './pages/ChapterHome';
import VocabularyPage from './pages/VocabularyPage';
import PatternsPage from './pages/PatternsPage';
import ReadingPage from './pages/ReadingPage';
import ExercisesPage from './pages/ExercisesPage';
import SummaryPage from './pages/SummaryPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapter/:id" element={<ChapterHome />} />
            <Route path="/chapter/:id/vocabulary" element={<VocabularyPage />} />
            <Route path="/chapter/:id/patterns" element={<PatternsPage />} />
            <Route path="/chapter/:id/reading" element={<ReadingPage />} />
            <Route path="/chapter/:id/exercises" element={<ExercisesPage />} />
            <Route path="/chapter/:id/summary" element={<SummaryPage />} />

          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}



export default App;
