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
  viktighet: string;
  $key: string;
  $value: string;
}

export class Kommentar {
  bruker: string
  innhold: string
  tidspunkt: string
}

export class Kategori {
  navn: string
}

class NewsService {
  getNews(): Promise<Artikkel[]> {
    return axios.get('/artikkel');
  }

  getANews(id: number): Promise<Artikkel[]> {
    return axios.get('/artikkel/' + id);
  }

  getCategoryNews(kategori: string): Promise<Artikkel[]> {
    return axios.get('/kategori/' + kategori);
  }

  getComments(id: number): Promise<Kommentar[]> {
    return axios.get('/artikkel/' + id + '/comment');
  }

  addANews(json: Object): Promise<Object> {
    return axios.post('/artikkel', json);
  }

  getLatest(): Promise<Artikkel[]> {
    return axios.get('/latest');
  }

  getCategories(): Promise<Kategori[]> {
    return axios.get('/kategorier');
  }

  editNews(json: Object): Promise<Artikkel[]> {
    return axios.put('/artikkel/' + json.id, json);
  }

  deleteNews(id: number): Promise<Object> {
    return axios.delete('/artikkel/' + id);
  }
}

export let newsService = new NewsService();
