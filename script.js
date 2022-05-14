const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
let apiQuotes = []; // empty array

// Show new quote
const newQuote = () => {
// Pick a random quote from apiQuotes array
    let quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];

// Check if Author field is blank and replace it with ''
if (!quote.author) {
    authorText.textContent = 'Unknown';
} else {
    authorText.textContent = quote.author;
}
// Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}
// console.log(quote);
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;

// Get Quotes from API. This is called a FETCH request
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); 

//console.log(apiQuotes[12]); // pulls quote #12 in the api array. Console.log is used for testing.
        newQuote();
    } catch (error) {
      // Catch Error Here
    }
}
// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.
    textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

