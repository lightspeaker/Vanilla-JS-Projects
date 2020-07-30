var container = document.querySelector(".container");
var seats = document.querySelectorAll(".row .seat:not(.occupied)"); // list of Nodes

var count = document.getElementById("count");
var total = document.getElementById("total");
var movieSelect = document.getElementById("movie");

var ticketPrice = parseInt(movieSelect.value); //was a string, now parsed to a number

populateUI();

function updateSelectedCount() {
  var selectedSeats = document.querySelectorAll(".row  .seat.selected");

  var seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  //we are saving here the information about selected seats to the local storage
  //of the browser
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  var seatsCount = selectedSeats.length;

  count.innerText = seatsCount;
  total.innerText = seatsCount * ticketPrice;
}

function saveMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovie", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
}

function populateUI() {
  var selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  var selectedMovie = localStorage.getItem("selectedMovie");
  var moviePrice = localStorage.getItem("moviePrice");

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.className = "seat selected";
      }
    });
  }

  if (selectedMovie !== null) {
    movieSelect.selectedIndex = selectedMovie;
  }
}

//_________________________________________________________________
//event Listeners

container.addEventListener("click", function (e) {
  //console.dir(e.target);
  if (e.target.className == "seat" || e.target.className == "seat selected") {
    e.target.classList.toggle("selected");
  }
  updateSelectedCount();
});

movieSelect.addEventListener("change", function (e) {
  ticketPrice = parseInt(e.target.value);

  saveMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//update the count even if nothing changes -- so on load of the page
updateSelectedCount();
