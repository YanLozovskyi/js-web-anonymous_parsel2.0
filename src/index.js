import { UnsplashAPI } from './js/UnsplashAPI';
import createGalleryCard from './templates/gallery_card.hbs';
import refs from './js/refs';

const unsplashApi = new UnsplashAPI();

async function onRenderPage(page) {
  try {
    const response = await unsplashApi.getPopularPhotos(page);

    if (response.data.results.length === 0) {
      return alert('server error');
    }

    refs.galleryEl.innerHTML = createGalleryCard(response.data.results);
  } catch (error) {
    console.log(error);
  }
}

onRenderPage();
