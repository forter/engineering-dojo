import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
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

function Result(props) {
  const parsedRole = props.quizResult.toLowerCase().split(" ").join("-");
  const chicken = CHICKEN_NAMES[props.quizResult] || { name: props.quizResult, emoji: "" };

  const currentIndex = ROLE_ORDER.indexOf(props.quizResult);
  const prevRole = currentIndex > 0 ? ROLE_ORDER[currentIndex - 1] : null;
  const nextRole = currentIndex < ROLE_ORDER.length - 1 ? ROLE_ORDER[currentIndex + 1] : null;
  const toSlug = (role) => '/questionnaire/result/' + role.toLowerCase().split(' ').join('-');

  return (
    <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div className="result-page">
        {/* Hero spans full width */}
        <div className="result-hero-row">
          <div className="result-hero">
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
    </CSSTransitionGroup>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;
