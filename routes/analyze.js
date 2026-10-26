
const express = require("express");
const { allSkills, jobRoles, skillTips } = require("../data/jobRoles");

const router = express.Router();

function validate(body) {
  const errors = [];
  const data = body || {};

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const education =
    typeof data.education === "string" ? data.education.trim() : "";
  const role = typeof data.role === "string" ? data.role.trim() : "";

  if (name.length < 2 || name.length > 60) {
    errors.push("Student name must be between 2 and 60 characters.");
  }

  if (!education) {
    errors.push("Please select your education level or degree.");
  }

  if (!Object.prototype.hasOwnProperty.call(jobRoles, role)) {
    errors.push("Please select a valid target job role.");
  }

  let skills = [];

  if (!Array.isArray(data.skills) || data.skills.length === 0) {
    errors.push("Please select at least one current skill.");
  } else {
    const unknown = data.skills.filter(
      (skill) => !allSkills.includes(skill)
    );

    if (unknown.length > 0) {
      errors.push("Unknown skill(s): " + unknown.join(", ") + ".");
    }

    skills = [
      ...new Set(data.skills.filter((skill) => allSkills.includes(skill))),
    ];
  }

  return {
    errors,
    clean: { name, education, role, skills },
  };
}

function calculateGap(role, studentSkills) {
  const required = jobRoles[role].requiredSkills;

  const matched = required.filter((skill) =>
    studentSkills.includes(skill)
  );

  const missing = required.filter(
    (skill) => !studentSkills.includes(skill)
  );

  const extra = studentSkills.filter(
    (skill) => !required.includes(skill)
  );

  const percentage =
    required.length === 0
      ? 0
      : Math.round((matched.length / required.length) * 100);

  return { required, matched, missing, extra, percentage };
}

function getLevel(percentage) {
  if (percentage === 100) return "Job-ready";
  if (percentage >= 70) return "Almost there";
  if (percentage >= 40) return "Making progress";
  return "Just getting started";
}

function buildRoadmap(role, missing) {
  const project = jobRoles[role].project;
  const weeks = [];

  if (missing.length === 0) {
    weeks.push({
      week: 1,
      title: "Build a portfolio project",
      tasks: [
        `Build ${project}.`,
        "Use Git and GitHub from the first commit.",
      ],
    });

    weeks.push({
      week: 2,
      title: "Prepare for interviews",
      tasks: [
        `Practise common ${role} interview questions.`,
        "Write a clear README for your project and add it to your resume.",
      ],
    });

    return weeks;
  }

  const perWeek = Math.max(2, Math.ceil(missing.length / 3));

  for (let i = 0; i < missing.length; i += perWeek) {
    const group = missing.slice(i, i + perWeek);

    weeks.push({
      week: weeks.length + 1,
      title: "Learn " + group.join(", "),
      tasks: group.map(
        (skill) =>
          `${skill}: ${
            skillTips[skill] || "Study the fundamentals and practise with examples."
          }`
      ),
    });
  }

  weeks.push({
    week: weeks.length + 1,
    title: "Practise with small projects",
    tasks: [
      `Create one mini project for each new skill (${missing.join(", ")}).`,
      "Solve a few practice problems every day to build confidence.",
    ],
  });

  weeks.push({
    week: weeks.length + 1,
    title: "Build and publish a portfolio project",
    tasks: [
      `Build ${project}.`,
      "Push it to GitHub with a README and add the link to your resume.",
    ],
  });

  return weeks;
}

function buildNextSteps(role, gap) {
  const steps = [];

  if (gap.missing.length > 0) {
    const firstSkill = gap.missing[0];

    steps.push(
      `Start with ${firstSkill}. ${
        skillTips[firstSkill] ||
        "Study the fundamentals and practise with examples."
      }`
    );

    if (gap.missing.length > 1) {
      steps.push(
        `Then cover the remaining skills: ${gap.missing
          .slice(1)
          .join(", ")}.`
      );
    }
  } else {
    steps.push(
      `You have every skill listed for a ${role}. Focus on building projects and preparing for interviews.`
    );
  }

  steps.push(`Build ${jobRoles[role].project} to demonstrate your skills.`);
  steps.push(
    "Keep your code on GitHub and update your resume as you learn."
  );

  return steps;
}

router.post("/analyze", (req, res) => {
  try {
    const { errors, clean } = validate(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const gap = calculateGap(clean.role, clean.skills);

    return res.status(200).json({
      success: true,
      name: clean.name,
      education: clean.education,
      role: clean.role,
      roleDescription: jobRoles[clean.role].description,
      requiredSkills: gap.required,
      matchedSkills: gap.matched,
      missingSkills: gap.missing,
      extraSkills: gap.extra,
      percentage: gap.percentage,
      level: getLevel(gap.percentage),
      nextSteps: buildNextSteps(clean.role, gap),
      roadmap: buildRoadmap(clean.role, gap.missing),
      method:
        "Rule-based comparison with predefined job-role data (no trained AI model).",
    });
  } catch (error) {
    console.error("Analysis error:", error);

    return res.status(500).json({
      success: false,
      errors: ["An internal server error occurred during analysis."],
    });
  }
});

module.exports = router;
