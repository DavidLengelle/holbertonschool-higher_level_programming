fetch('https://swapi-api.hbtn.io/api/films/?format=json')
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    const list = document.querySelector('#list_movies')
    for (let i = 0; i < data.results.length; i++) {
      const li = document.createElement('li')
      li.textContent = data.results[i].title
      list.appendChild(li)
    }
  })
