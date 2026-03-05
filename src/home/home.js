import {
    Link
} from "react-router-dom";

import homeImg from '../assets/home.png';
import forker from '../assets/forker.png'
import moshe from '../assets/moshe.png'
import addict from '../assets/addict.png'

export default function Home() {
    return <>
        <h1>You <blue>strive</blue> to get better,</h1>
        <h1>Don't you?</h1>
        <div className="home-img"> <img src={homeImg} /> </div>

        <div className="description">
            <h2>But "getting better" is so subjective. How do you even know what "better" is? How do you explain it to others? </h2>
            <h2>So, we decided to be helpful. </h2>
            <h2>We’re sharing our ideas, concepts, frameworks and resources that will help you level up as a Software Engineer. </h2>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h2>Want to improve?</h2>
        </div>
        <div className="call-to-action">
            <Link to="/questionnaire"><button> YES, SENSEI! </button></Link>
            <label>all free, no emails, no BS. We’re Engineers.</label>
        </div>
        <div className="call-to-action">
            <a href="https://docs.google.com/spreadsheets/d/1e71fL0b5lYyac_SMSZZFHqID_VjixPwUOuCqFXtzGL4/edit?pli=1&gid=0#gid=0" target="_blank" rel="noopener noreferrer">
                <button> VIEW THE SPREADSHEET </button>
            </a>
        </div>
        <h2> From the creators of other fun things </h2>

        <div className="card-group">
            <a className="addict" href="https://www.softwarearchitectureaddict.com/" target="_blank">
                <div className="card"> softwareArchitectureAddict.com </div>
            </a>
            <a className="forker" href="https://www.youtube.com/watch?v=uI8NDsDouig" target="_blank">
                <div className="card"> Forker video </div>
            </a>
            <a className="moshe" href="http://chuckwho.com/" target="_blank">
                <div className="card"> Chuckwho.com </div>
            </a>
        </div>

        <div className="made-with-love">Made with ❤️ by <a href="https://forter.dev/" target="_blank"><strong>Forter</strong></a></div>
    </>;
}
