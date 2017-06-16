function searchFor (formInput) {
  fetch(`http://api.soundcloud.com/users/?client_id=8538a1744a7fdaa59981232897501e04&q=${formInput}`, {
    })
    .then( function(r) {
      return r.json()
    })
    .then( function(json) {
      console.log(json)
})

}

document.querySelector('#search-button').addEventListener('click', function(event){


  console.log("clicked");
  let formInput = document.querySelector('.formInput').value;
  searchFor(formInput)
  console.log(formInput)
})
