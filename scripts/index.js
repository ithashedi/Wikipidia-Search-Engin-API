const searchBox = document.querySelector('.search-box');
const cancelBtn = document.getElementById('btn-cancel');

//hiding the x icon when there is no text and showing it when there is text
searchBoxCheck = () => {
    if (searchBox.value.length > 0) {
        cancelBtn.style.display = "block"
    } else {cancelBtn.style.display = "none"}
}

//adding an event  listener to the search box
searchBox.addEventListener('keydown', (event) => {
    searchBoxCheck();
  });


//when cancel is clicked input should clear the search box
cancelBtn.addEventListener('click', (event) => {
    searchBox.value == '';
    searchBoxCheck();
});

searchBoxCheck();
console.log(searchBox);
