const searchBtn = document.querySelector(".search-btn");
const modal = document.getElementById("detailModal");
const span = document.getElementsByClassName("close")[0];

searchBtn.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  // console.log(movies);
  updateUI(movies);
});
span.addEventListener("click", function () {
  modal.style.display = "none";
});
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=2efeaa26&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((movie) => {
    cards += showCards(movie);
  });
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("show-detail-btn")) {
    const imdbid = e.target.dataset.imdbid;
    modal.style.display = "block";
    console.log(imdbid);
    const detail = await showDetail(imdbid);
    updateUIdetail(detail);
  }
});

function showDetail(id) {
  return fetch("http://www.omdbapi.com/?apikey=2efeaa26&i=" + id)
    .then((response) => response.json())
    .then((movie) => movie);
}

function updateUIdetail(movie) {
  showModal(movie);
  const movieDetail = showModal(movie);
  const modalBody = document.querySelector(".modal-body");
  const modalFooter = document.querySelector(".modal-footer");
  modalBody.innerHTML = movieDetail;
  modalFooter.innerHTML = buyMovieLink(movie);
}

function showCards(movie) {
  return `<div class="card">
  <div className="card-header">
  <img src="${movie.Poster}" alt="${movie.Title}"/>
  </div>
    <div class="card-body">
    <h5>${movie.Title}</h5>
    <h6>${movie.Year}</h6>
    </div>
    <button class="show-detail-btn" data-imdbid=${movie.imdbID}>Details</button>
    </div>`;
}

function showModal(movie) {
  let ratings = "";
  // console.log(`Plot : ${movie.Plot} Genres : ${movie.Genre}`);
  movie.Ratings.forEach((rating) => {
    ratings += `<div>
      <h4>${rating.Value}</h4>
      <p>${rating.Source}</p>
      </div>`;
  });
  const movieRatings = document.querySelector(".movie-rating");
  return `
  <div class="movie-poster">
    <img src="${movie.Poster}" alt="${movie.Poster}"/>
    <div class="movie-ratings">
    ${ratings}
    </div>
  </div>
  <div class="movie-properties">
  <div><h3>${movie.Title}(${movie.Year})</h3></div>
  <div><strong>Rated : </strong> ${movie.Rated}</div>
  <div><strong>Release Date : </strong>${movie.Released}</div>
  <div><strong>Genre : </strong>${movie.Genre}</div>
  <div><strong>Director : </strong>${movie.Director}</div>
  <div><strong>Writer : </strong> ${movie.Writer}</div>
  <div><strong>Language : </strong> ${movie.Language}</div>
  <div><strong>Awards : </strong> ${movie.Awards}</div>
  <div><strong>Production : </strong> ${movie.Production}</div>
  <div><strong>Plot : </strong> ${movie.Plot}</div>

  </div>
  
  `;
}

function buyMovieLink(movie) {
  if (movie.Type == "movies" || movie.Type == "series") {
    return `
  <h3>Modal Footer</h3>
  <a href="https://www.amazon.com/s?k=${movie.Title.replace(
    / /g,
    "+"
  )}&i=movies-tv-intl-ship&ref=nb_sb_noss" target="_blank">Buy on Amazon</a>`;
  } else if (movie.Type == "game") {
    return `
  <h3>Modal Footer</h3>
  <a href="https://www.amazon.com/s?k=${movie.Title.replace(
    / /g,
    "+"
  )}&i=videogames-intl-ship&ref=nb_sb_noss" target="_blank">Buy on Amazon</a>`;
  } else {
    return `
  <h3>Modal Footer</h3>
  <a href="https://www.amazon.com/s?k=${movie.Title.replace(
    / /g,
    "+"
  )}&i=movies-tv-intl-ship&ref=nb_sb_noss" target="_blank">Buy on Amazon</a>`;
  }
}
