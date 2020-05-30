import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/starwars/v1/films/';

class FilmsService {
  getFilms() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getCharacters(filmId) {
    return axios.get(API_URL + filmId + '/characters', { headers: authHeader() });
  }

}

export default new FilmsService();