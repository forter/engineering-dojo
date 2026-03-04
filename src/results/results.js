import resultsJson from './career_ladder.json';
import { Link, useParams } from "react-router-dom";
import './results.css'
import moonCrash from '../assets/unicorn.png'
import judo from '../assets/logo.png'

import nav from '../assets/naviagation.png';

export default function Results() {
    const smashing = Math.round(Math.random()) === 1 ? judo : moonCrash;

    const { level, topic } = useParams();
    const { Ladder } = resultsJson["Ladder"][topic];

    const roleToEnglish = level.split("-").join(" ");
    const [roleToForterRoles] = Object.entries(resultsJson.Meta.Dans).find(item => {
        return (item[1].name || '')?.toLowerCase() === roleToEnglish.toLowerCase()
    }) || [];

    const roleNumber = roleToForterRoles.slice(-1); // assuming we're 0-9

    let isLastLevel = false;
    let nextForterLevel, data, nextForterLevelToEnglish, antiPatterns, Examples, Responsibilities, Resources;
    try {
        [[nextForterLevel, data]] = Object.entries(Ladder[roleNumber]);
        nextForterLevelToEnglish = resultsJson.Meta.Dans[nextForterLevel].name.split(" ").join("-").toLowerCase();
        Examples = data.Examples;
        Responsibilities = data.Responsibilities;
        Resources = data.Resources;
        antiPatterns = data["Anti-Patterns"];
    }
    catch (e) {
        isLastLevel = true;
    }

    const oneBeforeLastForterLevelToEnglish = resultsJson.Meta.Dans["Dan 5"].name.toLowerCase().split(" ").join("-")

    return <div className="results">
        <h1><Link to="/">Home </Link> <gray>/</gray> {roleToEnglish}</h1>
        {!isLastLevel ? <>

            <div className="introduction">
                <span>Here is your very own roadmap. Use it to progress to the next level!</span>
                <img src={nav} />
            </div>

            <h2>Responsibilities</h2>
            <h3>{resultsJson.Meta.Sections.Responsibilities}</h3>

            <div className="responsibilities">{Responsibilities.map(responsibility => <div className="responsibility">{responsibility}</div>)}</div>

            <h2>Examples</h2>
            <h3>{resultsJson.Meta.Sections.Examples}</h3>

            <div className="examples">{Examples.map(example => <div className="example">{example}</div>)}</div>

            <h2>Anti Pattern</h2>
            <h3>{resultsJson.Meta.Sections["Anti-Patterns"]}</h3>
            <div className="anti-patterns">
                {antiPatterns.map(({ 'anti-pattern': antiPattern, remedy }) => <div className="anti-pattern-block">
                    <div className="anti-pattern">{antiPattern}</div>
                    <div className="remedy">{remedy}</div>
                </div>)}
            </div>


            <h2>Resources</h2>
            <h3>{resultsJson.Meta.Sections.Resources}</h3>
            {Resources ? <div className="resources">{Resources.map(resource => <a href={resource.link} target="_blank"><div className="resource">
                <div className="resource-name">{resource.name}</div>
                <div className="resource-type">View {resource.type}</div>
            </div></a>)}</div> : ''}
            <Link to={`/results/${topic}/${nextForterLevelToEnglish}`}><button className="next-level">NEXT LEVEL</button></Link>
        </> : <>

                <div className="unicorn">
                    <img src={smashing} />

                    <h2>You're Smashing</h2>
                    <h3>You're an absolute unicorn, we've got nothing for you. Congrats.</h3>
                    <h3>Chuck Norris is still writing this one for you… Visit us soon to see how Principal++ looks like.</h3>
                    <Link to={`/results/${topic}/${oneBeforeLastForterLevelToEnglish}`}><button className="next-level">PREVIOUS LEVEL</button></Link>
                </div>
            </>}
    </div>
}
