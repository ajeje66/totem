// ==============================
// Lingue disponibili
// ==============================

const availableLanguages = ["it", "en", "fr", "de", "es"];

// ==============================
// Carica una lingua
// ==============================

async function loadLanguage(language){

    try{

        const response = await fetch(`lang/${language}.json`);

        if(!response.ok){

            throw new Error("File lingua non trovato");

        }

        const translations = await response.json();

        applyTranslations(translations);

        document.documentElement.lang = language;

        localStorage.setItem("language",language);

        updateButtons(language);

    }

    catch(error){

        console.error(error);

    }

}

// ==============================
// Applica le traduzioni
// ==============================

function applyTranslations(translations){

    document
        .querySelectorAll("[data-lang]")
        .forEach(element=>{

            const key = element.dataset.lang;

            if(translations[key]){

                element.innerHTML = translations[key];

            }

        });

}

// ==============================
// Evidenzia il pulsante
// ==============================

function updateButtons(language){

    document
        .querySelectorAll(".language-selector button")
        .forEach(button=>{

            button.classList.remove("active");

            if(button.dataset.language===language){

                button.classList.add("active");

            }

        });

}

// ==============================
// Click pulsanti
// ==============================

document
.querySelectorAll(".language-selector button")
.forEach(button=>{

    button.addEventListener("click",()=>{

        loadLanguage(button.dataset.language);

    });

});

// ==============================
// Avvio
// ==============================

function init(){

    let language = localStorage.getItem("language");

    if(!language){

        language = navigator.language.slice(0,2);

    }

    if(!availableLanguages.includes(language)){

        language = "it";

    }

    loadLanguage(language);

}

document.addEventListener("DOMContentLoaded",init);

function sendActivity(){

    console.log("attività libro");

    parent.postMessage(
        {
            type:"activity"
        },
        "*"
    );
}


document.addEventListener("pointerdown", sendActivity);

document.addEventListener("pointermove", sendActivity);

document.addEventListener("touchstart", sendActivity);

document.addEventListener("wheel", sendActivity);