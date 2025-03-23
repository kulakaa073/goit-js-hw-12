//#region imports
import fetchData from './js/pixabay-api';
import {renderData, clearGallery} from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
//#endregion imports

//#region init variables and options
const searchInput = document.querySelector('input[name="search-text"]');
const searchButton = document.querySelector('button[type="submit"]');
const gallery = document.querySelector('.gallery');
const loadingMessage = document.querySelector('.loading');
const loadMoreButton = document.querySelector('.load-more-button');
const endOfSearchMessage = document.querySelector('.end-of-search');
const backToTopButton = document.querySelector('.back-to-top');

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

const lightboxOptions = {
    captionsData: 'alt',
    captionDelay: 250
}

const lightboxGallery = new SimpleLightbox('.gallery a', { ...lightboxOptions });

const renderOptions = {
    gallery: gallery,
    lightbox: lightboxGallery,
    isPaging: false
}

let page = 1;
const itemsPerPage = 200;
let totalPages;
let searchData = searchInput.value;
let loadData;
//#endregion init variables and options

//#region utils
function calcPages(totalElements) {
    totalPages = Math.floor(totalElements / itemsPerPage);
}

function iteratePage() {
    page++;
}

function resetPages() {
    page = 1;
}
function isLastPage() {
    return totalPages < page; 
}
 //#endregion utils

 //#region event listeners
searchButton.addEventListener('click', async (e) => {
    e.preventDefault();
    clearGallery(gallery);
    resetPages();
    endOfSearchMessage.classList.add('visually-hidden');
    loadMoreButton.classList.add('visually-hidden');
    if (!searchData || searchData === '') {
        iziToast.show({ ...iziToastNoInputSettings });
        return;
    }
    loadingMessage.classList.remove('visually-hidden'); //deleting and adding element might be better? rethink
    await fetchData(searchData, page, itemsPerPage)
        .then((response) => {
            console.log(response);
            loadingMessage.classList.add('visually-hidden');
            if (response.data.totalHits > 0) {
                renderOptions.isPaging = false;
                renderData(response.data.hits, renderOptions);
                calcPages(response.data.totalHits);
                if (!isLastPage()) {
                    renderOptions.isPaging = true;
                    iteratePage();
                    loadMoreButton.classList.remove('visually-hidden');
                    loadData = searchData;
                }
                else {
                    endOfSearchMessage.classList.remove('visually-hidden');
                }
            }
            else {
                iziToast.show({ ...iziToastNoImageSettings });
            }
        })
        .catch((error) => {
            loadingMessage.classList.add('visually-hidden');
            console.error('Error:', error);
            iziToast.error({title: 'Error', message:'Error fetching results, try again later (check console for details)'});
        });
});

loadMoreButton.addEventListener('click', async (e) => { 
    e.preventDefault();
    await fetchData(loadData, page, itemsPerPage)
        .then((response) => {
            loadingMessage.classList.add('visually-hidden');
            if (response.data.totalHits > 0) {
                
                renderData(response.data.hits, renderOptions);
                if (!isLastPage()) {
                    iteratePage();
                    loadData = searchData;
                }
                else {
                    loadMoreButton.classList.add('visually-hidden');
                    endOfSearchMessage.classList.remove('visually-hidden');
                }
            }
        })
        .catch((error) => {
            loadingMessage.classList.add('visually-hidden');
            iziToast.error({title: 'Error', message:'Error fetching results, try again later (check console for details)'});
        });
})

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
})

searchInput.addEventListener('input', () => searchData = searchInput.value.trim());
//#endregion event listeners
