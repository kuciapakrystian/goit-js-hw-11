import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { fetchImages, pageLimit } from './fetchImages';
import { renderImages } from './renderImages';
import { buttonLoadMore, lightbox } from './index';

// A function to fetch and render a portion of images
const getImages = async (query, pageToFetch) => {
  try {
    Loading.circle('Loading', {
      svgColor: '#2596be',
    });
    const data = await fetchImages(query, pageToFetch);
    Loading.remove();
    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    renderImages(data);
    //We call the refresh method of the simplelightbox library after updating the DOM
    lightbox.refresh();

    if (pageToFetch === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    if (data.totalHits >= pageToFetch * pageLimit) {
      buttonLoadMore.classList.remove('unvisible');
    }

    if (data.totalHits <= pageToFetch * pageLimit) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results"
      );
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops! Something went wrong!');
  }
};

export { getImages };
//?