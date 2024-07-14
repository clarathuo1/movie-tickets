const apiUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  fetchFilms();
  fetchFilmDetails(1); // Assuming you want to initially load details for film with id=1
});

function fetchFilms() {
  fetch(`http://localhost:3000/films`)
    .then(response => response.json())
    .then(films => {
      const filmList = document.getElementById('films-list');
      filmList.innerHTML = ''; // Clear existing items if any
      films.forEach(film => {
        const filmItem = document.createElement('li');
        filmItem.textContent = film.title;
        filmItem.className = 'film item';
        filmList.appendChild(filmItem);
        filmItem.addEventListener('click', () => {
          fetchFilmDetails(film.id);
        });
      });
    })
    .catch(error => console.error('Error fetching films:', error));
}

function fetchFilmDetails() {
  fetch(`http://localhost:3000/films/1`)
    .then(response => response.json())
    .then(data => {
      const movieDetails = document.getElementById('movie-details');
      movieDetails.innerHTML = ''; // Clear existing details
      const img = document.createElement('img');
      img.src = data.poster;
      movieDetails.appendChild(img);
      const h2 = document.createElement('h2');
      h2.textContent = data.title;
      movieDetails.appendChild(h2);
      const p = document.createElement('p');
      p.textContent = `Runtime: ${data.runtime} minutes`;
      movieDetails.appendChild(p);
      const p2 = document.createElement('p');
      p2.textContent = `Showtime: ${data.showtime}`;
      movieDetails.appendChild(p2);
      const p3 = document.createElement('p');
      p3.textContent = `Available tickets: ${data.capacity - data.tickets_sold}`;
      movieDetails.appendChild(p3);
      
      const buyTicketBtn = document.createElement('button');
      buyTicketBtn.textContent = (data.tickets_sold < data.capacity) ? 'Buy Ticket' : 'Sold Out';
      buyTicketBtn.id = 'buy-ticket-btn'; // Ensure button has an id for event listener
      buyTicketBtn.addEventListener('click', () => {
        buyTicket(data);
      });
      movieDetails.appendChild(buyTicketBtn);
    })
    .catch(error => console.error('Error fetching film details:', error));
}

function buyTicket(film) {
  const updatedTicketsSold = film.tickets_sold + 1;
  film.tickets_sold = updatedTicketsSold;
  
  const availableTicketsElement = document.getElementById('available-tickets');
  const availableTicketsCountElement = document.getElementById('available-tickets-count');
  availableTicketsCountElement.textContent = film.capacity - updatedTicketsSold;
  
  const buyTicketBtn = document.getElementById('buy-ticket-btn');
  buyTicketBtn.textContent = (updatedTicketsSold < film.capacity) ? 'Buy Ticket' : 'Sold Out';
  if (updatedTicketsSold === film.capacity) {
    buyTicketBtn.disabled = true;
    buyTicketBtn.classList.add('sold-out'); // Optionally, add a class for styling
  }
}

