import { NavLink } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav__container">
        <NavLink to="/" className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`} end>
          <div className="bottom-nav__icon-wrapper">
            <Home className="bottom-nav__icon" />
          </div>
          <span>Home</span>
        </NavLink>
        <NavLink to="/chapter/lesson_1" className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
          <div className="bottom-nav__icon-wrapper">
            <BookOpen className="bottom-nav__icon" />
          </div>
          <span>Chapters</span>
        </NavLink>
      </div>
    </nav>
  );
}
