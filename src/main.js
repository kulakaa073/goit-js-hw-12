import fetchData from './js/pixabay-api';
import renderData from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchInput = document.querySelector('input[name="search-text"]');
const searchButton = document.querySelector('button[type="submit"]');
const searchForm = document.querySelector('.form');

let loadingMessage = document.querySelector('.loading');
// moved to html file
// if (!loadingMessage) {
//     searchForm.insertAdjacentHTML('afterend', '<p class="loading visually-hidden">Loading images, please wait...<span class="loader"></span></p>');
//     loadingMessage = document.querySelector('.loading');
// }

const iziToastNoInputSettings = {
    theme: 'dark',
    backgroundColor: '#EF4040',
    position: 'topRight',
    messageColor: '#FAFAFB',
    message: 'Please enter search terms',
    iconUrl: './error-alert.svg',
    iconColor: 'white',
    messageSize: '16px',
    messageLineHeight: '24px',
    progressBarColor: '#B51B1B'
}

const iziToastNoImageSettings = {
    theme: 'dark',
    backgroundColor: '#EF4040',
    position: 'topRight',
    messageColor: '#FAFAFB',
    message: 'No images found, try again',
    iconUrl: './error-alert.svg',
    iconColor: 'white',
    messageSize: '16px',
    messageLineHeight: '24px',
    progressBarColor: '#B51B1B'
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchData = searchInput.value;
    if (searchData.trim() === '') {
        iziToast.show({ ...iziToastNoInputSettings });
        return;
    }
    loadingMessage.classList.remove('visually-hidden'); //deleting and adding element might be better? rethink
    fetchData(searchData)
        .then((response) => {
            loadingMessage.classList.add('visually-hidden');
            if (response.data.totalHits > 0) {
                renderData(response.data.hits);
            }
            else {
                iziToast.show({ ...iziToastNoImageSettings });
            }
        })
        .catch((error) => {
            loadingMessage.classList.add('visually-hidden');
            console.error('Error:', error);
        });
});