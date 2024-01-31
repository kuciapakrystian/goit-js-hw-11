
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let queryToFetch = '';
let pageToFetch;

//Writing on elements
const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

//We create auditory responses to the form and button
formEl.addEventListener('submit', onSubmitForm);
buttonLoadMore.addEventListener('click', onBtnLoadMoreClick);

//Initialization of the SimpleLightbox library
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

//Handler function that is generated when submitting photos (fetch + gallery rendering)
function onSubmitForm(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value;
  if (!query.trim() || query === queryToFetch) {
    return;
  }
  queryToFetch = query;
  galleryEl.innerHTML = '';
  pageToFetch = 1;
  buttonLoadMore.classList.add('unvisible');
  getImages(queryToFetch, pageToFetch);
  formEl.reset();
}

//A handler function that renders the next portion of images by clicking on the "Load more" button
function onBtnLoadMoreClick() {
  buttonLoadMore.classList.add('unvisible');
  pageToFetch += 1;
  getImages(queryToFetch, pageToFetch);
}

export { galleryEl, buttonLoadMore, lightbox };