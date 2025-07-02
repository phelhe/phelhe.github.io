const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
    'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
    'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
    'Bulgaria', 'Burkina Faso', 'Burundi', 'Cape Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile',
    'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czechia', "Cote dIvoire",
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
    'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana',
    'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland',
    'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
    'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia',
    'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
    'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
    'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
    'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
    'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
    'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
    'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
    'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
    'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
    'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
    'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
    'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
    'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
    'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania',
    'Thailand', 'East Timor', 'Togo', 'Tonga', 'Trinidad and Tobago',
    'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
    'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
    'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen', 'Zambia', 'Zimbabwe'
];

// DOM Elements
const letterDisplay = document.querySelector('.letter');
const progressDisplay = document.querySelector('.progress');
const countryInput = document.getElementById('countryInput');
const submitBtn = document.getElementById('submitBtn');
const giveUpBtn = document.getElementById('giveUpBtn');
const messageDisplay = document.querySelector('.message');
const countriesList = document.querySelector('.countries-list');

// Game state variables
let currentLetter = '';
let countriesWithLetter = [];
let foundCountries = [];

// Initialize the game
document.addEventListener('DOMContentLoaded', initGame);

function initGame() {
    // Choose a random letter from A to Z
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVYZ';
    currentLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    
    // Display the chosen letter
    letterDisplay.textContent = currentLetter;
    
    // Find all countries that start with the chosen letter
    countriesWithLetter = countries.filter(country => 
        country.charAt(0).toUpperCase() === currentLetter
    );
    
    // Reset game state
    foundCountries = [];
    
    // Update progress display
    updateProgress();
    
    // Clear input field
    countryInput.value = '';
    
    // Clear message
    messageDisplay.textContent = '';
    messageDisplay.className = 'message';
    
    // Clear countries list
    countriesList.innerHTML = '';
    
    // Add event listeners
    submitBtn.addEventListener('click', checkAnswer);
    giveUpBtn.addEventListener('click', giveUp);
    countryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Focus on input field
    countryInput.focus();
}

function checkAnswer() {
    const userInput = countryInput.value.trim();
    
    // Check if input is empty
    if (userInput === '') {
        showMessage('Please enter a country name', 'incorrect');
        return;
    }
    
    // Normalize input for comparison (case insensitive)
    const normalizedInput = userInput.toLowerCase();
    
    // Check if country starts with the current letter
    if (normalizedInput.charAt(0).toLowerCase() !== currentLetter.toLowerCase()) {
        showMessage(`Country must start with the letter ${currentLetter}`, 'incorrect');
        return;
    }
    
    // Find the matching country in our list (case insensitive match)
    const matchedCountry = countriesWithLetter.find(country => 
        country.toLowerCase() === normalizedInput
    );
    
    // Check if it's a valid country
    if (!matchedCountry) {
        showMessage(`${userInput} is not a valid country or doesn't start with ${currentLetter}`, 'incorrect');
        return;
    }
    
    // Check if country was already found
    if (foundCountries.includes(matchedCountry)) {
        showMessage(`You already found ${matchedCountry}`, 'incorrect');
        return;
    }
    
    // Add country to found list
    foundCountries.push(matchedCountry);
    
    // Add country to display
    addCountryToDisplay(matchedCountry);
    
    // Update progress
    updateProgress();
    
    // Show success message
    showMessage(`Correct! ${matchedCountry} added.`, 'correct');
    
    // Clear input
    countryInput.value = '';
    countryInput.focus();
    
    // Check if all countries are found
    if (foundCountries.length === countriesWithLetter.length) {
        showMessage(`Congratulations! You found all ${countriesWithLetter.length} countries starting with ${currentLetter}!`, 'correct');
        
        // Add option to play again
        setTimeout(() => {
            if (confirm('Play again with a new letter?')) {
                initGame();
            }
        }, 1500);
    }
}

function addCountryToDisplay(country) {
    const countryTag = document.createElement('div');
    countryTag.className = 'country-tag';
    countryTag.textContent = country;
    countriesList.appendChild(countryTag);
}

function updateProgress() {
    progressDisplay.textContent = `${foundCountries.length}/${countriesWithLetter.length}`;
}

function showMessage(text, type) {
    messageDisplay.textContent = text;
    messageDisplay.className = `message ${type}`;
}

function giveUp() {
    // Check if there are any countries left to find
    if (foundCountries.length === countriesWithLetter.length) {
        showMessage('You have already found all countries!', 'correct');
        return;
    }
    
    // Get the remaining countries
    const remainingCountries = countriesWithLetter.filter(country => 
        !foundCountries.includes(country)
    );
    
    // Add all remaining countries to the display
    remainingCountries.forEach(country => {
        // Add country to found list
        foundCountries.push(country);
        
        // Add country to display with a different style
        const countryTag = document.createElement('div');
        countryTag.className = 'country-tag revealed';
        countryTag.textContent = country;
        countriesList.appendChild(countryTag);
    });
    
    // Update progress
    updateProgress();
    
    // Show message
    showMessage(`Revealed ${remainingCountries.length} remaining countries.`, 'info');
    
    // Disable input and buttons
    countryInput.disabled = true;
    submitBtn.disabled = true;
    giveUpBtn.disabled = true;
    
    // Add option to play again
    setTimeout(() => {
        if (confirm('Play again with a new letter?')) {
            initGame();
            // Re-enable input and buttons
            countryInput.disabled = false;
            submitBtn.disabled = false;
            giveUpBtn.disabled = false;
        }
    }, 1500);
}
