// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

export class Artikkel {
  id: number;
  tittel: string;
  tidspunkt: string;
  innhold: string;
  kategori: string;
  bilde: string;
}

export class Kommentar {
  bruker: string
  innhold: string
  tidspunkt: string
}

class NewsService {
  getNews(): Promise<Artikkel[]> {
    return axios.get('/artikkel');
  }

  getANews(id: number): Promise<Artikkel> {
    return axios.get('/artikkel/' + id);
  }

  getCategoryNews(kategori: string): Promise<Artikkel[]> {
    return axios.get('/kategori/' + kategori);
  }

  getComments(id: number): Promise<Kommentar[]> {
    return axios.get('/artikkel/' + id + '/comment');
  }

  addANews(json: Object): Promise<Artikkel> {
    return axios.post('/artikkel', json);
  }

  getLatest(): Promise<Artikkel[]> {
    return axios.get('/latest');
  }
}

export let newsService = new NewsService();
