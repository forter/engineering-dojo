import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

import './quiz.css';

function Quiz(props) {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'active' | 'exit'
  const prevIdRef = useRef(props.questionId);
  const [buffered, setBuffered] = useState(null);

  // Keep a ref of the last rendered content so we can freeze it on exit
  const snapshotRef = useRef({
    questionId: props.questionId,
    question: props.question,
    answerOptions: props.answerOptions,
  });

  // Derive what to display: buffered (during exit) or live props
  const display = buffered || {
    questionId: props.questionId,
    question: props.question,
    answerOptions: props.answerOptions,
  };

  // Keep snapshot in sync — but only when we're stable (not the render where
  // questionId just changed, which would overwrite old content before the effect
  // can buffer it).
  if (!buffered && props.questionId === prevIdRef.current) {
    snapshotRef.current = {
      questionId: props.questionId,
      question: props.question,
      answerOptions: props.answerOptions,
    };
  }

  useEffect(() => {
    if (props.questionId !== prevIdRef.current) {
      // Freeze the PREVIOUS content (from snapshot) and start exit
      setBuffered({ ...snapshotRef.current });
      setPhase('exit');

      const timer = setTimeout(() => {
        setBuffered(null); // release buffer → show new props
        prevIdRef.current = props.questionId;
        setPhase('enter');
        // Double rAF ensures the browser paints the 'enter' frame before transitioning
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setPhase('active'));
        });
      }, 350);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.questionId]);

  useEffect(() => {
    // Initial mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase('active'));
    });
  }, []);

  function renderAnswerOptions(key, index) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
        index={index}
        phase={phase}
      />
    );
  }

  return (
    <div className="container">
      <QuestionCount counter={props.questionId} total={props.questionTotal} />
      <div className={`q-slide q-slide--${phase}`}>
        <Question content={display.question} />
        <ul className="answerOptions">
          {display.answerOptions.map(renderAnswerOptions)}
        </ul>
      </div>
    </div>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
