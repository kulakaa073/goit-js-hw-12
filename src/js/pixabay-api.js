import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const params = {
    key: '49331569-d75c2214014d7ff2c794993e6',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
}

export default function searchRequest(searchData, pageNumber = 1, pageSize = 15) {
    params.q = searchData;
    params.page = pageNumber;
    params.per_page = pageSize;
    return axios.get('', { params });
}

