function fetchData(keyword) {
    // Use fetch API to fetch data based on keyword
    // Example:
    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // Process data and display recommendations based on keyword
            console.log(data);
            // Check if the keyword exists in the data
            if (data.hasOwnProperty(keyword)) {
                // Display recommendations in the content area
                displayRecommendations(data[keyword]);
            } else {
                console.error('Keyword not found in data:', keyword);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayRecommendations(recommendations) {
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = ''; // Clear previous content
    recommendations.forEach(recommendation => {
        const recommendationDiv = document.createElement('div');
        recommendationDiv.classList.add('recommendation');

        // Create image element
        const img = document.createElement('img');
        img.src = recommendation.imageUrl;
        img.alt = recommendation.name;
        recommendationDiv.appendChild(img);

        // Create description element
        const description = document.createElement('p');
        description.textContent = recommendation.description;
        recommendationDiv.appendChild(description);

        contentDiv.appendChild(recommendationDiv);
    });
}
