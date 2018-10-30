// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Artikkel {
  id: number;
  tittel: string;
  dato: string;
  innhold: string;
  kategori: string;
  bilde: string;
}

class NewsService {
  getNews(): Promise<Artikkel[]> {
    return axios.get('/artikkel');
  }

  getANews(id: number): Promise<Artikkel> {
    return axios.get('/artikkel/' + id);
  }
}

export let newsService = new NewsService();
