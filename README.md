# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![preview](./preview.jpg)

### Links

- Live Site URL: [password-generator.miwodi.com](https://password-generator.miwodi.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- BEM

### What I learned

## 🧠 What I Learned

### 🎨 Custom Styling Form Elements

- Fully customizing form inputs, especially `input[type="range"]`
- Removing default browser styles to gain complete design control
- Styling the slider track using gradients to create a dynamic progress effect
- Customizing the slider thumb and adding interactive hover states
- Improving user experience through visual feedback and polished UI details

```css
.char-length__input {
  appearance: none;
  width: 100%;
  height: 0.5rem;
  background: linear-gradient(
    to right,
    var(--clr-green-200) 0%,
    var(--clr-green-200) 50%,
    var(--clr-grey-850) 50%,
    var(--clr-grey-850) 100%
  );
}

.char-length__input::-webkit-slider-thumb {
  appearance: none;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background-color: var(--clr-white);
  cursor: pointer;
}

.char-length__input::-webkit-slider-thumb:hover {
  position: relative;
  background-color: var(--clr-green-200);
  border: 2px solid var(--clr-grey-850);
}
```

---

### 🔐 Secure Random Number Generation

- Understanding why `Math.random()` is not cryptographically secure
- Using the Web Crypto API to generate secure random values
- Avoiding modulo bias through rejection sampling
- Creating reusable logic for generating secure random indexes

```js
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
```

---

### 🔀 Implementing the Fisher–Yates Shuffle Algorithm

- Learning how the Fisher–Yates algorithm ensures a uniform shuffle
- Replacing non-secure randomness with a cryptographically secure approach
- Shuffling an array efficiently with optimal time complexity (O(n))
- Understanding the importance of unbiased randomness in applications like password generation

```js
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomIndex(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
```

---

### 🚀 Key Takeaways

- Default browser styles can be overridden to build fully custom UI components
- Front-end security matters, especially when generating sensitive data like passwords
- Proper randomization requires avoiding statistical bias
- Choosing the right algorithm makes applications more reliable and professional

## Author

- Frontend Mentor - [@LaudeDignus](https://www.frontendmentor.io/profile/LaudeDignus)
