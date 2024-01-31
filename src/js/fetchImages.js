import axios from 'axios';
import Notiflix from 'notiflix';

//Unique access key to the Pixabay API
const KEY = '37030220-55e5b35e4370d44ae057df5d9';

//Limit of clickable objects on the page
const pageLimit = 40;

axios.defaults.baseURL = 'https://pixabay.com/api/';

//Function to fetch pictures
const fetchImages = async (queryToFetch, pageToFetch) => {
  const { data } = await axios({
    params: {
      key: KEY,
      q: queryToFetch,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: pageLimit,
      page: pageToFetch,
    },
  });
  return data;
};

export { fetchImages, pageLimit };