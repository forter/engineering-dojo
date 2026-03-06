import React, { useState, useRef, useEffect } from 'react';
import resultsJson from './career_ladder.json';
import { Link, useParams } from "react-router-dom";
import './results.css'
import goldEgg from '../assets/gold.png'

import catEngineering from '../assets/cat-engineering.png';
import catDelivery from '../assets/cat-delivery.png';
import catBusiness from '../assets/cat-business.png';
import catOrganization from '../assets/cat-organization.png';

import sprite1 from '../assets/sprite-1-egg.png';
import sprite2 from '../assets/sprite-2-chick.png';
import sprite3 from '../assets/sprite-3-chicken.png';
import sprite4 from '../assets/sprite-4-jetpack.png';
import sprite5 from '../assets/sprite-5-mech.png';
import sprite6 from '../assets/sprite-6-phoenix.png';

const TOPIC_ICONS = {
    'engineering-craftsmanship': catEngineering,
    'delivery': catDelivery,
    'business-impact': catBusiness,
    'organizational-impact': catOrganization,
};

const TOPIC_LABELS = {
    'engineering-craftsmanship': 'Engineering Craftsmanship',
    'delivery': 'Delivery',
    'business-impact': 'Business Impact',
    'organizational-impact': 'Organizational Impact',
};

const SECTION_ICONS = {
    Responsibilities: '📋',
    Examples: '💡',
    'Anti-Patterns': '⚠️',
    Resources: '📚',
};

const TOPIC_ORDER = [
    'engineering-craftsmanship',
    'delivery',
    'business-impact',
    'organizational-impact',
];

const DAN_ORDER = ['Dan 1', 'Dan 2', 'Dan 3', 'Dan 4', 'Dan 5', 'Dan 6'];
const DAN_SPRITES = {
    'Dan 1': sprite1, 'Dan 2': sprite2, 'Dan 3': sprite3,
    'Dan 4': sprite4, 'Dan 5': sprite5, 'Dan 6': sprite6,
};

function danToSlug(dan) {
    return resultsJson.Meta.Dans[dan].name.split(' ').join('-').toLowerCase();
}

export default function Results() {

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

    const danIndex = DAN_ORDER.indexOf(roleToForterRoles);
    const prevDan = danIndex > 0 ? DAN_ORDER[danIndex - 1] : null;
    const nextDan = danIndex < DAN_ORDER.length - 1 ? DAN_ORDER[danIndex + 1] : null;

    const topicLabel = TOPIC_LABELS[topic] || topic.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown on route change
    useEffect(() => {
        setDropdownOpen(false);
    }, [topic]);

    return <div className="results">
        <p className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to={`/questionnaire/result/${level}`}>{roleToEnglish}</Link>
            <span className="sep">/</span>
            <span className="bc-dropdown" ref={dropdownRef}>
                <button className="bc-dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <img src={TOPIC_ICONS[topic]} alt="" className="bc-dropdown-icon" />
                    {topicLabel}
                    <span className={`bc-chevron${dropdownOpen ? ' bc-chevron-open' : ''}`}>
                        <svg viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4" /></svg>
                    </span>
                </button>
                <div className={`bc-dropdown-menu${dropdownOpen ? ' bc-dropdown-menu-open' : ''}`}>
                    {TOPIC_ORDER.filter(t => t !== topic).map(t => (
                        <Link key={t} to={`/results/${t}/${level}`} className="bc-dropdown-item">
                            <img src={TOPIC_ICONS[t]} alt="" className="bc-dropdown-item-icon" />
                            {TOPIC_LABELS[t]}
                        </Link>
                    ))}
                </div>
            </span>
        </p>
        {!isLastLevel ? <>

            {/* ── Hero banner ── */}
            <div className="rd-hero">
                <img className="rd-hero-icon" src={TOPIC_ICONS[topic]} alt={topic} />
                <div className="rd-hero-text">
                    <h1 className="rd-title">{topicLabel}</h1>
                    <p className="rd-subtitle">Your roadmap to the next level</p>
                </div>
            </div>


            {/* ── Responsibilities ── */}
            <section className="rd-section">
                <div className="rd-section-header">
                    <span className="rd-section-icon">{SECTION_ICONS.Responsibilities}</span>
                    <div>
                        <h2>Responsibilities</h2>
                        <p className="rd-section-desc">{resultsJson.Meta.Sections.Responsibilities}</p>
                    </div>
                </div>
                <div className="rd-cards">
                    {Responsibilities.map((r, i) => <div key={i} className="rd-card">
                        <span className="rd-card-num">{String(i + 1).padStart(2, '0')}</span>
                        <p>{r}</p>
                    </div>)}
                </div>
            </section>

            {/* ── Examples ── */}
            <section className="rd-section">
                <div className="rd-section-header">
                    <span className="rd-section-icon">{SECTION_ICONS.Examples}</span>
                    <div>
                        <h2>Examples</h2>
                        <p className="rd-section-desc">{resultsJson.Meta.Sections.Examples}</p>
                    </div>
                </div>
                <div className="rd-cards">
                    {Examples.map((ex, i) => <div key={i} className="rd-card">
                        <span className="rd-card-num">{String(i + 1).padStart(2, '0')}</span>
                        <p>{ex}</p>
                    </div>)}
                </div>
            </section>

            {/* ── Anti-Patterns ── */}
            <section className="rd-section">
                <div className="rd-section-header">
                    <span className="rd-section-icon">{SECTION_ICONS['Anti-Patterns']}</span>
                    <div>
                        <h2>Anti-Patterns</h2>
                        <p className="rd-section-desc">{resultsJson.Meta.Sections["Anti-Patterns"]}</p>
                    </div>
                </div>
                <div className="rd-cards rd-cards-anti">
                    {antiPatterns.map(({ 'anti-pattern': ap, remedy }, i) => <div key={i} className="rd-card rd-card-anti">
                        <div className="rd-anti-top">
                            <span className="rd-anti-badge">✗</span>
                            <p>{ap}</p>
                        </div>
                        <div className="rd-anti-remedy">
                            <span className="rd-remedy-badge">✓</span>
                            <p>{remedy}</p>
                        </div>
                    </div>)}
                </div>
            </section>

            {/* ── Resources ── */}
            {Resources && Resources.length > 0 && <section className="rd-section">
                <div className="rd-section-header">
                    <span className="rd-section-icon">{SECTION_ICONS.Resources}</span>
                    <div>
                        <h2>Resources</h2>
                        <p className="rd-section-desc">{resultsJson.Meta.Sections.Resources}</p>
                    </div>
                </div>
                <div className="rd-resources">
                    {Resources.map((res, i) => <a key={i} href={res.link} target="_blank" rel="noopener noreferrer" className="rd-resource">
                        <span className="rd-resource-type">{res.type}</span>
                        <span className="rd-resource-name">{res.name}</span>
                        <span className="rd-resource-arrow">→</span>
                    </a>)}
                </div>
            </section>}

            {/* ── Level navigation ── */}
            <div className="rd-nav">
                <div className="rd-nav-side">
                    {prevDan && (
                        <Link to={`/results/${topic}/${danToSlug(prevDan)}`} className="rail-link">
                            <img src={DAN_SPRITES[prevDan]} alt="" className="rail-sprite" />
                            <span className="rail-name">{resultsJson.Meta.Dans[prevDan].name}</span>
                            <span className="rail-chevron">{"\u2039"}</span>
                        </Link>
                    )}
                </div>
                <div className="rd-nav-side">
                    {nextDan && (
                        <Link to={`/results/${topic}/${danToSlug(nextDan)}`} className="rail-link">
                            <img src={DAN_SPRITES[nextDan]} alt="" className="rail-sprite" />
                            <span className="rail-name">{resultsJson.Meta.Dans[nextDan].name}</span>
                            <span className="rail-chevron">{"\u203A"}</span>
                        </Link>
                    )}
                </div>
            </div>
        </> : <>

                <div className="unicorn-card">
                    <img src={goldEgg} alt="Golden Egg" />
                    <h2>The Golden Egg</h2>
                    <p>Every chicken starts as an egg. You ended as a legend.</p>
                    <p className="unicorn-sub">There's nothing left to unlock — except maybe a sequel.</p>
                </div>
                <div className="rd-nav">
                    <div className="rd-nav-side">
                        {prevDan && (
                            <Link to={`/results/${topic}/${danToSlug(prevDan)}`} className="rail-link">
                                <img src={DAN_SPRITES[prevDan]} alt="" className="rail-sprite" />
                                <span className="rail-name">{resultsJson.Meta.Dans[prevDan].name}</span>
                                <span className="rail-chevron">{"\u2039"}</span>
                            </Link>
                        )}
                    </div>
                    <div className="rd-nav-side" />
                </div>
            </>}
    </div>
}
