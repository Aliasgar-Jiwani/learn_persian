import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import BottomNav from './components/BottomNav';
import './App.css';

const Home = React.lazy(() => import('./pages/Home'));
const ChapterHome = React.lazy(() => import('./pages/ChapterHome'));
const VocabularyPage = React.lazy(() => import('./pages/VocabularyPage'));
const PatternsPage = React.lazy(() => import('./pages/PatternsPage'));
const ReadingPage = React.lazy(() => import('./pages/ReadingPage'));
const ExercisesPage = React.lazy(() => import('./pages/ExercisesPage'));
const SummaryPage = React.lazy(() => import('./pages/SummaryPage'));

function App() {
  return (
    <HashRouter>
      <div className="app">
        <main className="app__main">
          <Suspense fallback={<div className="page-loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chapter/:id" element={<ChapterHome />} />
              <Route path="/chapter/:id/vocabulary" element={<VocabularyPage />} />
              <Route path="/chapter/:id/patterns" element={<PatternsPage />} />
              <Route path="/chapter/:id/reading" element={<ReadingPage />} />
              <Route path="/chapter/:id/exercises" element={<ExercisesPage />} />
              <Route path="/chapter/:id/summary" element={<SummaryPage />} />
            </Routes>
          </Suspense>
        </main>
        <BottomNav />
      </div>
    </HashRouter>
  );
}

export default App;
