import React from 'react';
import PropTypes from 'prop-types';

import sprite1 from '../assets/sprite-1-egg.png';
import sprite2 from '../assets/sprite-2-chick.png';
import sprite3 from '../assets/sprite-3-chicken.png';
import sprite4 from '../assets/sprite-4-jetpack.png';
import sprite5 from '../assets/sprite-5-mech.png';

function QuestionCount(props) {
  const stages = [sprite1, sprite2, sprite3, sprite4, sprite5];
  const sprite = stages[Math.min(props.counter - 1, stages.length - 1)];
  const progress = (props.counter / props.total) * 100;

  return (
    <div className="questionCount">
      <div className="questionCount-header">
        <img src={sprite} alt="" className="questionCount-sprite" />
        <span className="questionCount-text">
          Question <span>{props.counter}</span> of <span>{props.total}</span>
        </span>
      </div>
      <div className="questionCount-bar">
        <div className="questionCount-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;
