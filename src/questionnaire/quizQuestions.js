export const ROLES = {
    "ENTRY": "Entry-level Software Engineer",
    "NORMAL": "Software Engineer",
    "SENIOR": "Senior Software Engineer",
    "SENIOR_II": "Senior Software Engineer II",
    "STAFF": "Staff Software Engineer",
    "PRINCIPAL": "Principal Software Engineer"
}

export var quizQuestions = [
    {
        question: "When it’s unclear why you need to build a certain capability, what do you do?",
        answers: [
            {
                content: "As long as I understand the task, it’s fine with me",
                type: ROLES.ENTRY
            },
            {
                content: "Ask my manager, this is their job",
                type: ROLES.NORMAL
            },
            {
                content: "I feel comfortable talking with various people (product, sales, etc.) and figuring out the answer",
                type: ROLES.SENIOR
            },
            {
                content: "I proactively seek to understand the business needs and talk with internal customers to serve them better",
                type: ROLES.SENIOR_II
            },
            {
                content: "I'm usually the one who figures these things out for others, driving alignment across teams",
                type: ROLES.STAFF
            },
            {
                content: "I define and shape the business needs myself, representing them to management and beyond",
                type: ROLES.PRINCIPAL
            }
        ]
    },
    {
        question: "When you lead projects, how big are they (number of people involved / time)?",
        answers: [
            {
                content: "I help with other projects; haven't led one myself yet",
                type: ROLES.ENTRY
            },
            {
                content: "I work by myself / up to a few weeks",
                type: ROLES.NORMAL
            },
            {
                content: "Me and 2-3 more people from my team / a few weeks to a few months",
                type: ROLES.SENIOR
            },
            {
                content: "I lead large projects (>4w of work) spanning multiple systems with support from peers",
                type: ROLES.SENIOR_II
            },
            {
                content: "Me and 5-15 people from various teams, for a few weeks to a few months, driving adoption and momentum",
                type: ROLES.STAFF
            },
            {
                content: "I lead the biggest multi-year cross-group initiatives in the company",
                type: ROLES.PRINCIPAL
            }
        ]
    },
    {
        question: "Do you know well the company’s goals for the year and why these goals were chosen?",
        answers: [
            {
                content: "Not really. I remember some numbers but not more than that. I don’t think it’s needed for me to work.",
                type: ROLES.ENTRY
            },
            {
                content: "Yes, I know the goals well. I don't know the rationale for picking them",
                type: ROLES.NORMAL
            },
            {
                content: "I can explain the goals and why they're critical for our success to other teammates",
                type: ROLES.SENIOR
            },
            {
                content: "I actively use the company's goals to drive my team's backlog and quarterly planning",
                type: ROLES.SENIOR_II
            },
            {
                content: "I understand the yearly goals of many teams in the group and how they map to business impact",
                type: ROLES.STAFF
            },
            {
                content: "I use the company's goals to define what the group should invest in and attract talent",
                type: ROLES.PRINCIPAL
            }
        ]
    },
    {
        question: "Who usually hears from you?",
        answers: [
            {
                content: "I update my manager on my progress.",
                type: ROLES.ENTRY
            },
            {
                content: "My teammates. I provide context on my work.",
                type: ROLES.NORMAL
            },
            {
                content: "I tend to update bigger forums around the projects I lead, or things I did to make others’ life easier",
                type: ROLES.SENIOR
            },
            {
                content: "I regularly market and advertise projects, creating excitement for users and driving adoption",
                type: ROLES.SENIOR_II
            },
            {
                content: "It's very common to hear from me on various projects and initiatives. Many people outside of my team know my work.",
                type: ROLES.STAFF
            },
            {
                content: "I represent major company efforts to management, customers, press and conferences.",
                type: ROLES.PRINCIPAL
            }
        ]
    },
    {
        question: "If others are working on a big project (>6 months effort), when are they coming to consult with you?",
        answers: [
            {
                content: "Very rarely. Maybe if it’s around code I wrote.",
                type: ROLES.ENTRY
            },
            {
                content: "Here and there. I do have some expertise in specific types of systems or solutions that people want to leverage my knowledge for",
                type: ROLES.NORMAL
            },
            {
                content: "People consult with me on big projects where I have context - from making sure requirements are solid to the solutions and tradeoffs they have in mind",
                type: ROLES.SENIOR
            },
            {
                content: "I contribute to all major architectural decisions in my domain and read all tech specs. People seek me out for complex design reviews",
                type: ROLES.SENIOR_II
            },
            {
                content: "People consult with me on everything they feel is a big challenge. Even if I don't have specific context, they feel comfortable sharing and getting my perspective.",
                type: ROLES.STAFF
            },
            {
                content: "I'm the go-to person on company-wide critical projects. I create the technical vision and anticipate future needs.",
                type: ROLES.PRINCIPAL
            }
        ]
    }
];

export default { quizQuestions, ROLES };
