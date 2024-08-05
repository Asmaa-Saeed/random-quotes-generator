// bring all the selectors which need logic
let quoteIdEl = document.querySelector(".quote-id");
let quoteDisplayEl = document.querySelector(".quote-display");
let generateBtn = document.querySelector(".generate");
let autoBtn = document.querySelector(".auto");
let stopBtn = document.querySelector(".stop");
let autoStatusEl = document.querySelector(".auto-status");
let intervalId;
// make the function that generates the code // here we use the set interval function to execute the code at regular intervals

        generateBtn.onclick = generateQuote;
        autoBtn.onclick = startAutoPlay;
        stopBtn.onclick = stopAutoPlay;
    async function getQuotes() {
        const response = await fetch("quotes.json");
        const data = await response.json();
        return data;
    };

    async function generateQuote() {
        const quotes = await getQuotes();
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteDisplayEl.innerText = quote.text;
        quoteIdEl.innerText= quote.id;
    };

    function startAutoPlay() {
        intervalId = setInterval(generateQuote, 7000);
        autoStatusEl.innerHTML = "Auto : ON";
    };


    function stopAutoPlay() {
        clearInterval(intervalId);
        autoStatusEl.innerHTML = "Stopped";
    }