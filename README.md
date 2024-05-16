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
fetch("https://cubetimerapp.netlify.app/api")
    .then((res) => res.text())
    .then((data) => console.log(data))
```

### Change the cube type
```js
fetch("https://cubetimerapp.netlify.app/api?type=2x2")
    .then((res) => res.text())
    .then((data) => console.log(data))
```
Normally, the API returns a scramble for 3x3x3 cube consisting of 20 moves. You can change the type by passing a type parameter.

## Upcoming features

- A secure account to save the data across multiple devices (possibly not free)
- Customization of the UI
