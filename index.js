const form = document.querySelector('.search-btn');
const movieContainer = document.querySelector('.movie-container');
const h2 = document.querySelector('h2');
const input = form.querySelector('input');

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_AUTH
    }
  };

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(res => res.json())
  .then(data => {
    const movies = data.results;

    movies.forEach(movie => {
      movieContainer.appendChild(makeMovieCard(movie));
    });
  })
  .catch(err => {
    console.error('Error fetching movies:', err);
  });


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = input.value;
  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const movies = data.results;

    movieContainer.innerHTML = '';

    h2.innerText = `Search Results: ${query}`;

    movies.forEach((movie) => {
      movieContainer.appendChild(makeMovieCard(movie));
    });

  }
  catch (err) {
    console.error(err);
  }
});

function makeMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-poster');
    moviePoster.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+poster';
    moviePoster.alt = movie.title;

    const movieTitle = document.createElement('div');
    movieTitle.classList.add('movie-title');
    movieTitle.innerText = movie.title;

    const rating = document.createElement('div');
    rating.classList.add('rating');

    const rate = document.createElement('span');
    const voteAverage = movie.vote_average;
    rate.classList.add('rate');
    rate.innerHTML = ratingStars(voteAverage);

    const year = document.createElement('span');
    year.classList.add('year');
    year.innerText = movie.release_date.slice(0, 4);

    rating.appendChild(rate);
    rating.appendChild(year);

    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(rating);
    
    return movieCard;
}

function ratingStars(value) {
  const fullStar = '<i class="fa-solid fa-star star-solid"></i>';
  const emptyStar = '<i class="fa-solid fa-star star-empty"></i>';
  let starString = '';
  let ratingValue = Math.ceil(value / 2);

  for (let i = 1; i <= 5; i++) {
    if (ratingValue >= i) {
      starString += `${fullStar}`
    }
    else {
      starString += `${emptyStar}`
    }
  }

  return starString;
}
