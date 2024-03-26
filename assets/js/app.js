const base_url = 'https://api.themoviedb.org/3';
const api_key = 'api_key=b83f25f146a98f219595e92e0cdaaadb';
const img_url = 'https://image.tmdb.org/t/p/w500';

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
                             
        sliderInner.appendChild(movieElement);
    });

    sliderContent.appendChild(sliderInner);
    sliderContentContainer.appendChild(sliderContent);
}

genres.forEach(genre => {
    getMoviesByGenre(genre.id);
});



document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const category = this.textContent.trim();
        localStorage.setItem("clickedCategory", category);
        window.location.href = "movie_list.html";
    });
   const movies = document.querySelectorAll(".slider-content-container")
   movies.forEach((movie) => {
    movie.addEventListener("click", () =>{
    
        window.location.href = "detail.html";
    })
   })
});





