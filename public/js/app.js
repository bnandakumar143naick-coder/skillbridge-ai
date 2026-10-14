// public/js/app.js
// Frontend logic: page switching, form validation, fetch() to the backend,
// and rendering the results dashboard.

/* ---------- Shortcuts ---------- */
const $ = (id) => document.getElementById(id);

const form = $("assessForm");
const formAlert = $("formAlert");
const submitBtn = $("submitBtn");
const navResults = $("navResults");

/* ---------- 1. Page (view) switching ---------- */
function showView(name) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  $("view-" + name).classList.add("active");

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.view === name);
  });

  $("navLinks").classList.remove("open");
  $("navToggle").setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Every element with data-view="..." switches the page when clicked.
document.querySelectorAll("[data-view]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    showView(el.dataset.view);
  });
});

// Mobile menu button
$("navToggle").addEventListener("click", () => {
  const open = $("navLinks").classList.toggle("open");
  $("navToggle").setAttribute("aria-expanded", String(open));
});

/* ---------- 2. Form validation (frontend) ---------- */
function clearErrors() {
  ["name", "education", "skills", "role"].forEach((f) => ($(f + "Error").textContent = ""));
  ["name", "education", "role"].forEach((f) => $(f).classList.remove("invalid"));
  formAlert.hidden = true;
  formAlert.innerHTML = "";
}

function getFormData() {
  return {
    name: $("name").value.trim(),
    education: $("education").value,
    skills: Array.from(form.querySelectorAll('input[name="skills"]:checked')).map((c) => c.value),
    role: $("role").value
  };
}

function validate(data) {
  clearErrors();
  let valid = true;

  if (data.name.length < 2) {
    $("nameError").textContent = "Enter your name (at least 2 characters).";
    $("name").classList.add("invalid");
    valid = false;
  }
  if (!data.education) {
    $("educationError").textContent = "Select your education level or degree.";
    $("education").classList.add("invalid");
    valid = false;
  }
  if (data.skills.length === 0) {
    $("skillsError").textContent = "Select at least one skill you currently have.";
    valid = false;
  }
  if (!data.role) {
    $("roleError").textContent = "Select your target job role.";
    $("role").classList.add("invalid");
    valid = false;
  }
  return valid;
}

function showFormError(messages) {
  formAlert.innerHTML = "";
  const title = document.createElement("div");
  title.textContent = "We could not analyse your skills:";
  const list = document.createElement("ul");
  messages.forEach((m) => {
    const li = document.createElement("li");
    li.textContent = m;
    list.appendChild(li);
  });
  formAlert.append(title, list);
  formAlert.hidden = false;
}

/* ---------- 3. Send data to the backend with fetch() ---------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = getFormData();
  if (!validate(data)) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Analysing...";

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      showFormError(result.errors || ["Something went wrong. Please try again."]);
      return;
    }
    renderResults(result);
  } catch (err) {
    showFormError(["Cannot reach the server. Make sure it is running with: npm start"]);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Analyse My Skills";
  }
});

// Clear button also removes error messages
$("resetBtn").addEventListener("click", clearErrors);

/* ---------- 4. Render the results dashboard ---------- */
function fillChips(listId, items, emptyText) {
  const ul = $(listId);
  ul.innerHTML = "";
  if (items.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = emptyText;
    ul.appendChild(li);
    return;
  }
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

function renderResults(r) {
  $("successAlert").textContent = "Analysis complete. Here are your results, " + r.name + ".";
  $("successAlert").hidden = false;

  $("resultTitle").textContent = "Results for " + r.role;
  $("resultSubtitle").textContent =
    r.name + " · " + r.education + ". " + r.roleDescription;

  $("matchPercent").textContent = r.percentage;
  $("matchLevel").textContent = r.level;
  $("matchFormula").textContent =
    r.matchedSkills.length + " of " + r.requiredSkills.length + " required skills matched.";
  $("progressTrack").setAttribute("aria-valuenow", r.percentage);

  // Reset the bar to 0, then animate to the real value.
  const fill = $("progressFill");
  fill.style.width = "0%";
  requestAnimationFrame(() => requestAnimationFrame(() => (fill.style.width = r.percentage + "%")));

  fillChips("matchedList", r.matchedSkills, "None of the required skills yet.");
  fillChips("extraList", r.extraSkills, "No additional skills.");
  fillChips("missingList", r.missingSkills, "Nothing missing. You have every required skill.");

  const steps = $("nextSteps");
  steps.innerHTML = "";
  r.nextSteps.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s;
    steps.appendChild(li);
  });

  const roadmap = $("roadmap");
  roadmap.innerHTML = "";
  r.roadmap.forEach((w) => {
    const card = document.createElement("article");
    card.className = "card week";

    const label = document.createElement("span");
    label.className = "week-label";
    label.textContent = "Week " + w.week;

    const title = document.createElement("h4");
    title.textContent = w.title;

    const ul = document.createElement("ul");
    w.tasks.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });

    card.append(label, title, ul);
    roadmap.appendChild(card);
  });

  $("methodNote").textContent = "Method: " + r.method;

  navResults.hidden = false;
  showView("results");
}

/* ---------- 5. Analyse Again ---------- */
$("analyseAgainBtn").addEventListener("click", () => {
  form.reset();
  clearErrors();
  $("successAlert").hidden = true;
  navResults.hidden = true;
  showView("assess");
});
