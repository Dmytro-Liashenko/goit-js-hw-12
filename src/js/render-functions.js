// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-more")
const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250
});


export function createGallery(images){
    
    const markup = images.map((image) =>{
        return `<li class="gallery-list">
        <a class="gallery-link" href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}"  class="image-list"/>
        <div class="image-info">
        
        <p><span>Likes</span> ${image.likes} </p>
        <p><span>Views</span> ${image.views} </p>
        <p><span>Comments</span> ${image.comments} </p>
        <p><span>Downloads</span> ${image.downloads} </p>
        </div></a></li>
        `
    }).join("")
    gallery.insertAdjacentHTML("beforeend", markup)
    lightbox.refresh();
}


export function showLoader() {
    loader.classList.remove("hidden"); 
}
export function hideLoader() {
    loader.classList.add("hidden");
}

export function clearGallery(){
    gallery.innerHTML = ""
}
export function hideLoadMoreButton(){
    loadMore.classList.add("hidden-load-more")
}
export function showLoadMoreButton(){
    loadMore.classList.remove("hidden-load-more")
}