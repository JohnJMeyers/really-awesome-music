let searchResults = document.querySelector('.search-results')
let trackSong

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

        document.getElementById(`${users[i].id}`).addEventListener('click', function(event) {
          event.preventDefault();
          getTracks(users[i].id, users[i].userName, users[i].avatar)
        })
      }
    })
}
function getTracks(id, userName, avatar) {
  let tracks = []
  searchResults.textContent='';
  fetch(`https://api.soundcloud.com/users/${id}/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f`, {
  })
  .then( function(p) {
      return p.json()
    })
    .then( function(json) {
      console.log(json);
      for (let i = 0; i < json.length; i++) {
        let trackInfo = {}
        trackInfo.artwork = json[i].artwork_url
        trackInfo.title = json[i].title
        trackInfo.url = json[i].stream_url
        trackInfo.id = json[i].id
        trackInfo.avatar = avatar
        tracks.push(trackInfo)
      }
      for (let i = 0; i < tracks.length; i++) {
        let audio
        if (`${tracks[i].artwork}` === 'null') {
           audio = `
          <section id='${tracks[i].url}' class='user-blocks'>
            <div class='userImageDiv'>
              <img class='userImage' src='${tracks[i].avatar}'>
            </div>
            <div class='userName'
              <p>${tracks[i].title}</p>
            </div>
          </section>`

        } else {
          audio = `
          <section id='${tracks[i].url}' class='user-blocks'>
            <div class='userImageDiv'>
              <img class='userImage' src='${tracks[i].artwork}'>
            </div>
            <div class='userName'
              <p>${tracks[i].title}</p>
            </div>
          </section>`
          console.log(tracks)
    }
        searchResults.insertAdjacentHTML('afterbegin', audio)
        document.getElementById(`${tracks[i].url}`).addEventListener('click', function() {
          document.querySelector('.audio-player').textContent='';
          playTrack(tracks[i].url, tracks[i].title)
        })
      }
    })
}
function playTrack(track, title) {
  let playSong = `
  <audio class='player' controls="true" class="player" src='${track}?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f' autoplay="true">
</audio>
<p class='now-playing-text'>Now Playing: ${title}</p>
  `
  document.querySelector('.audio-player').insertAdjacentHTML('afterbegin', playSong)
}

document.querySelector('#search-button').addEventListener('click', function(event){
  event.preventDefault();
  searchResults.textContent='';
  let formInput = document.querySelector('.formInput').value;
  searchFor (formInput)
})
