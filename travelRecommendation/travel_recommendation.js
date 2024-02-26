// travel_recommendation.js

// Function to fetch data from JSON file
// Function to fetch data from JSON file
function fetchRecommendations(keyword) {
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        // Convert keyword to lowercase for case-insensitive matching
        keyword = keyword.toLowerCase();

        // Filter recommendations based on keyword
        const filteredRecommendations = [];

        // Iterate over categories and recommendations to find matching ones
        for (const category in data) {
            if (data.hasOwnProperty(category)) {
                const categoryRecommendations = data[category];
                categoryRecommendations.forEach(recommendation => {
                    if (recommendation.name.toLowerCase().includes(keyword)) {
                        filteredRecommendations.push(recommendation);
                    } else if (category === 'countries' && recommendation.cities) {
                        // If category is countries, also check city names
                        recommendation.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(keyword)) {
                                filteredRecommendations.push(city);
                            }
                        });
                    }
                });
            }
        }

        // Display recommendations
        displayRecommendations(filteredRecommendations);
    })
    .catch(error => console.error('Error fetching recommendations:', error));
}


// Function to display recommendations
function displayRecommendations(recommendations) {
    const resultsContainer = document.getElementById('results-container');
    // Clear previous results
    resultsContainer.innerHTML = '';

    // Iterate over recommendations and create HTML elements
    recommendations.forEach(recommendation => {
        const recommendationDiv = document.createElement('div');
        recommendationDiv.classList.add('recommendation');

        const recommendationImage = document.createElement('img');
        recommendationImage.src = recommendation.imageUrl; // Corrected property name
        recommendationImage.alt = recommendation.name;

        const recommendationName = document.createElement('h2');
        recommendationName.textContent = recommendation.name;

        const recommendationDescription = document.createElement('p');
        recommendationDescription.textContent = recommendation.description;

        recommendationDiv.appendChild(recommendationImage);
        recommendationDiv.appendChild(recommendationName);
        recommendationDiv.appendChild(recommendationDescription);

        resultsContainer.appendChild(recommendationDiv);
    });
}

// Function to clear search input field and results
function clearResults() {
    const searchBar = document.getElementById('search-bar');
    searchBar.value = ''; // Clear search input field
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear displayed results
}


// Event listener for search button
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    const searchBar = document.getElementById('search-bar');
    const keyword = searchBar.value.trim();
    if (keyword !== '') {
        fetchRecommendations(keyword);
    }
});

// Event listener for clear button
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', function(event) {
    event.preventDefault();
    clearResults();
});
