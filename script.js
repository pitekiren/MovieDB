const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  console.log(movies);
  updateUI(movies);
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
// document.addEventListener("click", async function (e) {
//   if (e.target.classList.contains("show-detail-btn")) {
//     const imdbid = e.target.dataset.imdbid;
//     const detail = await showDetail(imdbid);
//     updateUIdetail(detail);
//   }
// });

// function showDetail(id) {
//   return fetch("http://www.omdbapi.com/?apikey=2efeaa26&i=" + id)
//     .then((response) => response.json())
//     .then((m) => m);
// }

// function updateUIdetail(m) {
//   const movieDetail = showModal(m);
//   const modalBody = document.querySelector(".modal-body");
//   modalBody.innerHTML = movieDetail;
// }

function showCards(movie) {
  return `<div class="card">
    <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster"/>
    <div class="card-body">
    <h5>${movie.Title}</h5>
    <h6>${movie.Year}</h6>
    <button class="show-detail-btn">Details</button>
    </div>
    </div>`;
  //   return `<div class="col-md-4 my-3">
  //     <div class="card">
  //     <img src=${m.Poster} class="card-img-top" />
  //     <div class="card-body">
  //         <h5 class="card-title">${m.Title}</h5>
  //         <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
  //         <a href="#" class="btn btn-primary show-detail-btn" data-toggle="modal" data-target="#detailModal" data-imdbid=${m.imdbID}>Show details</a>
  //     </div>
  //     </div>
  // </div>`;
}

// function showModal(m) {
//   return ` <div class="container-fluid">
//     <div class="row">
//     <div class="col-md-3">
//         <img src="${m.Poster}" class="img-fluid" />
//     </div>
//     <div class="col-md">
//         <ul class="list-group">
//         <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
//         <li class="list-group-item">
//             <strong>Genre : </strong>${m.Genre}
//         </li>
//         <li class="list-group-item">
//             <strong>Director : </strong>${m.Director}
//         </li>
//         <li class="list-group-item">
//             <strong>Writer : </strong>${m.Writer}
//         </li>
//         <li class="list-group-item">
//             <strong>Plot : </strong><br>${m.Plot}
//         </li>
//         </ul>
//     </div>
//     </div>
// </div>`;
// }
