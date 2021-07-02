import './sass/main.scss';


import debounce from 'lodash.debounce';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { defaults, info, success, error } from '@pnotify/core';

defaults.delay = 1000;

import contriesTpl from './templates/countries.hbs';
import countryTpl from './templates/oneCountry.hbs';

const refs = {
    input: document.querySelector('#input'),
    countriesContainer: document.querySelector('#countriesList'),
    countryInfo: document.querySelector('#countryInfo'),
};

// добавляем событие

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(event){

    const form = event.target;
    const searchQuery = form.value;
    if(!searchQuery){
        return;
    }
    fetchCountries(searchQuery)
    .then(renderCountries)
    .catch({error});

    }

function fetchCountries(country) {
    return fetch (`https://restcountries.eu/rest/v2/name/${country}`).then(
        response => {
            return response.json()
        }
    )
    .catch(console.log(error))
}

// Создаем разметку при различн вариантах

function renderCountries(countries) {
    refs.countriesContainer.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    if (countries.status === 404) {
        error({
        title: 'Not found!',

    });
    return;
    } else if (countries.length > 10) {
        error({
        title: 'Too many matches found!',
        text: 'Please enter a more specific query!',
    });
        return;
    } else if (countries.length > 1 && countries.length <= 10) {
        const markup = contriesTpl(countries);
        refs.countriesContainer.innerHTML = markup;

        info({
        title: 'Too many results found!',
        text: 'Please enter a more specific query!',
    });
        return;
    } else if ((countries.length === 1)) {
        const markup = countryTpl(countries);
        refs.countryInfo.innerHTML = markup;

        success({
        title: 'Success!',
});
        return;
    }
}

