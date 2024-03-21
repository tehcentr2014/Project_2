# JavaScript Translation App with Text to Speach Option

This is a JavaScript Translation App with Text to Speach Option that allows users to translate text from one language to another, listen to translations, and listen to the original text sentence by sentence. It utilizes the MyMemory Translation API for translations and the Web Speech API for text-to-speech functionality.

![translator_app_mockup](https://github.com/tehcentr2014/Project_2/assets/161617022/8b258587-bc63-487c-af80-e03dcf74e3e9)

## Functionality

### 1. Populating Select Tags with Options

The Populating Select Tags function populates select tags with options for different countries and their corresponding language codes.

![image](https://github.com/tehcentr2014/Project_2/assets/161617022/1b3509fe-496f-427c-9648-4ad02eeeb9bf)

### 2. Exchanging Text and Languages

The Exchanging Text and Languages function exchanges the values between the "Enter text" and "Translation" text fields and their respective select tags when the exchange icon is clicked.

![image](https://github.com/tehcentr2014/Project_2/assets/161617022/bd600034-30d3-49bc-87aa-2d83bfc4438a)

### 3. Clearing "Translation" Text Field

The Clearing "Translation" Text Field function clears the "Translation" text field when the "Enter text" field is empty.

![image](https://github.com/tehcentr2014/Project_2/assets/161617022/127fec60-e68d-429a-a318-236364d7858c)

### 4. Translating Text

The Translating Text function translates the text from the "Enter text" field to the "Translation" text field when the translate button is clicked. It utilizes the MyMemory Translation API for translation.

![image](https://github.com/tehcentr2014/Project_2/assets/161617022/a147054b-c666-4eaa-b42a-06afa85b32d1)

### 5. Handling Click Events on Icons

The Handling Click Events on Icons function handles the click events on icons (copy and speech) for both "Enter text" and "Translation" text fields. It allows users to copy text or listen to it using text-to-speech.

![image](https://github.com/tehcentr2014/Project_2/assets/161617022/d1df4e79-b409-4199-961c-c6bfec2a06d2)

### 6. Reading Text Sentence by Sentence

The Reading Text Sentence by Sentence function reads the text sentence by sentence. It splits the text into sentences and reads each sentence followed by its translation.

![image](https://github.com/tehcentr2014/Project_2/assets/161617022/410bceb4-448b-4461-a242-0c023558c799)

### 7. Translating a Sentence

The Translating a Sentence function translates a given sentence. It utilizes the MyMemory Translation API for translation.

### Validator Testing 

- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Ftehcentr2014.github.io%2FProject_2%2F)
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Ftehcentr2014.github.io%2FProject_2%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=ru)

## Deployment

The App was deployed to GitHub pages. 
The live link can be found here: https://github.com/tehcentr2014/Project_2

## Usage
1. Copy App site link: https://tehcentr2014.github.io/Project_2/
2. Open App site link in a web browser.
3. Enter text in the "Enter text" text field.
4. Select the source and target languages.
5. Click the translate button to translate the text.
6. Click the icons to copy text or listen to it using text-to-speech.
7. Click the 'Listen sentence by sentence' button to listen to the text sentence by sentence.

## Dependencies and Sources

- MyMemory Translation API: Used for text translation.
- Web Speech API: Used for text-to-speech functionality.

Sources used:
https://mymemory.translated.net/doc/
https://dvcs.w3.org/hg/speech-api/raw-file/tip/webspeechapi


## License

This project is licensed under the [MIT License](LICENSE).
