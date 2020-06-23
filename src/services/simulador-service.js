import axios from 'axios';
import { urlSimulador as url, headers, keys } from './API';

export function getJobs(uf, city) {
  return axios.get(url(`profissao/${uf}/${city}?api-key=${keys.profissao}`)).then(res => res.data);
}

export function getEntities(prof, uf, city) {
  return axios.get(url(`entidades/${prof}/${uf}/${city}?api-key=${keys.entidade}`)).then(res => res.data);
}

export function getPlans(postObj) {
  return axios.post(url(`plano/?api-key=${keys.plano}`), postObj, { headers }).then(res => res.data);
}
