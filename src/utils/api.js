/********************************
 *
 * YouTubeAPI
 *
 ******************************/

import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  params: { hl: "en", gl: "IN" },
  headers: {
    "X-RapidAPI-Key": "0377d5198bmshb0d7ab0066677fcp1a51e0jsnd478df8f3847",
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};

export const fetchDataFromApi = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
