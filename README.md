## Overview

- Free timing program for Rubik's cube speedsolvers
- Modern and simple user interface
- Built entirely with SvelteKit and Tailwind CSS

## Features

- Provides an API to generate a scramble based on the given parameters
- Saves your time in localStorage

## How to use the API

### Get a scramble
```js
fetch("https://scramble-api.netlify.app/api")
    .then((res) => res.text())
    .then((data) => console.log(data))
```

### Change the number of moves
```js
fetch("https://scramble-api.netlify.app/api?length=20")
    .then((res) => res.text())
    .then((data) => console.log(data))
```
Normally, the API generates a scramble of 10 moves. You can change this number by passing a length parameter.

## Upcoming features

- A secure account to save the data across multiple devices (possibly not free)
- Customization of the UI