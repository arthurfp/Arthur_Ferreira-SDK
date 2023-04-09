# Arthur Ferreira SDK (Lord of the Rings API SDK)

Hey there! This awesome SDK makes it super easy to access the Lord of the Rings API. You can grab movie info and quotes in no time. And guess what? We designed it using a clean architecture pattern, which means it's super scalable and maintainable!

<br/>

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Author](#author)

<br/>

## Installation

To get started, just run the following command in your project:

    npm install arthur_ferreira-sdk

<br/>

## Usage

To use the SDK, import and instantiate the MovieController from the package:

```javascript
const { MovieController, MovieRepositoryImplementation } = require('arthur_ferreira-sdk');

const API_BASE_URL = 'https://the-one-api.dev/v2';
const API_KEY = 'YOUR_API_KEY';

// Instantiate the movie repository and the movie controller
const movieRepository = new MovieRepositoryImplementation({ 
  apiBaseUrl: API_BASE_URL, 
  apiKey: API_KEY 
});

const movieController = new MovieController({ movieRepository });
```

It's worth mentioning that MovieRepositoryImplementation is already the default parameter for the MovieController, therefore the cobe above can be abstracted to the following:

```javascript
const { MovieController } = require('arthur_ferreira-sdk');

const API_BASE_URL = 'https://the-one-api.dev/v2';
const API_KEY = 'YOUR_API_KEY';

// Instantiate the movie controller with the default repository
const movieController = new MovieController({ 
  apiBaseUrl: API_BASE_URL, 
  apiKey: API_KEY 
});
```

**Note**: 'https://the-one-api.dev/v2' is already the default value for `apiBaseUrl` param for both `MovieController` and `MovieRepositoryImplementation`. If you want to abstract the code even more, you can omit this param and only set the `apiKey` value.

<br/>

---

<br/>You can now use the `movieController` instance to access movie data and quotes using the following methods:

<br/>

### **getMovies() -> Promise<Movie[]>**
Fetches a list of movies.

```javascript
movieController.getMovies().then((movies) => {
  console.log(movies);
});
```
<br/>

### **getMovieById(movieId: string) -> Promise<Movie | null>**
Fetches a movie by its ID.

```javascript
movieController.getMovieById('5cd95395de30eff6ebccde56').then((movie) => {
  console.log(movie);
});
```

<br/>

### **getMovieQuotes(movieId: string) -> Promise<Quote[]>**
Fetches quotes for a movie by its ID.

```javascript
movieController.getMovieQuotes('5cd95395de30eff6ebccde56').then((quotes) => {
  console.log(quotes);
});

```

## Author

Arthur Ferreira Pinto - fepi.arthur@gmail.com