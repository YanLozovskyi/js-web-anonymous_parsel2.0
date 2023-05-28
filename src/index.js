import { UnsplashAPI } from './js/UnsplashAPI';
import createGalleryCard from './templates/gallery_card.hbs';
import refs from './js/refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const options = {
  // below default value of options
  totalItems: 0,
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
};
const unsplashApi = new UnsplashAPI();
const pagination = new Pagination(refs.container, options);

const page = pagination.getCurrentPage();

async function createPopularPagination(event) {
  const currentPage = event.page;
  try {
    const response = await unsplashApi.getPopularPhotos(currentPage);

    refs.galleryEl.innerHTML = createGalleryCard(response.data.results);
  } catch (error) {
    console.log(error);
  }
}

async function onRenderPage(page) {
  try {
    const response = await unsplashApi.getPopularPhotos(page);

    if (response.data.results.length === 0) {
      return alert('server error');
    }

    refs.galleryEl.innerHTML = createGalleryCard(response.data.results);

    pagination.reset(response.data.total);
    refs.container.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
}

onRenderPage(page);
pagination.on('afterMove', createPopularPagination);
