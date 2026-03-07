import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Result.css';
import {Link} from 'react-router-dom';
import { CHICKEN_NAMES, ROLES } from '../questionnaire/quizQuestions';

import organization from '../assets/cat-organization.png';
import engeering from '../assets/cat-engineering.png';
import project from '../assets/cat-delivery.png';
import business from '../assets/cat-business.png';

import sprite1 from '../assets/sprite-1-egg.png';
import sprite2 from '../assets/sprite-2-chick.png';
import sprite3 from '../assets/sprite-3-chicken.png';
import sprite4 from '../assets/sprite-4-jetpack.png';
import sprite5 from '../assets/sprite-5-mech.png';
import sprite6 from '../assets/sprite-6-phoenix.png';

const ROLE_ORDER = [
  ROLES.ENTRY,
  ROLES.NORMAL,
  ROLES.SENIOR,
  ROLES.SENIOR_II,
  ROLES.STAFF,
  ROLES.PRINCIPAL,
];

const ROLE_SPRITES = {
  [ROLES.ENTRY]: sprite1,
  [ROLES.NORMAL]: sprite2,
  [ROLES.SENIOR]: sprite3,
  [ROLES.SENIOR_II]: sprite4,
  [ROLES.STAFF]: sprite5,
  [ROLES.PRINCIPAL]: sprite6,
};

// Chicken-themed confetti emojis
const CONFETTI_ITEMS = ['🐔', '🐣', '🥚', '🪶', '🐥', '✨', '🔥', '🪿'];

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      emoji: CONFETTI_ITEMS[i % CONFETTI_ITEMS.length],
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 1.5 + Math.random() * 1.5,
      size: 16 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 60,
      rotation: Math.random() * 360,
    }))
  );

  return (
    <div className="confetti-container" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            '--rotation': `${p.rotation}deg`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

function Result(props) {
  const parsedRole = props.quizResult.toLowerCase().split(" ").join("-");
  const chicken = CHICKEN_NAMES[props.quizResult] || { name: props.quizResult, emoji: "" };

  const currentIndex = ROLE_ORDER.indexOf(props.quizResult);
  const prevRole = currentIndex > 0 ? ROLE_ORDER[currentIndex - 1] : null;
  const nextRole = currentIndex < ROLE_ORDER.length - 1 ? ROLE_ORDER[currentIndex + 1] : null;
  const toSlug = (role) => '/questionnaire/result/' + role.toLowerCase().split(' ').join('-');

  const [showConfetti, setShowConfetti] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Trigger confetti burst on mount
    setShowConfetti(true);
    const revealTimer = setTimeout(() => setRevealed(true), 100);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
    return () => { clearTimeout(revealTimer); clearTimeout(confettiTimer); };
  }, []);

  return (
    <div className={`container result${revealed ? ' result--revealed' : ''}`}>
      <div className="result-page">
        {/* Hero spans full width */}
        <div className="result-hero-row">
          <div className="result-hero">
            {showConfetti && <Confetti />}
            <img src={ROLE_SPRITES[props.quizResult]} alt={chicken.name} className="result-sprite" />
            <h2 className="result-title">You're a <strong>{chicken.name}</strong></h2>
            <p className="result-role">{props.quizResult}</p>
          </div>
          <p className="result-subtitle">Here's what that means for your career</p>
        </div>

        {/* Cards row: rail | cards | rail */}
        <div className="result-cards-row">
          <div className="result-rail result-rail-left">
            {prevRole ? (
              <Link to={toSlug(prevRole)} className="rail-link">
                <img src={ROLE_SPRITES[prevRole]} alt="" className="rail-sprite" />
                <span className="rail-name">{CHICKEN_NAMES[prevRole]?.name}</span>
                <span className="rail-role">{prevRole}</span>
                <span className="rail-chevron">{"\u2039"}</span>
              </Link>
            ) : <div className="rail-spacer" />}
          </div>

          <div className="categories">
            <Link to={`/results/engineering-craftsmanship/${parsedRole}`} className="cat-card">
              <img className="cat-icon" src={engeering} alt="" />
              <div className="cat-info">
                <span className="cat-title">Engineering Craftsmanship</span>
                <span className="cat-desc">Your hard tech skills. The beak that breaks the shell.</span>
              </div>
              <span className="cat-arrow">&rarr;</span>
            </Link>
            <Link to={`/results/delivery/${parsedRole}`} className="cat-card">
              <img className="cat-icon" src={project} alt="" />
              <div className="cat-info">
                <span className="cat-title">Delivery</span>
                <span className="cat-desc">How you ship. From egg to omelette, end to end.</span>
              </div>
              <span className="cat-arrow">&rarr;</span>
            </Link>
            <Link to={`/results/business-impact/${parsedRole}`} className="cat-card">
              <img className="cat-icon" src={business} alt="" />
              <div className="cat-info">
                <span className="cat-title">Business Impact</span>
                <span className="cat-desc">How your code scratches the bottom line.</span>
              </div>
              <span className="cat-arrow">&rarr;</span>
            </Link>
            <Link to={`/results/organizational-impact/${parsedRole}`} className="cat-card">
              <img className="cat-icon" src={organization} alt="" />
              <div className="cat-info">
                <span className="cat-title">Organizational Impact</span>
                <span className="cat-desc">Your influence on the flock around you.</span>
              </div>
              <span className="cat-arrow">&rarr;</span>
            </Link>
          </div>

          <div className="result-rail result-rail-right">
            {nextRole ? (
              <Link to={toSlug(nextRole)} className="rail-link">
                <img src={ROLE_SPRITES[nextRole]} alt="" className="rail-sprite" />
                <span className="rail-name">{CHICKEN_NAMES[nextRole]?.name}</span>
                <span className="rail-role">{nextRole}</span>
                <span className="rail-chevron">{"\u203A"}</span>
              </Link>
            ) : <div className="rail-spacer" />}
          </div>
        </div>
      </div>
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;
