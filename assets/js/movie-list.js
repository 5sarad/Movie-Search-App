document.addEventListener("DOMContentLoaded", function() {           
    const base_url = 'https://api.themoviedb.org/3';
    const api_key = 'api_key=b83f25f146a98f219595e92e0cdaaadb';
    const img_url = 'https://image.tmdb.org/t/p/w500';
    const searchURL = `${base_url}/search/movie?${api_key}`;

    const movieListContent = document.querySelector(".movie-list-content");
    const heading = document.querySelector(".heading");
    const detailBox = document.querySelector(".detail-box");

    const clickedCategory = localStorage.getItem("clickedCategory");

    function getMovies(url, category){
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            showMovies(data.results);
            heading.textContent = `All ${category} Movies`;
        });
    }

    function showMovies(data){
        movieListContent.innerHTML = "";
        data.forEach(movie => {
            const {id, title, release_date, poster_path, vote_average} = movie;
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
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
          movieCard.addEventListener("click", () =>{
    localStorage.setItem("movieId", id);
    window.location.href = "detail.html";
})
            movieListContent.appendChild(movieCard);
        });
    }

    document.querySelectorAll(".nav-list a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const category = this.textContent.trim();
            localStorage.setItem("clickedCategory", category);
            window.location.href = "movie_list.html";
        });
    });

    if (clickedCategory) {
        let url;
        if (clickedCategory === "Top Rated") {
            url = `${base_url}/movie/top_rated?${api_key}`;
        } else if (clickedCategory === "Weekly Trending") {
            url = `${base_url}/trending/movie/week?${api_key}`;
        } else if (clickedCategory === "Upcoming") {
            url = `${base_url}/movie/upcoming?${api_key}`;
        } else if (clickedCategory === "Home"){
            window.location.href = "index.html";
        }
        getMovies(url, clickedCategory);
    }


});
