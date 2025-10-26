import axios from "axios";
// Описаний у документації
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";
import {getImagesByQuery} from "./js/pixabay-api";
import {showLoader, createGallery, hideLoader, clearGallery, showLoadMoreButton, hideLoadMoreButton} from "./js/render-functions"
const form = document.querySelector(".form");
const loadMore = document.querySelector(".load-more");

loadMore.addEventListener("click", onLoadMoreHandler)
form.addEventListener("submit", onHandlerButton);

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;


    hideLoadMoreButton()
    async function onHandlerButton(event){
    event.preventDefault()
    
        const searhText = event.target.elements["search-text"].value.trim()
        
    if(!searhText){
        iziToast.error({
                        title: 'Error',
                        message: 'Please enter a search word!',
                        position: 'topRight'
                    })
                    return
                }
                
    currentQuery = searhText;
    currentPage = 1;
    clearGallery()
    hideLoadMoreButton()
    showLoader()

    try{
        const data = await getImagesByQuery(searhText, currentPage)
            
            const images = data.hits;
            totalHits = data.totalHits
            
            
            if(!images || images.length === 0){
                iziToast.error({
                        title: 'Error',
                        message: 'Sorry, there are no images matching your search query. Please try again!',
                        position: 'topRight'
                    })
                    return
                }

            createGallery(images)
            
            
        if(currentPage * 15 < totalHits){
            showLoadMoreButton()
        }  else{
            hideLoadMoreButton()
            iziToast.info({
            title: "End",
            message: "We're sorry, but you've reached the end of search results.",
            position: "topRight",
        });
        }
            }
        
        catch(error) {
            console.log("error", error);
            console.log("error", error.message);
            
            iziToast.error({
                        title: 'Error',
                        message: 'Failed to fetch images. Try again!',
                        position: 'topRight'
                    })
                }
            
            finally{
            hideLoader()
        }}
        
        
        async function onLoadMoreHandler() {
            showLoader()
            currentPage++

            hideLoadMoreButton()


        try{
            const data = await getImagesByQuery(currentQuery, currentPage)
            const images = data.hits

            createGallery(images)

            const {height: cardHeight} =
            document.querySelector(".gallery-list").getBoundingClientRect();

            window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth"
            })
            const perPage = 15;
            const totalPage = Math.ceil(totalHits / perPage)
            if(currentPage >= totalPage){
                hideLoadMoreButton();
                iziToast.info({
                    title: "End",
                    message: "We're sorry, but you've reached the end of search results.",
                    position: "topRight",
                });
            } else{
                showLoadMoreButton()
            }
        } catch(error){
                    iziToast.error({
            title: "Error",
            message: "Failed to load more images.",
            position: "topRight",
            });
        }finally{
            hideLoader();
        }
        
    
}
