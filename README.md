# flickstore

A shopping cart solution for The Odin Project, simulating an online store where users can browse and purchase movies. Built with React, TypeScript, TailwindCSS, and Vite, and powered by [TMDB API](https://www.themoviedb.org/) for real-time movie data.

- [Visit the preview](https://flickstore.netlify.app/)
- [Check the design](https://www.figma.com/design/whzafrJO98DOGMTRldONSg/FlickStore?node-id=0-1&t=Mdl48kNNc2rWXAhj-1)

## What I learned
- TailwindCSS
- React Router
- Caching data

## Technologies

![React](https://img.shields.io/badge/-React-000?&logo=React)
![TypeScript](https://img.shields.io/badge/-TypeScript-000?&logo=TypeScript)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-000?&logo=TailwindCSS)
![Sass](https://img.shields.io/badge/-Sass-000?logo=sass)
![Vite](https://img.shields.io/badge/-Vite-000?logo=vite)
![Vitest](https://img.shields.io/badge/-Vitest-000?&logo=Vitest)
![React Testing Library](https://img.shields.io/badge/-React%20Testing%20Library-000?&logo=TestingLibrary)

## Getting Started

### Prerequisites
- [NodeJS](https://nodejs.org/en)
- [TMDB API key](https://developer.themoviedb.org/)

### Cloning

```bash
git clone git@github.com:michalwachowicz/flickstore.git
cd flickstore
```

### Using API key
- Create an account on [TMDB API Developer](https://developer.themoviedb.org/)
- Create `.env` file in the root directory of the project
- Add `VITE_TMDB_API_KEY={YOUR API KEY HERE}` to the document, e.g. `VITE_TMDB_API_KEY=bivbawovbava30g82ba0va`
- **IMPORTANT NOTE**: Use the longer key generated on the API website

### Installing and using locally

To install the project, use the following commands:

```bash
npm install
npm run build
```

To use the application, open the `index.html` file located in the `dist` directory
