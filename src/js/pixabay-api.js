import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const params = {
    key: '49331569-d75c2214014d7ff2c794993e6',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
}

export default function searchRequest(searchData) {
    params.q = searchData;
    return axios.get('', { params });
}

