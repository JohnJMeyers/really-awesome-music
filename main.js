let searchResults = document.querySelector('.search-results')



function searchFor (formInput) {
  let users = []


  fetch(`http://api.soundcloud.com/users/?client_id=8538a1744a7fdaa59981232897501e04&q=${formInput}`, {
    })
    .then( function(r) {
      return r.json()
    })
    .then( function(json) {
      for (let i = 0; i < json.length; i++) {
        let userInfo = {}
        userInfo.id = json[i].id
        userInfo.avatar = json[i].avatar_url
        userInfo.userName = json[i].username

        users.push(userInfo)

    }
      for (let i = 0; i < users.length; i++) {
        
        let userHTML = `
        <section id='${users[i].id}' class='user-blocks'>
          <div class='userImageDiv'>
            <img class='userImage' src='${users[i].avatar}'>
          </div>
          <div class='userName'
            <p>${users[i].userName}</p>
          </div>
        </section>`

        searchResults.insertAdjacentHTML('beforeend', userHTML)

        document.getElementById(`${users[i].id}`).addEventListener('click', function() {

          getTracks(users[i].id, users[i].userName)
        })

      }

    })

}


function getTracks(id, userName) {
  // searchResults.textContent='';
  fetch(`https://api.soundcloud.com/users/${id}/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f`, {
  })
  .then( function(p) {
      return p.json()
    })
    .then( function(json) {
      console.log(json);
    })

}




document.querySelector('#search-button').addEventListener('click', function(event){
  event.preventDefault();
  searchResults.textContent='';
  let formInput = document.querySelector('.formInput').value;
  searchFor (formInput)

})
