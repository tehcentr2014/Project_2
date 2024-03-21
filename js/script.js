const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),
readSentenceBtn = document.createElement("button");

// The function exchanges the values between the 'from' and 'to' text fields and their respective select tags
selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "de-DE" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// The function exchanges the values between the 'from' and 'to' text fields and their respective select tags
exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

// The function clears the 'to' text field when the 'from' text field is empty
fromText.addEventListener("keyup", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});

// The function translates the text from the 'from' text field to the 'to' text field when the translate button is clicked
translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
});

// The function handles the click events on icons (copy and speech) for both 'from' and 'to' text fields
icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});

// Add text and event listener to the new button
readSentenceBtn.textContent = "Listen sentence by sentence";
readSentenceBtn.addEventListener("click", readSentenceBySentence);

// Insert the new button after the Translate button
translateBtn.parentNode.insertBefore(readSentenceBtn, translateBtn.nextSibling);

function readSentenceBySentence() {
    const sentences = fromText.value.trim().split(/[.!?]+/); // Split text into sentences
    let index = 0;

    function speakNextSentence() {
        if (index < sentences.length) {
            const sentence = sentences[index].trim();
            const utterance = new SpeechSynthesisUtterance(sentence);
            utterance.lang = selectTag[0].value; // Assuming source language
            speechSynthesis.speak(utterance);

            // Translate the sentence and speak the translation
            translateSentence(sentence, (translatedSentence) => {
                const translatedUtterance = new SpeechSynthesisUtterance(translatedSentence);
                translatedUtterance.lang = selectTag[1].value; // Assuming target language
                speechSynthesis.speak(translatedUtterance);

                index++;
                setTimeout(speakNextSentence, utterance.duration * 1000 + 500); // Wait for the current sentence to finish before speaking the next
            });
        }
    }

    speakNextSentence();
}

function translateSentence(sentence, callback) {
    const translateFrom = selectTag[0].value;
    const translateTo = selectTag[1].value;
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sentence)}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const translatedText = data.responseData.translatedText || sentence; // Use original sentence if translation not available
            callback(translatedText);
        })
        .catch(error => {
            console.error('Error translating sentence:', error);
            callback(sentence); // Use original sentence on error
        });
}
