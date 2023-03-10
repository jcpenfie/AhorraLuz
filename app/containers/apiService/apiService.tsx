import axios from 'axios';

const API = 'https://api.preciodelaluz.org/v1/prices/';

export async function getAllPrices(zone: any) {
  return await axios({
    method: 'GET',
    url: `${API}all?zone=${zone}`,
  })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}
export async function getMaxPrices(zone: any) {
  return await axios({
    method: 'GET',
    url: `${API}max?zone=${zone}`,
  })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}
export async function getMinPrices(zone: any) {
  return await axios({
    method: 'GET',
    url: `${API}min?zone=${zone}`,
  })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}
export async function getNowPrices(zone: any) {
  return await axios({
    method: 'GET',
    url: `${API}now?zone=${zone}`,
  })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}
export async function getAvgPrices(zone: any) {
  return await axios({
    method: 'GET',
    url: `${API}avg?zone=${zone}`,
  })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}
export async function getcheapestsPrices(zone: any, cantidad: any) {
  return await axios({
    method: 'GET',
    url: `${API}cheapests?zone=${zone}&n=${cantidad}`,
  })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}
