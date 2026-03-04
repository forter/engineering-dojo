import React, { Component } from 'react';
import { quizQuestions, ROLES } from './quizQuestions';

import Quiz from '../components/Quiz';
import Result from '../components/Result';
import { Link } from "react-router-dom";

export class Questionnaire extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {},
            result: ''
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentDidMount() {
        const shuffledAnswerOptions = quizQuestions.map(question =>
            this.shuffleArray(question.answers)
        );
        this.setState({
            question: quizQuestions[0].question,
            answerOptions: shuffledAnswerOptions[0]
        });
    }

    shuffleArray(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);

        if (this.state.questionId < quizQuestions.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResults(this.getResults()), 300);
        }
    }

    setUserAnswer(answer) {
        this.setState((state, props) => ({
            answersCount: {
                ...state.answersCount,
                [answer]: (state.answersCount[answer] || 0) + 1
            },
            answer: answer
        }));
    }

    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;

        this.setState({
            counter: counter,
            questionId: questionId,
            question: quizQuestions[counter].question,
            answerOptions: quizQuestions[counter].answers,
            answer: ''
        });
    }

    getResults() {
        const answersCount = this.state.answersCount;
        const rolesChosen = Object.keys(answersCount);

        // Find the role with the most answers
        let maxCount = 0;
        let maxRole = ROLES.ENTRY;
        for (const [role, count] of Object.entries(answersCount)) {
            if (count > maxCount) {
                maxCount = count;
                maxRole = role;
            }
        }

        // If there's a clear winner, return it
        if (maxCount >= 3) {
            return maxRole;
        }

        // Use a ranking system for tie-breaking
        const roleRank = {
            [ROLES.ENTRY]: 1,
            [ROLES.NORMAL]: 2,
            [ROLES.SENIOR]: 3,
            [ROLES.SENIOR_II]: 4,
            [ROLES.STAFF]: 5,
            [ROLES.PRINCIPAL]: 6,
        };

        // Calculate weighted average
        let totalWeight = 0;
        let totalScore = 0;
        for (const [role, count] of Object.entries(answersCount)) {
            totalWeight += count;
            totalScore += (roleRank[role] || 1) * count;
        }
        const avgScore = totalScore / totalWeight;

        if (avgScore <= 1.5) return ROLES.ENTRY;
        if (avgScore <= 2.5) return ROLES.NORMAL;
        if (avgScore <= 3.5) return ROLES.SENIOR;
        if (avgScore <= 4.5) return ROLES.SENIOR_II;
        if (avgScore <= 5.5) return ROLES.STAFF;
        return ROLES.PRINCIPAL;
    }

    setResults(result) {
        this.setState({ result });
    }

    renderQuiz() {
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={quizQuestions.length}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }

    renderResult() {
        return <Result quizResult={this.state.result} />;
    }

    render() {
        return (
            <div className="quiz">
                <h1><Link to="/"> Home </Link> <gray>/</gray> Getting To Know You</h1>
                <div className="questionnaire">
                    <div className="questionnaire-group" />
                    {this.state.result ? this.renderResult() : this.renderQuiz()}
                </div>
            </div>
        );
    }
}

export default Questionnaire;
