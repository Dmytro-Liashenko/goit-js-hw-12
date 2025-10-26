import axios from "axios";
const key = "52826967-21134cff4c4a1edd285b3f00c";
export async function getImagesByQuery(query, page){
            try{
                const response = await axios.get("https://pixabay.com/api/", {
                params:{
                    key: key,
                    q: query,
                    page: page,
                    per_page: 15,
                    image_type: "photo",
                    orientation: "horizontal",
                    safesearch: true
            }
            })
            
                return response.data
            }catch(error){
                throw error
            }
    }


