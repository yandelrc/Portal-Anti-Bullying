const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Recursos educativos
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

const resources = {
  guia: {
    title: "Guía básica de prevención",
    html: `
      <p>La prevención comprende estrategias educativas, psicológicas y sociales dirigidas a reducir la violencia escolar.</p>
      <ul>
        <li>Promover el respeto y la empatía.</li>
        <li>Reconocer tempranamente conductas agresivas.</li>
        <li>No considerar normales las agresiones, burlas o actos de discriminación.</li>
        <li>Comunicar las situaciones a una persona de confianza.</li>
        <li>Involucrar a estudiantes, docentes y familias.</li>
      </ul>
    `
  },
  empatia: {
    title: "La empatía",
    html: `
      <p>La empatía es la capacidad de comprender, reconocer y compartir los sentimientos, emociones y perspectivas de otras personas.</p>
      <ul>
        <li>Escucha antes de juzgar.</li>
        <li>Considera cómo puede sentirse la otra persona.</li>
        <li>Evita burlas y comentarios que puedan causar daño.</li>
        <li>Apoya relaciones basadas en respeto y solidaridad.</li>
      </ul>
    `
  },
  convivencia: {
    title: "Convivencia escolar",
    html: `
      <p>Una convivencia escolar positiva se basa en el respeto mutuo, la inclusión, la participación y la resolución pacífica de conflictos.</p>
      <ul>
        <li>Respeta las diferencias.</li>
        <li>Participa de manera responsable.</li>
        <li>Busca resolver los conflictos sin violencia.</li>
        <li>Contribuye a un ambiente seguro e inclusivo.</li>
      </ul>
    `
  },
  digital: {
    title: "Educación digital",
    html: `
      <p>La educación digital promueve conocimientos, habilidades y actitudes para utilizar las tecnologías de manera segura, ética y responsable.</p>
      <ul>
        <li>Utiliza Internet con responsabilidad.</li>
        <li>Respeta a otras personas en los entornos virtuales.</li>
        <li>Protege tu identidad y privacidad.</li>
        <li>Evita utilizar redes, mensajería o videojuegos para intimidar o humillar.</li>
      </ul>
    `
  }
};

function openModal(key) {
  const item = resources[key];
  modalTitle.textContent = item.title;
  modalContent.innerHTML = item.html;
  modalOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".resource-card").forEach(card => {
  card.addEventListener("click", () => openModal(card.dataset.modal));
});
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modalOverlay.hidden) closeModal();
});

// Quiz
const questions = [
  {
    q: "¿Cuál de estas características aparece en la definición de bullying?",
    options: ["Es siempre accidental", "Es intencional y repetitivo", "Solo ocurre en Internet", "Nunca existe desequilibrio de poder"],
    answer: 1
  },
  {
    q: "¿Cuál es una acción de prevención?",
    options: ["Normalizar las burlas", "Aislar a la persona afectada", "Promover respeto y empatía", "Compartir rumores"],
    answer: 2
  },
  {
    q: "¿Qué es el ciberbullying?",
    options: ["Un juego educativo", "Una modalidad de acoso mediante tecnologías digitales", "Una clase virtual", "Una red social"],
    answer: 1
  },
  {
    q: "¿Quiénes pueden participar en la prevención del bullying?",
    options: ["Solo los estudiantes", "Solo los docentes", "Solo las familias", "Estudiantes, docentes y familias"],
    answer: 3
  },
  {
    q: "¿Qué favorece una convivencia escolar positiva?",
    options: ["Respeto e inclusión", "Discriminación", "Amenazas", "Exclusión"],
    answer: 0
  }
];

let current = 0;
let score = 0;
let selected = false;

const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const questionNumber = document.getElementById("questionNumber");
const scoreLabel = document.getElementById("scoreLabel");
const progressBar = document.getElementById("progressBar");
const quizResult = document.getElementById("quizResult");

function renderQuestion() {
  selected = false;
  nextBtn.disabled = true;
  quizResult.hidden = true;
  const item = questions[current];

  questionNumber.textContent = `Pregunta ${current + 1} de ${questions.length}`;
  scoreLabel.textContent = `Puntaje: ${score}`;
  questionText.textContent = item.q;
  progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;

  answers.innerHTML = "";
  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index, button));
    answers.appendChild(button);
  });

  nextBtn.textContent = current === questions.length - 1 ? "Ver resultado" : "Siguiente";
}

function chooseAnswer(index, button) {
  if (selected) return;
  selected = true;
  const item = questions[current];
  const all = document.querySelectorAll(".answer");
  all.forEach(btn => btn.disabled = true);

  if (index === item.answer) {
    score++;
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
    all[item.answer].classList.add("correct");
  }

  scoreLabel.textContent = `Puntaje: ${score}`;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    questionText.textContent = "¡Actividad completada!";
    answers.innerHTML = "";
    nextBtn.textContent = "Repetir quiz";
    nextBtn.disabled = false;
    quizResult.hidden = false;
    const message =
      score === questions.length
        ? "Excelente. Reconoces muy bien los conceptos de prevención."
        : score >= 3
          ? "Muy bien. Tienes una buena base para seguir aprendiendo."
          : "Puedes repasar las secciones del portal y volver a intentarlo.";
    quizResult.textContent = `${message} Resultado: ${score}/${questions.length}.`;
    progressBar.style.width = "100%";
    nextBtn.onclick = () => {
      current = 0;
      score = 0;
      nextBtn.onclick = null;
      renderQuestion();
    };
  }
};

renderQuestion();
