// select necessary elements
let quotes = document.querySelector(".quotes");
let quoteIdEl = document.querySelector(".quote-id");
let authorName = document.querySelector(".author .name");
let quoteDisplayEl = document.querySelector(".quote-display");
let generateBtn = document.querySelector(".generate");
let autoBtn = document.querySelector(".auto");
let stopBtn = document.querySelector(".stop");
let autoStatusEl = document.querySelector(".auto-status");
let soundBtn = document.querySelector(".sound");
let copyBtn = document.querySelector(".copy");
let tweetBtn = document.querySelector(".tweet");

//TODO: Global variable for interval Id (optional but improves readability)
let intervalId = null;

// fetch quotes 
async function getQuotes() {
    const response = await fetch("quotes.json");
    const data = await response.json();
    return data;
}

//? generate a quote with error handling
async function generateQuote() {
    generateBtn.classList.add("Loading");
    try {
        const quotes = await getQuotes();
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteIdEl.innerHTML = quote.id;
        quoteDisplayEl.innerHTML = quote.text;
        authorName.innerHTML = quote.author;
        // generateBtn.innerHTML = "New Quote";
        generateBtn.classList.remove("Loading");
    }
    catch (error) {
        console.error("Error fetching quotes:", error);
        quoteIdEl.innerHTML = "Error fetching quotes";
        quoteDisplayEl.innerHTML = "Please try again later.";
    } // handle the error and display an error message to the user
};

// start automatic quote generation with clear interval id handling
function startAutoGenerate() {
    if (!intervalId) { // check if intervalId is already running 
        intervalId = setInterval(generateQuote, 2000);
        autoStatusEl.style.display = "block";
        autoStatusEl.innerHTML = "Auto : ON";
        setTimeout( () => {
            autoStatusEl.style.display = "none";
            autoStatusEl.innerHTML = ""}, 2000);
    }else {
        console.warn("Auto generate already running. Ignore start request.");
    }
};

// stop automatic quote generation with ensured interval clearing
function stopAutoGenerate() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        autoStatusEl.style.display = "block";
        autoStatusEl.innerHTML = "Auto : OFF"
        setTimeout( () => {
            autoStatusEl.style.display = "none";
            autoStatusEl.innerHTML = ""}, 2000);

    }else {
        console.warn("Auto play is already not running. Ignore Stop request. ")
    }
};

soundBtn.addEventListener("click", () => {
    // SpeechSynthesisUtterance is a web speech api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`${quoteDisplayEl.innerHTML}     by ${authorName.innerHTML}`); 
    speechSynthesis.speak(utterance); // speak method of speechSynthesis speaks the utterancee
} );
copyBtn.addEventListener("click", () => {
    // copying the quote text when copyBtn click
    // writeText() property writes the specified text string to the system clipboard
    navigator.clipboard.writeText(`${quoteDisplayEl.innerHTML} by ${authorName.innerHTML}`);
    copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> `;
    setTimeout(() => {
        copyBtn.innerHTML = `<i class="fa-solid fa-copy"></i>`
    }, 1000);


    // alert("Copied to clipboard");
} );
tweetBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteDisplayEl.innerHTML} 
    "${authorName.innerHTML}"`;
    window.open(tweetUrl, "_blank");
} );

generateBtn.onclick = generateQuote;
autoBtn.onclick = startAutoGenerate;
stopBtn.onclick = stopAutoGenerate;