
// data/jobRoles.js
// All "knowledge" of the app lives here: the skill list, the required skills
// for each job role, and short learning tips. Nothing is random or AI-generated.

// Every skill a student can pick (must match the checkboxes in index.html).
const allSkills = [
  "Python", "Java", "C++", "HTML", "CSS", "JavaScript", "SQL",
  "Git", "GitHub", "Data Structures", "Machine Learning",
  "Pandas", "NumPy", "Communication"
];

// Required skills for each target role + a portfolio project idea.
const jobRoles = {
  "Frontend Developer": {
    description: "Builds the visible part of websites and web apps.",
    requiredSkills: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Communication"],
    project: "a responsive personal portfolio website"
  },
  "Backend Developer": {
    description: "Builds servers, APIs and databases that power applications.",
    requiredSkills: ["JavaScript", "SQL", "Data Structures", "Git", "GitHub", "Communication"],
    project: "a REST API (for example a student records or to-do API)"
  },
  "Python Developer": {
    description: "Writes Python programs, scripts and web services.",
    requiredSkills: ["Python", "Data Structures", "SQL", "Git", "GitHub", "Communication"],
    project: "a Python command-line or Flask application with a database"
  },
  "AI/ML Engineer": {
    description: "Builds and trains machine learning models on data.",
    requiredSkills: ["Python", "Machine Learning", "Pandas", "NumPy", "Data Structures", "SQL"],
    project: "a machine learning model (for example a house price predictor) with a short report"
  },
  "Data Analyst": {
    description: "Cleans, analyses and explains data to support decisions.",
    requiredSkills: ["Python", "SQL", "Pandas", "NumPy", "Communication"],
    project: "a data analysis report with charts on a public dataset"
  },

  // New contribution: Full Stack Developer
  "Full Stack Developer": {
    description: "Builds both frontend and backend parts of web applications.",
    requiredSkills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "SQL",
      "Git",
      "GitHub",
      "Communication"
    ],
    project: "a full-stack task management application with frontend, backend and database"
  }
};

// One-line learning tip for each skill, used to build the roadmap.
const skillTips = {
  "Python": "Learn variables, loops, functions, lists and dictionaries.",
  "Java": "Learn classes, objects, inheritance and the collections framework.",
  "C++": "Learn pointers, classes and the Standard Template Library (STL).",
  "HTML": "Learn semantic tags, forms, tables and page structure.",
  "CSS": "Learn the box model, Flexbox, Grid and media queries.",
  "JavaScript": "Learn variables, functions, DOM manipulation, events and fetch().",
  "SQL": "Learn SELECT, INSERT, UPDATE, DELETE, JOINs and table design.",
  "Git": "Learn init, add, commit, branch, merge and resolving conflicts.",
  "GitHub": "Learn pushing code, Issues, Pull Requests and code reviews.",
  "Data Structures": "Practise arrays, linked lists, stacks, queues, trees and hash maps.",
  "Machine Learning": "Learn regression, classification and model evaluation with scikit-learn.",
  "Pandas": "Learn DataFrames, filtering, grouping and cleaning missing data.",
  "NumPy": "Learn arrays, indexing, broadcasting and basic statistics.",
  "Communication": "Practise explaining your projects aloud and writing clear documentation."
};

module.exports = { allSkills, jobRoles, skillTips };
