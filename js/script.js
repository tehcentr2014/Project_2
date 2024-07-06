const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const selectTags = document.querySelectorAll("select");
const icons = document.querySelectorAll(".row i");
const translateBtn = document.querySelector("button");
const readSentenceBtn = document.createElement("button");

/**
 * Initialize the select options for languages
 */
function initializeLanguageOptions() {
    selectTags.forEach((tag, id) => {
        for (let countryCode in countries) {
            const selected = (id === 0 && countryCode === "en-GB") || (id === 1 && countryCode === "de-DE") ? "selected" : "";
            const option = `<option ${selected} value="${countryCode}">${countries[countryCode]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);
        }
    });
}

/**
 * Exchange text and language settings between "from" and "to" inputs
 */
function exchangeTextAndLanguage() {
    const tempText = fromText.value;
    const tempLang = selectTags[0].value;

    fromText.value = toText.value;
    toText.value = tempText;

    selectTags[0].value = selectTags[1].value;
    selectTags[1].value = tempLang;
}

/**
 * Clear the "to" text if the "from" text is emptied
 */
function clearToTextIfEmpty() {
    if (!fromText.value) {
        toText.value = "";
    }
}

/**
 * Translate the text from source language to target language
 */
function translateText() {
    const text = fromText.value.trim();
    const translateFrom = selectTags[0].value;
    const translateTo = selectTags[1].value;

    if (!text) return;

    toText.setAttribute("placeholder", "Translating...");
    const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
            data.matches.forEach(data => {
                if (data.id === 0) {
                    toText.value = data.translation;
                }
            });
            toText.setAttribute("placeholder", "Translation");
        })
        .catch(error => {
            console.error('Error translating text:', error);
            toText.setAttribute("placeholder", "Translation Error");
        });
}

/**
 * Handle icon clicks for copying text and text-to-speech
 */
function handleIconClick(event) {
    const target = event.target;

    if (!fromText.value || !toText.value) return;

    if (target.classList.contains("fa-copy")) {
        const textToCopy = target.id === "from" ? fromText.value : toText.value;
        navigator.clipboard.writeText(textToCopy);
    } else {
        const utterance = new SpeechSynthesisUtterance(target.id === "from" ? fromText.value : toText.value);
        utterance.lang = target.id === "from" ? selectTags[0].value : selectTags[1].value;
        speechSynthesis.speak(utterance);
    }
}

/**
 * Read the text sentence by sentence
 */
function readSentenceBySentence() {
    const sentences = fromText.value.trim().split(/[.!?]+/).map(sentence => sentence.trim());
    let index = 0;

    function speakNextSentence() {
        if (index < sentences.length) {
            const sentence = sentences[index];
            const utterance = new SpeechSynthesisUtterance(sentence);
            utterance.lang = selectTags[0].value;
            speechSynthesis.speak(utterance);

            translateSentence(sentence, (translatedSentence) => {
                const translatedUtterance = new SpeechSynthesisUtterance(translatedSentence);
                translatedUtterance.lang = selectTags[1].value;
                speechSynthesis.speak(translatedUtterance);

                index++;
                setTimeout(speakNextSentence, 500); // Delay 500ms before speaking the next sentence
            });
        }
    }

    speakNextSentence();
}

/**
 * Translate a single sentence and execute a callback
 */
function translateSentence(sentence, callback) {
    const translateFrom = selectTags[0].value;
    const translateTo = selectTags[1].value;
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sentence)}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const translatedText = data.responseData.translatedText || sentence;
            callback(translatedText);
        })
        .catch(error => {
            console.error('Error translating sentence:', error);
            callback(sentence);
        });
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    exchangeIcon.addEventListener("click", exchangeTextAndLanguage);
    fromText.addEventListener("keyup", clearToTextIfEmpty);
    translateBtn.addEventListener("click", translateText);
    icons.forEach(icon => icon.addEventListener("click", handleIconClick));
    readSentenceBtn.textContent = "Listen sentence by sentence";
    translateBtn.parentNode.insertBefore(readSentenceBtn, translateBtn.nextSibling);
    readSentenceBtn.addEventListener("click", readSentenceBySentence);
}

/**
 * Initialize the application
 */
function initializeApp() {
    initializeLanguageOptions();
    initializeEventListeners();
}

// Initialize the app on page load
initializeApp();
