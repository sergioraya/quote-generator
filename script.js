const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

let apiQuotes = []; // empty array

// Show Loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide loading
function complete() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

// Show new quote
function newQuote() {
	loading();
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
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
// Set the Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}
// console.log(quote);
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;

// Get Quotes from API. This is called a FETCH request
async function getQuotes() {
	loading();
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json(); 
		console.log(apiQuotes[12]);
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

