# SkillBridge AI

**Discover Your Skills. Bridge Your Gaps. Build Your Future.**

SkillBridge AI is a small career guidance website built for a college Web Technologies project. A student enters their current skills and picks a target job role. The app compares the skills with the requirements of that role, shows the skill gap and match percentage, and creates a week-by-week learning roadmap.

> **Important:** The analysis is **rule-based**. It compares the student's skills with predefined job-role data stored in `data/jobRoles.js`. It does **not** use a trained AI model, does **not** analyse resumes, and does **not** predict real job outcomes.

## Project objectives

1. Let students enter their skills and choose a target job role.
2. Compare the skills with the required skills of the role.
3. Calculate the skill match percentage and identify missing skills.
4. Generate a simple personalised learning roadmap.
5. Practise HTML, CSS, JavaScript, Node.js, Express.js and Git/GitHub teamwork.

## Features

- Home page with project introduction and feature cards
- Assessment form with name, degree, 14 skill checkboxes and 5 job roles
- Frontend validation and server-side validation
- Skill gap analysis with a match percentage and animated progress bar
- Personalised roadmap that changes with the role and the missing skills
- Results dashboard: skills identified, skills to learn, match percentage, next steps
- "Analyse Again" button to return to the form
- Responsive design (desktop and mobile)

**Formula used**

```
Skill Match Percentage = (Matching Required Skills / Total Required Skills) x 100
```

## Technologies used

| Layer    | Technology                       |
|----------|----------------------------------|
| Frontend | HTML5, CSS3, JavaScript (fetch)  |
| Backend  | Node.js, Express.js              |
| Data     | JavaScript object (`data/jobRoles.js`) |
| Tools    | Git, GitHub                      |

No React, no database, no paid APIs.

## Team members

| Student   | Name   | Responsibility                                              |
|-----------|--------|-------------------------------------------------------------|
| Student 1 | [Name] | Home page, navigation bar, general CSS                      |
| Student 2 | [Name] | Assessment form and frontend validation                     |
| Student 3 | [Name] | Express backend, skill-gap analysis, README documentation   |

## Installation requirements

- [Node.js](https://nodejs.org) version 18 or newer (includes npm)
- [Git](https://git-scm.com)
- A modern web browser

Check your versions:

```bash
node -v
npm -v
git --version
```

## Installation and execution

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/skillbridge-ai.git
cd skillbridge-ai

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Open **http://localhost:3000** in your browser.

To use another port: `PORT=4000 npm start` (Windows PowerShell: `$env:PORT=4000; npm start`).

## Project folder structure

```
skillbridge-ai/
├── public/
│   ├── index.html        # All pages (Home, Assessment, Results)
│   ├── css/
│   │   └── style.css     # Theme, layout, responsive rules
│   └── js/
│       └── app.js        # Page switching, validation, fetch(), rendering
├── routes/
│   └── analyze.js        # POST /api/analyze: validation + skill-gap logic
├── data/
│   └── jobRoles.js       # Skills list, job-role requirements, learning tips
├── server.js             # Express server entry point
├── package.json
├── .gitignore
└── README.md
```

## API endpoint

### `POST /api/analyze`

**Request body (JSON)**

```json
{
  "name": "Asha",
  "education": "BCA",
  "skills": ["HTML", "CSS", "Git"],
  "role": "Frontend Developer"
}
```

**Success response (200)**

```json
{
  "success": true,
  "name": "Asha",
  "role": "Frontend Developer",
  "requiredSkills": ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Communication"],
  "matchedSkills": ["HTML", "CSS", "Git"],
  "missingSkills": ["JavaScript", "GitHub", "Communication"],
  "extraSkills": [],
  "percentage": 50,
  "level": "Making progress",
  "nextSteps": ["..."],
  "roadmap": [
    { "week": 1, "title": "Learn JavaScript, GitHub", "tasks": ["..."] }
  ],
  "method": "Rule-based comparison with predefined job-role data (no trained AI model)."
}
```

**Error response (400)**

```json
{ "success": false, "errors": ["Please select a valid target job role."] }
```

Test with curl:

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"name":"Asha","education":"BCA","skills":["HTML","CSS","Git"],"role":"Frontend Developer"}'
```

## GitHub collaboration workflow

Rules for the team:

- Nobody commits directly to `main`.
- One feature branch per task. One Pull Request (PR) per branch.
- Every PR must be reviewed and approved by at least one other teammate before merging.

### Step 1: Repository owner (Student 3) sets up

```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/<owner>/skillbridge-ai.git
git push -u origin main
```

On GitHub: **Settings > Collaborators** and add Student 1 and Student 2.
Optional: **Settings > Branches > Add rule** for `main` and tick "Require a pull request before merging".

### Step 2: Create GitHub Issues

Go to **Issues > New issue** and create three issues, each assigned to one student:

| Issue | Title                                          | Assignee  | Label         |
|-------|------------------------------------------------|-----------|---------------|
| #1    | Build home page, navbar and general CSS        | Student 1 | enhancement   |
| #2    | Build assessment form with validation          | Student 2 | enhancement   |
| #3    | Build Express backend, analysis logic, README  | Student 3 | enhancement   |

### Step 3: Each student creates a feature branch

```bash
git clone https://github.com/<owner>/skillbridge-ai.git   # Students 1 and 2 only
cd skillbridge-ai
npm install

git checkout main
git pull origin main

git checkout -b feature/home-navbar-css          # Student 1
git checkout -b feature/assessment-form          # Student 2
git checkout -b feature/backend-analysis         # Student 3
```

### Step 4: Work, commit and push

```bash
git status
git add .
git commit -m "Add navbar and hero section (#1)"
git push -u origin feature/home-navbar-css
```

Use small, clear commit messages and mention the issue number, for example `(#2)`.

### Step 5: Open a Pull Request

1. Open the repository on GitHub and click **Compare & pull request**.
2. Base branch: `main`. Compare branch: your feature branch.
3. Write a short description of what you changed and add `Closes #1` (use your own issue number) so the issue closes on merge.
4. Under **Reviewers**, select a teammate. Click **Create pull request**.

### Step 6: Code review

The reviewer opens **Files changed** and checks:

- Does the code run (`npm start`) and do the buttons work?
- Is it readable, with sensible names and comments?
- Does it only change the files for that task?

Use **Review changes** to choose **Comment**, **Request changes** or **Approve**. If changes are requested, the author fixes them on the same branch and pushes again. The PR updates automatically.

### Step 7: Merge into `main`

After approval, click **Merge pull request** then **Confirm merge**. Optionally delete the branch.

### Step 8: Everyone updates their local copy

```bash
git checkout main
git pull origin main
```

If two students edited the same lines, Git reports a **merge conflict**. Open the marked file, keep the correct lines, remove the `<<<<<<<`, `=======` and `>>>>>>>` markers, then:

```bash
git add .
git commit -m "Resolve merge conflict"
git push
```

Suggested merge order: backend (Student 3), home and CSS (Student 1), then form (Student 2).

## Limitations

- Analysis is rule-based and uses a small sample dataset (5 roles, 14 skills).
- No login, no saved history and no database. Results disappear on refresh.
- Skills are matched by exact name only. Skill levels (beginner, expert) are not considered.
- Resumes cannot be uploaded or analysed.
- Roadmap lengths are fixed rules, not personalised by available study time.

## Future enhancements

- Add more job roles and skills, loaded from a database such as MongoDB or SQLite
- Skill proficiency levels (beginner, intermediate, advanced)
- Links to free courses for every missing skill
- User accounts and saved progress
- Downloadable PDF report of the roadmap
- Real resume parsing and, later, a trained machine learning model

## License

MIT. For educational use.
