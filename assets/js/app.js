const API_KEY = 'api_key=b83f25f146a98f219595e92e0cdaaadb';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;


function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);
    })
};

getMovies(API_URL);