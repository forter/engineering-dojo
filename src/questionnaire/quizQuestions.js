export const ROLES = {
    "ENTRY": "Entry-level Software Engineer",
    "NORMAL": "Software Engineer",
    "SENIOR": "Senior Software Engineer",
    "SENIOR_II": "Senior Software Engineer II",
    "STAFF": "Staff Software Engineer",
    "PRINCIPAL": "Principal Software Engineer"
}

export const CHICKEN_NAMES = {
    [ROLES.ENTRY]: { name: "Fresh Egg", emoji: "🥚" },
    [ROLES.NORMAL]: { name: "Hatchling", emoji: "🐣" },
    [ROLES.SENIOR]: { name: "Free Ranger", emoji: "🐥" },
    [ROLES.SENIOR_II]: { name: "Head Rooster", emoji: "🐔" },
    [ROLES.STAFF]: { name: "Golden Goose", emoji: "🪿" },
    [ROLES.PRINCIPAL]: { name: "Legendary Phoenix", emoji: "🔥" },
}

export var quizQuestions = [
    {
        question: "Someone drops a ticket on you with zero context. What’s your move?",
        answers: [
            {
                content: "If I know what to code, I’m good. Context is a luxury.",
                type: ROLES.ENTRY
            },
            {
                content: "I’ll ask my manager. That’s literally their job.",
                type: ROLES.NORMAL
            },
            {
                content: "I’ll bug product, sales, whoever — until I get the full picture.",
                type: ROLES.SENIOR
            },
            {
                content: "I’m already talking to internal customers proactively. I don’t wait for confusion.",
                type: ROLES.SENIOR_II
            },
            {
                content: "I’m usually the one who figured it out and is explaining it to everyone else.",
                type: ROLES.STAFF
            },
            {
                content: "I define the business needs. The ticket probably originated from my vision.",
                type: ROLES.PRINCIPAL
            },
        ]
    },
    {
        question: "How big of an operation are you running around here?",
        answers: [
            {
                content: "I help out on other people’s projects. Haven’t led one yet.",
                type: ROLES.ENTRY
            },
            {
                content: "Solo missions. A few weeks, me and my headphones.",
                type: ROLES.NORMAL
            },
            {
                content: "Me and 2–3 teammates, shipping stuff over a few weeks to months.",
                type: ROLES.SENIOR
            },
            {
                content: "Big projects spanning multiple systems, 4+ weeks, with peer support.",
                type: ROLES.SENIOR_II
            },
            {
                content: "5–15 people across teams. I’m basically a project gravity well.",
                type: ROLES.STAFF
            },
            {
                content: "The biggest multi-year, cross-org initiatives. If it matters, I’m leading it.",
                type: ROLES.PRINCIPAL
            },
        ]
    },
    {
        question: "Quick — what are your company’s goals this year and why?",
        answers: [
            {
                content: "I remember some numbers from that all-hands. Vibes, mostly.",
                type: ROLES.ENTRY
            },
            {
                content: "I know the goals cold. No clue why they were picked though.",
                type: ROLES.NORMAL
            },
            {
                content: "I can explain them to teammates and why they actually matter.",
                type: ROLES.SENIOR
            },
            {
                content: "I use them to drive my team’s roadmap and quarterly planning.",
                type: ROLES.SENIOR_II
            },
            {
                content: "I know the goals of multiple teams and how they map to real business impact.",
                type: ROLES.STAFF
            },
            {
                content: "I use them to decide what the entire group should invest in and attract talent.",
                type: ROLES.PRINCIPAL
            },
        ]
    },
    {
        question: "When you have something to say, who’s actually listening?",
        answers: [
            {
                content: "My manager, when I give status updates.",
                type: ROLES.ENTRY
            },
            {
                content: "My teammates. I keep them in the loop on what I’m doing.",
                type: ROLES.NORMAL
            },
            {
                content: "Bigger forums — I share project wins and useful stuff I’ve built.",
                type: ROLES.SENIOR
            },
            {
                content: "I market our projects, create excitement, and drive adoption across teams.",
                type: ROLES.SENIOR_II
            },
            {
                content: "Everyone. People way outside my team know my name and my work.",
                type: ROLES.STAFF
            },
            {
                content: "Management, customers, press, conferences. I represent the company.",
                type: ROLES.PRINCIPAL
            },
        ]
    },
    {
        question: "A massive project hits a wall. Are people knocking on your door?",
        answers: [
            {
                content: "Only if it involves code I personally wrote.",
                type: ROLES.ENTRY
            },
            {
                content: "Sometimes. I have niche expertise that people tap into here and there.",
                type: ROLES.NORMAL
            },
            {
                content: "Yeah — they want my take on requirements, solutions, and tradeoffs.",
                type: ROLES.SENIOR
            },
            {
                content: "I review every major architectural decision in my domain. People seek me out.",
                type: ROLES.SENIOR_II
            },
            {
                content: "People bring me any big challenge. Even without context, they trust my perspective.",
                type: ROLES.STAFF
            },
            {
                content: "I’m the go-to on company-critical projects. I set the technical vision.",
                type: ROLES.PRINCIPAL
            },
        ]
    },
];

export default { quizQuestions, ROLES, CHICKEN_NAMES };
