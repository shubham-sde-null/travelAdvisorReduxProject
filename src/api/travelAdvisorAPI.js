import axios from "axios";
export const getPlacesData = async(type, sw, ne) => {
    try {
        const response = await axios.get(
            //here I am only getting the restaurant, but I want to get that data which i will get from arguments
            // "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary"
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
                params: {
                    bl_latitude: sw.lat,
                    tr_latitude: ne.lat,
                    bl_longitude: sw.lng,
                    tr_longitude: ne.lng,
                },
                headers: {
                    //here use the api key which we get
                    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDO_TRAVEL_API,
                    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
                },
            }
        );
        // console.log(response.data.data);

        //from here we are returning the data to the app.js
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};