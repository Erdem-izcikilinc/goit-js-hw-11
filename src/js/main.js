import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');

const API_KEY = '51299963-3036a1369e15ef6a0c013ee56';
const BASE_URL = 'https://pixabay.com/api/';

let lightbox;
let currentQuery = '';
let isLoading = false;

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = e.target.elements.searchQuery.value.trim();

  if (!query || query === currentQuery || isLoading) return;

  currentQuery = query;
  isLoading = true;

  gallery.innerHTML = '';
  showLoader();

  try {
    const images = await fetchImages(query);

    if (images.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      renderImages(images);
      lightbox = new SimpleLightbox('.gallery a').refresh();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
    isLoading = false;
    currentQuery = '';
  }
});

async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  const response = await fetch(url);
  const data = await response.json();
  return data.hits;
}

function renderImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <div class="photo-card">
        <a href="${largeImageURL}" class="image-link">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="stats">
          <div class="stat-block">
            <div class="stat-label">Likes</div>
            <div class="stat-value">${likes}</div>
          </div>
          <div class="stat-block">
            <div class="stat-label">Views</div>
            <div class="stat-value">${views}</div>
          </div>
          <div class="stat-block">
            <div class="stat-label">Comments</div>
            <div class="stat-value">${comments}</div>
          </div>
          <div class="stat-block">
            <div class="stat-label">Downloads</div>
            <div class="stat-value">${downloads}</div>
          </div>
        </div>
      </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}
