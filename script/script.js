const ApiUrl = "http://localhost:3000/films";

const title = document.getElementById("title");
const runtime = document.getElementById("runtime");
const filmInfo = document.getElementById("film-info");
const showtime = document.getElementById("showtime");
const ticketNum = document.getElementById("ticket-num");
const buyTicket = document.getElementById("buy-ticket");
const poster = document.getElementById("poster");
const films = document.getElementById("films");
const subtitle = document.getElementById("subtitle");
const showing = document.getElementById("showing");
const body = document.getElementsByTagName("body")[0];

document.addEventListener("DOMContentLoaded", function() {
  fetch(ApiUrl)
    .then((response) => response.json())
    .then((data) => {
      const firstMovie = data[0];

      let remainingTickets = firstMovie.capacity - firstMovie.tickets_sold;

      title.innerHTML = `${firstMovie.title}`;
      runtime.innerHTML = `${firstMovie.runtime}`;
      filmInfo.innerHTML = `${firstMovie.description}`;
      showtime.innerHTML = `${firstMovie.showtime}`;
      ticketNum.innerHTML = `${remainingTickets}`;
      buyTicket.innerHTML = "Buy ticket";
      poster.src = `${firstMovie.poster}`;

      buyTicket.addEventListener("click", () => {
        if (remainingTickets > 0) {
          remainingTickets--;

          ticketNum.innerHTML = `${remainingTickets}`;
        } else if (remainingTickets === 0) {
          ticketNum.innerHTML = `${remainingTickets}`;
          buyTicket.innerHTML = "Sold out!";
        }
      });

      films.innerHTML = "";

      data.forEach((movie, index) => {
        const li = document.createElement("li");

        li.innerHTML = `${movie.title}`;

        films.appendChild(li);

        // button to delete movie
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";

        deleteButton.classList.add("ui", "button");

        deleteButton.style.marginLeft = "5px";

        li.appendChild(deleteButton);

        li.addEventListener("mouseout", () => {
          li.style.color = "black";
        });

        deleteButton.addEventListener("click", () => {
          if (window.confirm(`Are you sure you want to delete ${movie.title}`)) {
            data.splice(index, 1);

            films.removeChild(li);
          }
        });

        li.addEventListener("click", () => {
          remainingTickets = movie.capacity - movie.tickets_sold;
          title.innerHTML = `${movie.title}`;
          runtime.innerHTML = `${movie.runtime}`;
          filmInfo.innerHTML = `${movie.description}`;
          showtime.innerHTML = `${movie.showtime}`;
          ticketNum.innerHTML = `${remainingTickets}`;
          buyTicket.innerHTML = "Buy ticket";
          poster.src = `${movie.poster}`;
        });
      });
    })
    .catch((error) => console.error("Error:", error));
});