import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw?.lat,
          tr_latitude: ne?.lat,
          bl_longitude: sw?.lng,
          tr_longitude: ne?.lng,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_TRAVEL_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getWeaterData = async (lat, lng) => {
//   try {
//     const { data } = await axios.get(
//       "https://weatherapi-com.p.rapidapi.com/forecast.json",
//       {
//         params: { q: lat, lng, days: "3" },
//         headers: {
//           "X-RapidAPI-Key":
//             "c7bc0687aamsh2e4a2d3412c98c7p103bc6jsnd82c441a1fc8",
//           "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
