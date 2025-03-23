import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
export default function renderData(data) {
    gallery.innerHTML = '';
    const galleryCollectionTemplate = [];
    data.forEach(item => {
        galleryCollectionTemplate.push(
            `<li>
                <a class="gallery-link" href="${item.largeImageURL}">
                    <img src="${item.previewURL}" alt="${item.tags}">
                    <ul>
                        <li>
                            <p>Likes: <span>${item.likes}</span></p>
                        </li>
                        <li>
                            <p>Views: <span>${item.views}</span></p>
                        </li>
                        <li>
                            <p>Comments: <span>${item.comments}</span></p>
                        </li>
                        <li>
                            <p>Downloads: <span>${item.downloads}</span></p>
                        </li>
                    </ul>
                </a>
            </li>`
        );
    });
    gallery.insertAdjacentHTML('afterbegin', galleryCollectionTemplate.join(''));
    lightboxGallery.refresh();
}

const searchForm = document.querySelector('.form');
let gallery = document.querySelector('.gallery');
// moved to html file
// if (!gallery) {
//     searchForm.insertAdjacentHTML('afterend', '<ul class="gallery"></ul>');
//     gallery = document.querySelector('.gallery');
// }

const lightboxOptions = {
    captionsData: 'alt',
    captionDelay: 250
}

const lightboxGallery = new SimpleLightbox('.gallery a', { ...lightboxOptions });