/* eslint-disable no-shadow */
/* eslint-disable no-console */
// eslint-disable-next-line import/extensions
import { values, json } from './constants.js';

const objectDefault = {};
const cardContainer = document.getElementById('card-container');

const getData = () => {
  Object.entries(json.data).forEach(([key, val]) => {
    const greaterLimit = val.reduce(
      (accum, currentVal) => (accum?.limit > currentVal.limit ? accum : currentVal),
    );

    objectDefault[key] = {
      limit: greaterLimit.limit,
      over: {
        service: values[greaterLimit.over_carrier_service_id].service,
        carrier: values[greaterLimit.over_carrier_service_id].carrier,
      },
      under: {
        service: values[greaterLimit.under_carrier_service_id].service,
        carrier: values[greaterLimit.under_carrier_service_id].carrier,
      },
    };
  });
  console.log(objectDefault);
};
getData();

Object.entries(objectDefault).forEach(([key, val]) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3 class="card__title">${key}:</h3>
    <p class="card__subtitle">limit: <b>${val.limit}</b></p>
    <p>over</p>
    <ul class="card__list">
      <li>service: ${val.over.service}</li>
      <li>carrier: ${val.under.carrier}</li>
    </ul>
    <p>under</p>
    <ul class="card__list">
      <li>services: ${val.under.service}</li>
      <li>carrier: ${val.under.carrier}</li>
    </ul>`;
  cardContainer.appendChild(card);
});
