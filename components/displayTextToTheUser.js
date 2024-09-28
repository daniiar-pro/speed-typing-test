import { textState } from "./textState.js";

export default function displayTextToTheUser() {
  const paragraph = document.getElementById("text-display");
  paragraph.innerHTML = "";

  const text = textState.currentText;

  textState.currentWordIndex = 0;

  displayTextAsWordsAndChars(text, paragraph);
}

function displayTextAsWordsAndChars(text, container) {
  const wordsArray = text.split(" ");

  wordsArray.forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.classList.add("word");

    if (index === 0) {
      wordSpan.classList.add("current-word");
    }

    for (let char of word) {
      const charSpan = document.createElement("span");
      charSpan.classList.add("char");
      charSpan.innerText = char;
      wordSpan.appendChild(charSpan);
    }

    if (index < wordsArray.length - 1) {
      const spaceSpan = document.createElement("span");
      spaceSpan.classList.add("space");
      spaceSpan.innerText = " ";
      wordSpan.appendChild(spaceSpan);
    }

    container.appendChild(wordSpan);
  });

  textState.currentWordIndex = 0;
}
