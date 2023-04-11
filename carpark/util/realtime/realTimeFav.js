import axios from "axios";

const BACKEND_URL = 'https://carpark-497d8-default-rtdb.asia-southeast1.firebasedatabase.app'


export function storeFav(reportData){
    axios.post(BACKEND_URL+'/favourites.json',reportData);
}

export async function fetchFavs(email){
    const response = await axios.get(BACKEND_URL+'/favourites.json');
    const favourites = [];

    for (const key in response.data){
        if(response.data[key].user_id === email){
            const favourited = response.data[key].favouritedCarpark;
            for (const key in favourited){
                favourites.push(favourited[key]);
            }
        }
    }
    return favourites;
}

export async function updateFavorite(favData,email){
    const response = await axios.get(BACKEND_URL+'/favourites.json');
    const favourites = [];

    for (const key in response.data){
        if(response.data[key].user_id === email){
            if(favData.length === 0){
                axios.delete(BACKEND_URL+`/favourites/${key}.json`);
            }else{
                axios.put(BACKEND_URL+`/favourites/${key}/favouritedCarpark.json`,favData);
            }
        }
    }
}
