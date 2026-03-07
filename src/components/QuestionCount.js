import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function QuestionCount(props) {
  const progress = (props.counter / props.total) * 100;
  const prevCounter = useRef(props.counter);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (props.counter !== prevCounter.current) {
      prevCounter.current = props.counter;
      setBump(true);
      const t = setTimeout(() => setBump(false), 400);
      return () => clearTimeout(t);
    }
  }, [props.counter]);

  return (
    <div className="questionCount">
      <div className="questionCount-header">
        <span className="questionCount-text">
          Question <span className={bump ? 'qc-number-bump' : ''}>{props.counter}</span> of <span>{props.total}</span>
        </span>
      </div>
      <div className="questionCount-track">
        <div className="questionCount-bar">
          <div className="questionCount-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="questionCount-dots">
          {Array.from({ length: props.total }, (_, i) => (
            <span
              key={i}
              className={`qc-dot${i < props.counter ? ' qc-dot--done' : ''}${i === props.counter - 1 ? ' qc-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;
