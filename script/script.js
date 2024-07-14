const apiUrl = 'http://localhost:3000/films';

document.addEventListener('DOMContentLoaded', () => {
  fetchFilms();
  fetchFilmDetails(1);
});

function fetchFilms() {
  fetch(`http://localhost:3000/films`)
    .then(response => response.json())
    .then(films => {
      const filmList = document.getElementById('films-list');
      films.forEach(film => {
        const filmItem = document.createElement('li');
        filmItem.textContent = film.title;
        filmItem.className = 'film item';
        filmList.appendChild(filmItem);
      });
    });
}
function fetchFilmDetails() {
  fetch(`http://localhost:3000/films`)
    .then(response => response.json())
    .then(data => {
      const movieDetails = document.getElementById('movie-details');
      movieDetails.innerHTML = '';
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
      const button = document.createElement('button');
      button.textContent = 'Buy Ticket';
      button.addEventListener('click', () => {
        buyTicket(1);
      });
      movieDetails.appendChild(button);
    });
}

function buyTicket(id) {
  fetch(`http://localhost:3000/films`)
    .then(response => response.json())
    .then(data => {
      console.log('Current data:', data);
      const newTicketsSold = data.tickets_sold + 1;
      fetch(`http://localhost:3000/films`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tickets_sold: newTicketsSold })
      })
        .then(response => response.json())
        .then(updatedData => {
          console.log('Updated data:', updatedData);
          const availableTickets = updatedData.capacity - updatedData.tickets_sold;
          console.log('Available tickets:', availableTickets);
          if (availableTickets > 0) {
            document.getElementById('movie-details').querySelector('p:nth-child(3)').textContent = `Available tickets: ${availableTickets}`;
          } else {
            document.getElementById('movie-details').querySelector('button').textContent = 'Sold Out';
            document.getElementById('films').querySelector(`li:contains(${updatedData.title})`).classList.add('sold-out');
          }
        })
        .catch(error => console.error('Error updating tickets:', error));
    })
    .catch(error => console.error('Error fetching film data:', error));
}
