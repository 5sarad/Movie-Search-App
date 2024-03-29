document.addEventListener("DOMContentLoaded", function() {
    const base_url = 'https://api.themoviedb.org/3';
    const api_key = 'api_key=b83f25f146a98f219595e92e0cdaaadb';
    const img_url = 'https://image.tmdb.org/t/p/w500';

    const pageContent = document.querySelector(".page-content");

    const clickedCategory = localStorage.getItem("clickedCategory");
    const movieId = localStorage.getItem("movieId");

    if (movieId) {
        showMovieDetail(movieId);
    }

    function getGenres(genreList) {
        const newGenreList = [];
        for (const { name } of genreList) newGenreList.push(name);
        return newGenreList.join(", ");
    }

    function getCasts(castList) {
        const newCastList = [];
        for (let i = 0; i < castList.length && i < 10; i++) {
            const { name } = castList[i];
            newCastList.push(name);
        }
        return newCastList.join(", ");
    }

    function getDirectors(crewList) {
        const directors = crewList.filter(({ job }) => job === "Director");
        const directorList = [];
        for (const { name } of directors) directorList.push(name);
        return directorList.join(", ");
    }

    function filterVideos(videoList) {
        return videoList.filter(({ type, site }) => (type === "Trailer" || type === "Teaser") && site === "YouTube");
    }

    function showMovieDetail(movieId) {
        pageContent.innerHTML = "";
        fetch(`${base_url}/movie/${movieId}?${api_key}&append_to_response=casts,videos,images,releases`)
            .then(response => response.json())
            .then(data => {
                const {
                    poster_path,
                    title,
                    release_date,
                    runtime,
                    vote_average,
                    releases: { countries: [{ certification } = { certification: "N/A" }] } = {},
                    genres,
                    overview,
                    casts: { cast, crew},
                    videos: { results } = {} // Ensure results is defined with a default value
                } = data;
                const movieDetail = document.createElement("div");
                movieDetail.classList.add("movie-detail");
                movieDetail.innerHTML = `
                    <div class="backdrop-image" style="background-image: url('${img_url}${data.backdrop_path}')"></div>
                    <figure class="poster-box movie-poster">
                        <img src="${img_url}${poster_path}" alt="${title} poster" class="img-cover">
                    </figure>
                    <div class="detail-box">
                        <div class="detail-content">
                            <h1 class="heading">${title}</h1>
                            <div class="meta-list">
                                <div class="meta-item">
                                    <img src="./assets/images/images/star.png" width="20" height="20" alt="rating">
                                    <span class="span">${vote_average.toFixed(1)}</span>
                                </div>
                                <div class="separator"></div>
                                <div class="meta-item">${runtime}m</div>
                                <div class="separator"></div>
                                <div class="meta-item">${release_date?.split("-")[0] ?? "Not Released"}</div>
                                <div class="meta-item card-badge">${certification}</div>
                            </div>
                            <p class="genre">${getGenres(genres)}</p>
                            <p class="overview">${overview}</p>
                            <ul class="detail-list">
                                <li class="list-item">
                                    <p class="list-name">Starring</p>
                                    <p>${getCasts(cast)}</p>
                                </li>
                                <li class="list-item">
                                    <p class="list-name">Directed By</p>
                                    <p>${getDirectors(crew)}</p>
                                </li>
                            </ul>
                        </div>
                       <div class="trailers-content">
                       <div class="title-wrapper">
                       <h3 class="title-large">Trailers and Clips</h3>
                   </div>
                   <div class="trailer-list">
                       ${filterVideos(results).map(video => `
                           <div class="video-card">
                               <iframe width="500" height="294" src="https://www.youtube.com/embed/${video.key}?&theme=dark&color=white&rel=0"
                                   frameborder="0" allowfullscreen="1" title="${video.name}" class="img-cover" loading="lazy"></iframe>
                           </div>
                       `).join('')}
                   </div>
                        </div>

                    </div>`;
                pageContent.appendChild(movieDetail);
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
        } 
     
    }
});
