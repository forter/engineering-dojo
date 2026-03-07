import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props) {
  const delay = props.phase === 'active' ? `${props.index * 60}ms` : '0ms';
  const isSelected = props.answerType === props.answer;
  const hasAnswer = !!props.answer;

  return (
    <li
      className={`answerOption${isSelected ? ' answerOption--selected' : ''}${hasAnswer && !isSelected ? ' answerOption--dimmed' : ''}`}
      style={{ animationDelay: delay }}
    >
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={isSelected}
        id={props.answerType}
        value={props.answerType}
        disabled={props.answer}
        onChange={props.onAnswerSelected}
      />
      <label className="radioCustomLabel" htmlFor={props.answerType}>
        <span className="answer-letter">{String.fromCharCode(65 + props.index)}</span>
        <span className="answer-text">{props.answerContent}</span>
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  index: PropTypes.number,
  phase: PropTypes.string
};

export default AnswerOption;
