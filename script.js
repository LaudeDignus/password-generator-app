const dom = {
  displayValue: document.querySelector(".display__value"),
  copyBtn: document.querySelector(".actions__copy-btn"),
  feedback: document.querySelector(".actions__feedback"),
  form: document.querySelector(".form"),
  cl: document.querySelector(".cl__value"),
  inputCharLength: document.querySelector(".char-length__input"),
  sectionOptionsCheckbox: document.querySelector(".form__options"),
  textStrength: document.querySelector(".value-strength__text"),
  barStrength: document.querySelector(".value-strength__bars"),
  generateBtn: document.querySelector(".btn"),
};

const state = {
  password: "",
  charLength: 10,
  type: {
    uppercase: true,
    lowercase: false,
    numbers: false,
    symbols: false,
  },
};

const strengthPassword = {
  tooWeak: {
    text: "TOO WEAK!",
    class: "too-weak",
    nbrDiv: 1,
  },
  weak: {
    text: "WEAK",
    class: "weak",
    nbrDiv: 2,
  },
  medium: {
    text: "MEDIUM",
    class: "medium",
    nbrDiv: 3,
  },
  strong: {
    text: "STRONG",
    class: "strong",
    nbrDiv: 4,
  },
};

Object.freeze(dom);

dom.inputCharLength.addEventListener("input", (e) => {
  state.charLength = e.target.value;
  e.target.style.background = `linear-gradient(
    to right,
    var(--clr-green-200) 0%,
    var(--clr-green-200) ${(Number(state.charLength) / 20) * 100}%,
    var(--clr-grey-850) ${(Number(state.charLength) / 20) * 100}%,
    var(--clr-grey-850) 100%
  )`;
  displayCharLength();
});

dom.sectionOptionsCheckbox.addEventListener("input", (e) => {
  const input = e.target.closest(".option__checkbox");
  state.type[input.id] = !state.type[input.id];
  displayCheckbox(input, state.type[input.id]);
});

dom.form.addEventListener("submit", (e) => {
  e.preventDefault();
  dom.copyBtn.classList.remove("not-allowed");
  calculateStrength();
  state.password = generatePassword();
  renderPreview();
  render();
});

const displayCheckbox = (input, value) => {
  input.setAttribute("aria-checked", value);
  input.checked = value;
};

const displayCharLength = () => {
  dom.cl.textContent = state.charLength;
};

const calculateStrength = () => {
  const length = state.charLength;
  const countType = Object.values(state.type).filter((f) => f).length;

  let score = 0;

  if (length < 6) score = -2;
  else if (length < 8) score = -1;
  else if (length < 12) score = 2;
  else if (length < 16) score = 3;
  else score = 4;

  score += countType;

  if (length >= 12 && countType >= 3) score += 1;
  if (length >= 16 && countType === 4) score += 2;

  score = Math.max(0, score);

  if (score <= 2) return strengthPassword.tooWeak;
  if (score <= 4) return strengthPassword.weak;
  if (score <= 6) return strengthPassword.medium;
  return strengthPassword.strong;
};

const displayCalculateStrength = (strength) => {
  dom.textStrength.textContent = strength.text;
  const bars = dom.barStrength.querySelectorAll(".value__bar");
  bars.forEach((bar, index) => {
    bar.classList.forEach((cls) => {
      if (cls !== "value__bar") {
        bar.classList.remove(cls);
      }
    });
    if (index < strength.nbrDiv) {
      bar.classList.add(`value__bar--${strength.class}`);
    }
  });
};

dom.form.addEventListener("change", () => {
  init();
});

const generatePassword = () => {
  const pools = Object.keys(state.type).filter((key) => state.type[key]);
  return shuffle(
    generatePasswordFromPools(pools, Number(state.charLength)),
  ).join("");
};

const generateCharRange = (startChar, endChar) => {
  let char = [];
  const start = startChar.charCodeAt(0);
  const end = endChar.charCodeAt(0);
  for (let i = start; i <= end; i++) {
    char.push(String.fromCharCode(i));
  }
  return char.join("");
};

const objPools = {
  lowercase: generateCharRange("a", "z"),
  uppercase: generateCharRange("A", "Z"),
  numbers: generateCharRange("0", "9"),
  symbols: "!@#$%^&*()-_=+?.",
};

Object.freeze(objPools);

const generatePasswordFromPools = (pools, length) => {
  let charPassword = [];

  if (length <= 0 || pools.length === 0) return [];

  for (let i = 0; i < length; i++) {
    if (i < pools.length) {
      const firstPool = objPools[pools[i]];
      charPassword.push(firstPool[secureRandomIndex(firstPool.length)]);
    } else {
      const randomPool = objPools[pools[secureRandomIndex(pools.length)]];
      charPassword.push(randomPool[secureRandomIndex(randomPool.length)]);
    }
  }
  return charPassword;
};

const secureRandomIndex = (length) => {
  const max = 2 ** 32 - 1;
  const limit = max - (max % length);
  let n;
  do {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    n = array[0];
  } while (n >= limit);

  return n % length;
};

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomIndex(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const render = () => {
  dom.displayValue.classList.remove("preview-password");
};

const renderPreview = () => {
  dom.displayValue.textContent = state.password;
  dom.displayValue.classList.add("preview-password");
};

dom.generateBtn.addEventListener("click", () => {
  setTimeout(() => {
    dom.generateBtn.blur();
  }, 150);
});

dom.copyBtn.addEventListener("click", () => {
  if (!state.password || dom.copyBtn.classList.contains("not-allowed")) return;
  navigator.clipboard.writeText(state.password);
  dom.feedback.classList.remove("hide-feedback");
  setTimeout(() => {
    dom.feedback.classList.add("hide-feedback");
  }, 500);
});

const init = () => {
  dom.copyBtn.classList.add("not-allowed");
  const strength = calculateStrength();
  state.password = generatePassword();
  displayCharLength();
  displayCalculateStrength(strength);
  renderPreview();
};

init();
