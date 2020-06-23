import axios from 'axios';
import { urlIBGE } from './API';

export function getStates() {
  return axios.get(urlIBGE('estados')).then(res => res.data);
}

export function getCities(uf) {
  return axios.get(urlIBGE(`estados/${uf}/distritos`)).then(res => res.data);
}
