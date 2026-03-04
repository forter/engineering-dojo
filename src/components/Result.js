import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Squircle from "./squircle";
import './Result.css';
import {Link} from 'react-router-dom';

import organization from '../assets/org.png';
import engeering from '../assets/eng.png';
import project from '../assets/project.png';
import business from '../assets/business.png';

function createLink(){

}

function Result(props) {
  const parsedRole = props.quizResult.toLowerCase().split(" ").join("-");
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
      <div className="result-end">
        <h2>You're a <strong>{props.quizResult}</strong>!</h2>

        <h3>Curious to see what it means?</h3>

        <div className="categories">
          <Link to={`/results/engineering-craftsmanship/${parsedRole}`}>
            <div className="card-result">
              <span className="title">Engineering Craftsmanship</span>
              <span className="text">The way you develop and learn new stuff. Your hard technological skills.</span>
            </div>
            <img className="icon" src={engeering} />
          </Link>
          <Link to={`/results/delivery/${parsedRole}`}>
            <div className="card-result">
              <span className="title">Delivery</span>
              <span className="text">The way you manage and deliver a project, end-to-end and others.</span>
            </div>
            <img className="icon" src={project} />
          </Link>
          <Link to={`/results/business-impact/${parsedRole}`}>
            <div className="card-result">
              <span className="title">Business Impact</span>
              <span className="text">The way your hard earned work correlates with the business goals.</span>
            </div>
            <img className="icon" src={business} />
          </Link>
          <Link to={`/results/organizational-impact/${parsedRole}`}>
            <div className="card-result">
              <span className="title">Organizational Impact</span>
              <span className="text">The way people around you gets affected and influenced by you.</span>
            </div>
            <img className="icon" src={organization} />
          </Link>

        </div>

</div>
    </CSSTransitionGroup>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default Result;
