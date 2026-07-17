// ============================================================
// Student Survival Hub — frontend
// Talks to the Express backend built in Project 2.
// ============================================================

const API_BASE = "http://localhost:5000";

const daysUntil = (dateStr) => {
  const target = new Date(dateStr);
  if (isNaN(target)) return null;
  const diffMs = target.setHours(0,0,0,0) - new Date().setHours(0,0,0,0);
  return Math.round(diffMs / 86400000);
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

const escapeHtml = (str) =>
  String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

// ---------------- Resource configuration ----------------
// Each entry describes: the endpoint, the tab, the add-entry form fields,
// and how to render one saved item as a card.

const RESOURCES = [
  {
    key: "students",
    label: "Students",
    code: "STU",
    endpoint: "/students",
    fields: [
      { name: "name", label: "Name", type: "text", placeholder: "e.g. Areeba Khan" },
      { name: "semester", label: "Semester (1-8)", type: "number", min: 1, max: 8, placeholder: "6" },
      { name: "cgpa", label: "CGPA (0-4)", type: "number", step: "0.01", min: 0, max: 4, placeholder: "3.70" }
    ],
    renderEntry: (item) => `
      <div class="entry-title">${escapeHtml(item.name)}</div>
      <div class="entry-sub">Semester ${escapeHtml(item.semester)} &middot; CGPA ${escapeHtml(item.cgpa)}</div>
    `
  },
  {
    key: "assignments",
    label: "Assignments",
    code: "ASN",
    endpoint: "/assignments",
    fields: [
      { name: "title", label: "Title", type: "text", placeholder: "e.g. OS Assignment 2" },
      { name: "subject", label: "Subject", type: "text", placeholder: "e.g. Operating Systems" },
      { name: "dueDate", label: "Due date", type: "date" }
    ],
    renderEntry: (item) => {
      const d = daysUntil(item.dueDate);
      const dueLabel = d === null ? "" : d < 0 ? `${Math.abs(d)}d overdue` : d === 0 ? "due today" : `in ${d}d`;
      const badgeClass = d !== null && d < 0 ? "badge-urgent" : d !== null && d <= 2 ? "badge-medium" : "badge-neutral";
      return `
        <div class="entry-title">${escapeHtml(item.title)}</div>
        <div class="entry-sub">${escapeHtml(item.subject)} &middot; due ${formatDate(item.dueDate)}</div>
        <div class="entry-meta">
          <span class="badge ${badgeClass}">${escapeHtml(item.status || "pending")}</span>
          ${dueLabel ? `<span class="badge badge-neutral">${dueLabel}</span>` : ""}
        </div>
      `;
    }
  },
  {
    key: "notes",
    label: "Notes",
    code: "NOT",
    endpoint: "/notes",
    fields: [
      { name: "title", label: "Title", type: "text", placeholder: "e.g. Induction Proofs" },
      { name: "subject", label: "Subject", type: "text", placeholder: "e.g. Discrete Math" },
      { name: "content", label: "Content", type: "textarea", placeholder: "Base case + inductive step..." }
    ],
    renderEntry: (item) => `
      <div class="entry-title">${escapeHtml(item.title)}</div>
      <div class="entry-sub">${escapeHtml(item.subject)}</div>
      <div class="entry-sub">${escapeHtml((item.content || "").slice(0, 140))}${(item.content || "").length > 140 ? "&hellip;" : ""}</div>
    `
  },
  {
    key: "tasks",
    label: "Tasks",
    code: "TSK",
    endpoint: "/tasks",
    fields: [
      { name: "title", label: "Title", type: "text", placeholder: "e.g. Revise K-Maps" },
      { name: "priority", label: "Priority", type: "select", options: ["low", "medium", "high"] }
    ],
    renderEntry: (item) => `
      <div class="entry-title">${escapeHtml(item.title)}</div>
      <div class="entry-meta">
        <span class="badge badge-${escapeHtml(item.priority)}">${escapeHtml(item.priority)}</span>
        <span class="badge ${item.completed ? "badge-done" : "badge-neutral"}">${item.completed ? "done" : "open"}</span>
      </div>
    `
  },
  {
    key: "exams",
    label: "Exams",
    code: "EXM",
    endpoint: "/exams",
    fields: [
      { name: "subject", label: "Subject", type: "text", placeholder: "e.g. Digital Logic" },
      { name: "date", label: "Date", type: "date" },
      { name: "syllabus", label: "Syllabus", type: "text", placeholder: "e.g. Chapters 1-5" }
    ],
    renderEntry: (item) => {
      const d = daysUntil(item.date);
      const dueLabel = d === null ? "" : d < 0 ? "past" : d === 0 ? "today" : `in ${d}d`;
      return `
        <div class="entry-title">${escapeHtml(item.subject)}</div>
        <div class="entry-sub">${formatDate(item.date)} &middot; ${escapeHtml(item.syllabus)}</div>
        ${dueLabel ? `<div class="entry-meta"><span class="badge ${d !== null && d <= 3 ? "badge-urgent" : "badge-neutral"}">${dueLabel}</span></div>` : ""}
      `;
    }
  },
  {
    key: "pomodoro",
    label: "Pomodoro",
    code: "POM",
    endpoint: "/pomodoro",
    fields: [
      { name: "task", label: "Task", type: "text", placeholder: "e.g. Study for Digital Logic exam" },
      { name: "duration", label: "Duration (minutes)", type: "number", min: 1, placeholder: "25" }
    ],
    renderEntry: (item) => `
      <div class="entry-title">${escapeHtml(item.task)}</div>
      <div class="entry-sub">${escapeHtml(item.duration)} min</div>
      <div class="entry-stamp">logged ${item.completedAt ? new Date(item.completedAt).toLocaleString() : ""}</div>
    `
  },
  {
    key: "planner",
    label: "Planner",
    code: "PLN",
    endpoint: "/planner",
    fields: [
      { name: "day", label: "Day", type: "select", options: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] },
      { name: "activity", label: "Activity", type: "text", placeholder: "e.g. Finish Project 2 backend" }
    ],
    renderEntry: (item) => `
      <div class="entry-title">${escapeHtml(item.day)}</div>
      <div class="entry-sub">${escapeHtml(item.activity)}</div>
    `
  }
];

let activeKey = RESOURCES[0].key;

// ---------------- Backend connection check ----------------

async function checkConnection() {
  const stamp = document.getElementById("statusStamp");
  const text = document.getElementById("statusText");
  try {
    const res = await fetch(API_BASE + "/", { method: "GET" });
    if (!res.ok) throw new Error("not ok");
    stamp.dataset.state = "online";
    text.textContent = "CONNECTED";
  } catch (err) {
    stamp.dataset.state = "offline";
    text.textContent = "OFFLINE";
  }
}

// ---------------- Tabs ----------------

function buildTabs() {
  const nav = document.getElementById("tabs");
  nav.innerHTML = "";
  RESOURCES.forEach((r) => {
    const btn = document.createElement("button");
    btn.className = "tab-btn";
    btn.type = "button";
    btn.role = "tab";
    btn.setAttribute("aria-selected", r.key === activeKey ? "true" : "false");
    btn.innerHTML = `<span class="tab-code">${r.code}</span><span class="tab-label">${r.label}</span>`;
    btn.addEventListener("click", () => selectResource(r.key));
    nav.appendChild(btn);
  });
}

function selectResource(key) {
  activeKey = key;
  buildTabs();
  renderPanel();
}

// ---------------- Form ----------------

function buildForm(resource) {
  const form = document.getElementById("entryForm");
  form.innerHTML = "";

  resource.fields.forEach((f) => {
    const wrap = document.createElement("div");
    wrap.className = "field";

    const label = document.createElement("label");
    label.setAttribute("for", `field-${f.name}`);
    label.textContent = f.label;
    wrap.appendChild(label);

    let input;
    if (f.type === "textarea") {
      input = document.createElement("textarea");
    } else if (f.type === "select") {
      input = document.createElement("select");
      f.options.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        input.appendChild(o);
      });
    } else {
      input = document.createElement("input");
      input.type = f.type;
      if (f.min !== undefined) input.min = f.min;
      if (f.max !== undefined) input.max = f.max;
      if (f.step !== undefined) input.step = f.step;
      if (f.placeholder) input.placeholder = f.placeholder;
    }
    input.id = `field-${f.name}`;
    input.name = f.name;
    input.required = true;

    wrap.appendChild(input);
    form.appendChild(wrap);
  });

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "submit-btn";
  submit.textContent = `Save to ${resource.label}`;
  form.appendChild(submit);

  form.onsubmit = (e) => handleSubmit(e, resource);
}

async function handleSubmit(e, resource) {
  e.preventDefault();
  const form = e.target;
  const errorEl = document.getElementById("formError");
  errorEl.classList.remove("visible");
  errorEl.textContent = "";

  const payload = {};
  resource.fields.forEach((f) => {
    const raw = form.elements[f.name].value;
    payload[f.name] = f.type === "number" ? Number(raw) : raw;
  });

  const submitBtn = form.querySelector(".submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    const res = await fetch(API_BASE + resource.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || "Something went wrong.";
      errorEl.classList.add("visible");
    } else {
      form.reset();
      await loadEntries(resource);
    }
  } catch (err) {
    errorEl.textContent = "Could not reach the server. Is the backend running?";
    errorEl.classList.add("visible");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = `Save to ${resource.label}`;
  }
}

// ---------------- Entry list ----------------

async function loadEntries(resource) {
  const listEl = document.getElementById("entryList");
  const countEl = document.getElementById("panelCount");
  listEl.innerHTML = `<div class="loading-state">Fetching ${resource.label.toLowerCase()}&hellip;</div>`;

  try {
    const res = await fetch(API_BASE + resource.endpoint);
    if (!res.ok) throw new Error("request failed");
    const items = await res.json();

    countEl.textContent = `${items.length} ${items.length === 1 ? "entry" : "entries"}`;

    if (items.length === 0) {
      listEl.innerHTML = `<div class="empty-state">This folder is empty. Add your first ${resource.label.toLowerCase().slice(0, -1) || resource.label.toLowerCase()} on the left.</div>`;
      return;
    }

    listEl.innerHTML = items
      .slice()
      .reverse()
      .map((item) => `<div class="entry">${resource.renderEntry(item)}</div>`)
      .join("");
  } catch (err) {
    countEl.textContent = "";
    listEl.innerHTML = `<div class="fetch-error-state">Couldn't load ${resource.label.toLowerCase()}. Make sure the backend is running at ${API_BASE}.</div>`;
  }
}

// ---------------- Panel ----------------

function renderPanel() {
  const resource = RESOURCES.find((r) => r.key === activeKey);
  document.getElementById("panelCode").textContent = resource.code;
  document.getElementById("panelTitle").textContent = resource.label;
  document.getElementById("formHeading").textContent = `Add ${resource.label.toLowerCase().slice(0, -1) || resource.label.toLowerCase()}`;
  document.getElementById("formError").classList.remove("visible");
  buildForm(resource);
  loadEntries(resource);
}

// ---------------- Init ----------------

document.getElementById("apiBaseLabel").textContent = API_BASE;
buildTabs();
renderPanel();
checkConnection();
