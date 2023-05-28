import onCheckboxClick from './js/thams';
import { UnsplashAPI } from './js/UnsplashAPI';
import createGalleryCard from './templates/gallery_card.hbs';
import refs from './js/refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const unsplashApi = new UnsplashAPI(12);

const options = {
  // below default value of options
  totalItems: 0,
  itemsPerPage: unsplashApi.per_page,
  visiblePages: 5,
  page: 1,
};

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

//* пошук по формі

refs.formEl.addEventListener('submit', onSearchFormSubmit);

async function onSearchFormSubmit(event) {
  event.preventDefault();

  pagination.off('afterMove', createPopularPagination);

  const searchQuery =
    event.currentTarget.elements['user-search-query'].value.trim();

  unsplashApi.query = searchQuery;

  if (!searchQuery) {
    return alert('Введіть ваш запит');
  }

  try {
    const response = await unsplashApi.getPhotosByQuery(page);

    refs.galleryEl.innerHTML = createGalleryCard(response.data.results);

    pagination.reset(response.data.total);
    refs.container.classList.remove('is-hidden');

    pagination.on('afterMove', createByQueryPagination);

    if (response.data.total < unsplashApi.per_page) {
      refs.container.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

async function createByQueryPagination(event) {
  const currentPage = event.page;
  try {
    const response = await unsplashApi.getPhotosByQuery(currentPage);

    refs.galleryEl.innerHTML = createGalleryCard(response.data.results);
  } catch (error) {
    console.log(error);
  }
}

refs.checkBoxEl.addEventListener('change', onCheckboxClick);
