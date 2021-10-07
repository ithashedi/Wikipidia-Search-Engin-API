//naming the elements from the DOM

const cancelBtn = document.getElementById('btn-cancel');
const form = document.querySelector('.search-form');
const searchBox = document.querySelector('.search-box');
// the searched value inputed by the user
var inputValue = searchBox.value;
// getting ride of the white spaces
var searchQuery = inputValue.trim();

const anotherSearchBtn = `<button class= another-search-btn onclick = "window.location.reload();"> Search Again</button> `
const foundResults = `The search results of  ${searchQuery} ${anotherSearchBtn}`

//hiding the cancel button (icon) when there is no text and showing it when there is text
searchBoxCheck = () => {
    if (searchBox.value.length > 0) {
        cancelBtn.style.display = "block"
    } else {cancelBtn.style.display = "none"};
    
}


//adding an event  listener to the search box whihc will hide and show the cancel button
searchBox.addEventListener('keydown', (event) => {
    searchBoxCheck();
  });


//when cancel is clicked input should clear the search box
function clearSearchBox() {
    document.querySelector('.search-box').value = '';
}


async function handleSubmit(event) {
  //preventing the reload the page
  event.preventDefault();
  // getting the searched results from the API calling  and storing them in the variable results
  try {
      const results = await searchWikipedia(searchQuery);
      document.querySelector('.search-container').style.height = "70vh";
      document.querySelector('.found-results-text').style.display="flex";
      document.querySelector('.found-results-text').style.justifyContent = "space-between";
      document.querySelector('.search-container').style.display="none";
      document.querySelector('.found-results-text').innerHTML='';
      document.querySelector('.found-results-text').innerHTML= foundResults;
      displaySearchResults(results);
    } catch (err) {
      console.log(err);
      alert('Failed to search wikipedia for', searchQuery);
    }
}

// calling the API with the search query (searchQuery) and return the response in json file 
async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    // storing the response
    const response = await fetch(endpoint);
    //checking for errors
    if (!response.ok) {
      throw Error(response.statusText);
    }
    // returning the response in json format
    const json = await response.json();
    return json;
  }


  function displaySearchResults(results) {
    // Get a reference to the `.js-search-results` element
const searchResults = document.querySelector('.results-container');

// Iterate over the `search` array. Each nested object in the array can be
// accessed through the `result` parameter
results.query.search.forEach(result => {
  const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

  // Append the search result to the DOM
  searchResults.insertAdjacentHTML(
    'beforeend',
    `<div class="result-item">
      <h3 class="result-title">
        <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
      </h3>
      <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
      <span class="result-snippet">${result.snippet}</span><br>
    </div>`
  );
});
}

  
  //adding the event listener to the form when submitted
form.addEventListener('submit', handleSubmit);
