// Variables
var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');

var nameInputTag = document.querySelectorAll("input")[0];
var urlInputTag = document.querySelectorAll("input")[1];
var searchInputTag = document.querySelectorAll("input")[2];

var addButton = document.querySelector('.submit-button');
var deleteButton = document.querySelector('.btn-delete');
var popupBox = document.getElementById('popup-container');
var bookmarksArray = [];

// Regular Expressions
var urlValidationRegex = /^(http(s):\/\/.)?(w{3}\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;
var nameValidationRegex = /^\w{3,}(\s+\w+)*$/;


// Adding Event Listeners
nameInputTag.addEventListener('input', function (e){
    validateName(this.value);
});

urlInputTag.addEventListener('input', function (n){
    validateLink(this.value);
});

searchInputTag.addEventListener('input', function (n){
    searchBookmark(this.value);
});

addButton.addEventListener('click', function (n){
    addBookmark();
});

urlInputTag.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addBookmark();
    }
});

// Initialization
if(localStorage.getItem('bookmarks') != null){
    bookmarksArray = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarksArray);
    displayBookmarks(bookmarksArray);
}

// Functions
function setVisitButtonHref(index, url) {
    const visitButtons = document.querySelectorAll('.btn-visit');
    if (index >= 0 && index < visitButtons.length) {
        visitButtons[index].href = url;
    }
}

function displayBookmarks(array){
    var displayText = '';
    for(var i = 0; i < array.length; i++){
        displayText += `
        <tr>
            <td>${i+1}</td>
            <td>${array[i].name}</td>
            <td> 
                <a href="#" target="_blank" class="btn btn-visit"> 
                <i class="fa-solid fa-eye"></i>visit</a>
            </td>
            <td> 
                <button class="btn btn-delete">
                <i class="fa-solid fa-trash"></i>delete</button> 
            </td>
        </tr>`;
    }
    document.getElementById('displayTable').innerHTML = displayText;

    for (var i = 0; i < array.length; i++) {
        setVisitButtonHref(i, array[i].url);
        setDeleteButtonEvent(i);
    }
}

function addBookmark(){
    var bookmark = {
        name: bookmarkName.value,
        url: bookmarkURL.value
    };

    if(validateLink(bookmark.url)){
        bookmarksArray.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarksArray));
        displayBookmarks(bookmarksArray);
        clearInput();
    }
    else{
        popupBox.classList.remove('d-none');
    }
}

function deleteBookmark(indx){
    bookmarksArray.splice(indx, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksArray));
    displayBookmarks(bookmarksArray);
}

function setDeleteButtonEvent(index) {
    const deleteButtons = document.querySelectorAll('.btn-delete');
    if (index >= 0 && index < deleteButtons.length) {
        deleteButtons[index].addEventListener('click', function () {
            deleteBookmark(index);
        });
    }
}

function clearInput(){
    bookmarkName.value = '';
    bookmarkURL.value= '';

    bookmarkName.classList.remove('is-valid');
    bookmarkURL.classList.remove('is-valid');
}

function validateLink(url){
    if(urlValidationRegex.test(url)){
        console.log(urlValidationRegex.test(url));
        bookmarkURL.classList.remove('is-invalid');
        bookmarkURL.classList.add('is-valid');
        return true;
    }
    else{
        bookmarkURL.classList.remove('is-valid');
        bookmarkURL.classList.add('is-invalid');
        return false;
    }
}

function validateName(name){
    if(nameValidationRegex.test(name)){
        bookmarkName.classList.remove('is-invalid');
        bookmarkName.classList.add('is-valid');
    }
    else{
        bookmarkName.classList.remove('is-valid');
        bookmarkName.classList.add('is-invalid');
    }
}

function searchBookmark(name){
    searchArray = [];
    for(var i = 0; i < bookmarksArray.length; i++){
        if(bookmarksArray[i].name.toLowerCase().includes(name.toLowerCase())){
            searchArray.push(bookmarksArray[i]);
            displayBookmarks(searchArray);
        }
    }
}

function closePopup(){
    popupBox.classList.add('d-none');
}
