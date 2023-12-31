const moviesContainer = document.querySelector('.movies');
const coachSelector = document.getElementById('coachSelector');

// Dynamically populate the dropdown with numbers from 1 to 40
for (let i = 1; i <= 40; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    coachSelector.appendChild(option);
}

// Add an event listener to the dropdown to fetch data on selection change
coachSelector.addEventListener('change', () => {
    const selectedCoachNumber = coachSelector.value;
    const url = `https://api-football-v1.p.rapidapi.com/v3/coachs?team=${selectedCoachNumber}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cd7add1ebamsh26db17b9053c289p1034a4jsndc1668b89d98',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(response => {
        const movies = response.response;
        moviesContainer.innerHTML = ''; // Clear previous content

        movies.forEach(movie => {
            const name = movie.name;
            const photo = movie.photo;
            const image = document.createElement('img');
            image.src = photo;

            const movieParagraph = document.createElement('p');
            movieParagraph.textContent = name;
            movieParagraph.appendChild(document.createElement('br'));
            movieParagraph.appendChild(image);

            moviesContainer.appendChild(movieParagraph);
        });
    })
    .catch(err => console.error(err));
});

