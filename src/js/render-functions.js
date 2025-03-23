
export function renderData(data, options) {
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
    options.gallery.insertAdjacentHTML('beforeend', galleryCollectionTemplate.join(''));
    options.lightbox.refresh();
    if (options.isPaging) {
        galleryScroll(options.gallery.querySelector(".gallery-link").getBoundingClientRect().height * 2);
    }
}

function galleryScroll(scrollBy) { 
    window.scrollBy({ top: scrollBy, left: 0, behavior: "smooth" });
}

export function clearGallery(gallery) { 
    gallery.innerHTML = '';
}