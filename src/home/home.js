import {
    Link
} from "react-router-dom";

import homeImg from '../assets/home.png';

export default function Home() {
    return <div className="home-page">
        {/* Bokeh orbs */}
        <div className="bokeh bokeh-1"></div>
        <div className="bokeh bokeh-2"></div>
        <div className="bokeh bokeh-3"></div>
        <div className="bokeh bokeh-4"></div>
        <div className="bokeh bokeh-5"></div>
        <div className="bokeh bokeh-6"></div>

        <section className="hero">
            <div className="hero-glow"></div>
            <div className="hero-badge">Engineering Dojo</div>
            <h1 className="hero-title">You <span className="highlight">strive</span> to get better,</h1>
            <h1 className="hero-title">Don't you?</h1>
            <div className="home-img"><img src={homeImg} alt="Engineering Dojo" /></div>

            <div className="cta-inline">
                <Link to="/questionnaire" className="cta-primary">
                    <span className="cta-text">Yes, Sensei!</span>
                    <span className="cta-arrow">&rarr;</span>
                </Link>
                <p className="cta-note">All free, no emails, no BS. We're Engineers.</p>
            </div>
        </section>

        <section className="description">
            <div className="description-inner">
                <p className="lead">But "getting better" is so subjective. How do you even know what <em>better</em> is? How do you explain it to others?</p>
                <p>So, we decided to be helpful.</p>
                <p>We're sharing our ideas, concepts, frameworks and resources that will help you <strong>level up</strong> as a Software Engineer.</p>
            </div>
        </section>

        <section className="action-section">
            <h2 className="action-heading">Pick your path</h2>
            <div className="action-cards">
                <Link to="/questionnaire" className="action-card action-card-quiz">
                    <span className="action-card-emoji">🥋</span>
                    <span className="action-card-title">Take the Quiz</span>
                    <span className="action-card-desc">Answer a few questions and get a personalised roadmap to your next level.</span>
                </Link>
                <a href="https://docs.google.com/spreadsheets/d/1e71fL0b5lYyac_SMSZZFHqID_VjixPwUOuCqFXtzGL4/edit?pli=1&gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="action-card action-card-sheet">
                    <span className="action-card-emoji">📊</span>
                    <span className="action-card-title">Explore the Ladder</span>
                    <span className="action-card-desc">Browse the full engineering career ladder spreadsheet at your own pace.</span>
                </a>
            </div>
        </section>

        <section className="creators-section">
            <h2 className="section-title">From the creators of other fun things</h2>
            <div className="card-group">
                <a className="card addict-card" href="https://www.softwarearchitectureaddict.com/" target="_blank" rel="noopener noreferrer">
                    <div className="card-icon">🏛️</div>
                    <div className="card-label">softwareArchitectureAddict.com</div>
                </a>
                <a className="card forker-card" href="https://www.youtube.com/watch?v=uI8NDsDouig" target="_blank" rel="noopener noreferrer">
                    <div className="card-icon">🍴</div>
                    <div className="card-label">Forker video</div>
                </a>
                <a className="card moshe-card" href="http://chuckwho.com/" target="_blank" rel="noopener noreferrer">
                    <div className="card-icon">🥋</div>
                    <div className="card-label">Chuckwho.com</div>
                </a>
            </div>
        </section>

        <footer className="made-with-love">
            Made with ❤️ by <a href="https://forter.dev/" target="_blank" rel="noopener noreferrer"><strong>Forter</strong></a>
        </footer>
    </div>;
}
