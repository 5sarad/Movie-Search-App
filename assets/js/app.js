const base_url = 'https://api.themoviedb.org/3';
const api_key = 'api_key=b83f25f146a98f219595e92e0cdaaadb';
const img_url = 'https://image.tmdb.org/t/p/w500';
const imageBaseURL = 'https://image.tmdb.org/t/p/';
const container = document.querySelector(".container");

const genres = [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
];

const sliderContentContainer = document.querySelector(".slider-content-container");

function getMoviesByGenre(genreId){
    const url = `${base_url}/discover/movie?${api_key}&with_genres=${genreId}`;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(`Movies for genre ${genreId}:`, data)
        showMovies(data.results, genreId);
    })
};


function showMovies(data, genreId){
    const genreName = genres.find(genre => genre.id === genreId)?.name || "Unknown Genre";
    const sliderContent = document.createElement('div');
    sliderContent.classList.add('slider-content');
    sliderContent.setAttribute('id', `genre-${genreId}`);

    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('title-wrapper');
    titleWrapper.innerHTML = `<h3>${genreName}</h3>`;
    sliderContent.appendChild(titleWrapper);

    const sliderInner = document.createElement('div');
    sliderInner.classList.add('slider-inner');
    data.forEach(movie => {
        const {id, title, release_date, poster_path, vote_average} = movie;
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-card");
        movieElement.innerHTML = `
                                <figure class="poster-box">
                                <img src="${img_url}${poster_path}" alt="${title}" class="img-cover" loading="lazy">
                            </figure>
                            
                            <h4 class="title">${title}</h4>
                            
                            <div class="meta-list">
                                <div class="rating">
                                <img src="./assets/images/images/star.png" width="20" height="20" loading="lazy" alt="rating">
                                <span class="span">${vote_average.toFixed(1)}</span>
                                </div>
                                <div class="release-year card-badge">${release_date.split('-')[0]}</div>
                            </div>                 
        
                             `;
                             movieElement.addEventListener("click", () =>{
                                localStorage.setItem("movieId", id);
                                window.location.href = "detail.html";
                             })
                             
        sliderInner.appendChild(movieElement);
    });

    sliderContent.appendChild(sliderInner);
    sliderContentContainer.appendChild(sliderContent);
}

genres.forEach(genre => {
    getMoviesByGenre(genre.id);
});

const sliderMovies = [];

function showBannerMovie(movie) {
    const { id, title, release_date, poster_path, vote_average, genre_ids, overview } = movie;
    const bannerItem = document.createElement("div");
    bannerItem.classList.add("banner-item");
    bannerItem.innerHTML = `
        <img src="${img_url}${poster_path}" alt="${title}" class="img-cover" loading="lazy">
        <div class="banner-content">
            <h2 class="heading">${title}</h2>
            <div class="meta-list">
                <div class="release-date">${release_date.split('-')[0]}</div>
                <div class="rating card-badge">${vote_average.toFixed(1)}</div>
            </div>
            <p class="genre">${genre_ids.map(genreId => genres.find(genre => genre.id === genreId)?.name).join(", ")}</p>
            <p class="banner-text">${overview}</p>
            <button id="watch-now-button" class="btn" data-movie-id="${id}">
            <img src="./assets/images/images/play_circle.png" width="24" height="24" aria-hidden="true" alt="play circle">
            <span class="span">Watch Now</span>
        </button>
        </div>`;

   
        document.querySelector(".banner-movies").appendChild(bannerItem);
        
}
function showBannerSliderMovies(movies) {
    const bannerSlider = document.querySelector(".banner-slider");
    movies.forEach((movie, index) => {
        const { id, title, poster_path } = movie;
        const bannerInner = document.createElement("div");
        bannerInner.classList.add("banner-inner");
        if (index === 0) {
            bannerInner.classList.add("active");
            showBannerMovieDetails(id); 
        }
        bannerInner.innerHTML = `
            <img src="${img_url}${poster_path}" alt="${title}" loading="lazy" draggable="false" class="img-cover">`;
        bannerInner.addEventListener("click", () => {
            document.querySelectorAll(".banner-inner").forEach(item => item.classList.remove("active"));
            bannerInner.classList.add("active");
            showBannerMovieDetails(id); 
        });
        bannerSlider.appendChild(bannerInner);
        
    });
}

function showBannerMovieDetails(movieId) {
    const clickedMovie = sliderMovies.find(movie => movie.id === movieId);
    const bannerItem = document.createElement("div");
    bannerItem.classList.add("banner-item");
    bannerItem.innerHTML = `
        <img src="${img_url}${clickedMovie.backdrop_path}" alt="${clickedMovie.title}" class="img-cover" loading="lazy">
        <div class="banner-content">
            <h2 class="heading">${clickedMovie.title}</h2>
            <div class="meta-list">
                <div class="release-date">${clickedMovie.release_date.split('-')[0]}</div>
                <div class="rating card-badge">${clickedMovie.vote_average.toFixed(1)}</div>
            </div>
            <p class="genre">${clickedMovie.genre_ids.map(genreId => genres.find(genre => genre.id === genreId)?.name).join(", ")}</p>
            <p class="banner-text">${clickedMovie.overview}</p>
            <button id="watch-now-button" class="btn" data-movie="${clickedMovie.id}">
                <img src="./assets/images/images/play_circle.png" width="24" height="24" aria-hidden="true" alt="play circle">
                Watch Now
            </button>
        </div>`;
        document.querySelector(".banner-movies").innerHTML = ''; 
        document.querySelector(".banner-movies").appendChild(bannerItem); 
       
}

function getMoviesForBanner() {
    const url = `${base_url}/movie/top_rated?${api_key}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const [firstMovie, ...remainingMovies] = data.results;
        showBannerMovie(firstMovie);
        sliderMovies.push(...remainingMovies); // Add remaining movies to sliderMovies array
        showBannerSliderMovies(sliderMovies);
    });
}

getMoviesForBanner();

document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const category = this.textContent.trim();
        localStorage.setItem("clickedCategory", category);
        window.location.href = "movie_list.html";
    });
   
});

document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "watch-now-button") {
        const movieId = event.target.dataset.movie;
        localStorage.setItem("movieId", movieId);
        window.location.href = "detail.html";
        console.log(movieId);
    }
});



