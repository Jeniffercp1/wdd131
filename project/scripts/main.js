const resources = [
  {
    id: `a1-visual-vocabulary`,
    title: `A1 Visual Vocabulary`,
    level: `A1`,
    type: `Image practice`,
    description: `Study everyday words with picture groups for family, home, school, and food.`,
    url: `https://learnenglish.britishcouncil.org/vocabulary/a1-a2-vocabulary`
  },
  {
    id: `a1-a2-grammar`,
    title: `Basic Grammar Practice`,
    level: `A1-A2`,
    type: `Grammar`,
    description: `Review simple verbs, questions, prepositions, and short sentence patterns.`,
    url: `https://learnenglish.britishcouncil.org/grammar/a1-a2-grammar`
  },
  {
    id: `cambridge-learning`,
    title: `Cambridge English Activities`,
    level: `A1-A2`,
    type: `Study link`,
    description: `Find extra activities for reading, listening, writing, and speaking practice.`,
    url: `https://www.cambridgeenglish.org/learning-english/`
  }
];

const grammarQuestions = [
  {
    prompt: `Choose the correct sentence.`,
    options: [`He likes coffee.`, `He like coffee.`, `He liking coffee.`],
    answer: `He likes coffee.`
  },
  {
    prompt: `Choose the best question.`,
    options: [`Where you live?`, `Where do you live?`, `Where does you live?`],
    answer: `Where do you live?`
  },
  {
    prompt: `Choose the correct past sentence.`,
    options: [`I visited my sister yesterday.`, `I visit my sister yesterday.`, `I visiting my sister yesterday.`],
    answer: `I visited my sister yesterday.`
  }
];

let currentQuestionIndex = Number(localStorage.getItem(`jpsQuestionIndex`)) || 0;
let gameScore = Number(localStorage.getItem(`jpsGameScore`)) || 0;

function getStoredArray(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : [];
}

function saveStoredArray(key, values) {
  localStorage.setItem(key, JSON.stringify(values));
}

function updateFooterYear() {
  const yearElement = document.querySelector(`#current-year`);
  if (yearElement) {
    yearElement.textContent = `${new Date().getFullYear()}`;
  }
}

function initMenu() {
  const menuButton = document.querySelector(`.menu-button`);
  const nav = document.querySelector(`#primary-nav`);
  if (!menuButton || !nav) {
    return;
  }

  menuButton.addEventListener(`click`, () => {
    const isOpen = nav.classList.toggle(`open`);
    menuButton.setAttribute(`aria-expanded`, `${isOpen}`);
  });
}

function initPlacementQuiz() {
  const form = document.querySelector(`#placement-form`);
  const result = document.querySelector(`#placement-result`);
  if (!form || !result) {
    return;
  }

  form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const answers = new FormData(form);
    const score = [`q1`, `q2`, `q3`]
      .map((name) => Number(answers.get(name)))
      .reduce((total, value) => total + value, 0);
    const level = score >= 2 ? `A2 practice` : `A1 basics`;
    const message = score >= 2
      ? `Great start. Your answers show that A2 practice may be a good fit.`
      : `A1 basics are the best place to begin. Build confidence with short visual lessons.`;

    localStorage.setItem(`jpsPlacementLevel`, level);
    result.innerHTML = `<p>Your suggested starting point: <strong>${level}</strong></p><p>${message}</p>`;
  });
}

function renderResources() {
  const container = document.querySelector(`#resource-list`);
  if (!container) {
    return;
  }

  const favorites = getStoredArray(`jpsFavoriteResources`);
  container.innerHTML = resources.map((resource) => {
    const isFavorite = favorites.includes(resource.id);
    const buttonLabel = isFavorite ? `Saved` : `Save resource`;
    return `<article class="resource-card">
      <p class="resource-meta">${resource.level} | ${resource.type}</p>
      <h3>${resource.title}</h3>
      <p>${resource.description}</p>
      <a href="${resource.url}" target="_blank" rel="noopener">Open resource</a>
      <button class="button secondary favorite-button" type="button" data-resource="${resource.id}">${buttonLabel}</button>
    </article>`;
  }).join(``);

  document.querySelectorAll(`.favorite-button`).forEach((button) => {
    button.addEventListener(`click`, () => {
      const resourceId = button.dataset.resource;
      const savedResources = getStoredArray(`jpsFavoriteResources`);
      const updatedResources = savedResources.includes(resourceId)
        ? savedResources.filter((id) => id !== resourceId)
        : [...savedResources, resourceId];

      saveStoredArray(`jpsFavoriteResources`, updatedResources);
      renderResources();
    });
  });
}

function renderGrammarGame() {
  const game = document.querySelector(`#grammar-game`);
  const questionElement = document.querySelector(`#game-question`);
  const optionsElement = document.querySelector(`#game-options`);
  const feedbackElement = document.querySelector(`#game-feedback`);
  const nextButton = document.querySelector(`#next-question`);
  if (!game || !questionElement || !optionsElement || !feedbackElement || !nextButton) {
    return;
  }

  const question = grammarQuestions[currentQuestionIndex];
  questionElement.textContent = `${question.prompt}`;
  feedbackElement.textContent = `Current saved score: ${gameScore}`;
  optionsElement.innerHTML = question.options.map((option) => {
    return `<button type="button" data-answer="${option}">${option}</button>`;
  }).join(``);

  optionsElement.querySelectorAll(`button`).forEach((button) => {
    button.addEventListener(`click`, () => {
      const selectedAnswer = button.dataset.answer;
      if (selectedAnswer === question.answer) {
        gameScore += 1;
        feedbackElement.textContent = `Correct. Your saved score is now ${gameScore}.`;
      } else {
        feedbackElement.textContent = `Try again. The correct answer is: ${question.answer}`;
      }
      localStorage.setItem(`jpsGameScore`, `${gameScore}`);
    });
  });

  nextButton.addEventListener(`click`, () => {
    currentQuestionIndex = (currentQuestionIndex + 1) % grammarQuestions.length;
    localStorage.setItem(`jpsQuestionIndex`, `${currentQuestionIndex}`);
    renderGrammarGame();
  }, { once: true });
}

function initTutoringForm() {
  const form = document.querySelector(`#tutoring-form`);
  const savedRequest = document.querySelector(`#saved-request`);
  if (!form || !savedRequest) {
    return;
  }

  const storedRequest = localStorage.getItem(`jpsTutoringRequest`);
  if (storedRequest) {
    const request = JSON.parse(storedRequest);
    savedRequest.innerHTML = `<p>Last saved request: ${request.name}, ${request.level}, ${request.topic}, ${request.time}</p>`;
  }

  form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const request = {
      name: form.elements[`full-name`].value.trim(),
      email: form.elements.email.value.trim(),
      level: form.elements.level.value,
      topic: form.elements.topic.value,
      time: form.elements.time.value.trim(),
      message: form.elements.message.value.trim()
    };

    if (request.name.length < 2) {
      savedRequest.textContent = `Please enter your full name before saving the request.`;
      return;
    }

    localStorage.setItem(`jpsTutoringRequest`, JSON.stringify(request));
    savedRequest.innerHTML = `<p>Thank you, ${request.name}. Your ${request.level} tutoring request for ${request.topic} was saved. Preferred time: ${request.time}.</p>`;
    form.reset();
  });
}

updateFooterYear();
initMenu();
initPlacementQuiz();
renderResources();
renderGrammarGame();
initTutoringForm();
