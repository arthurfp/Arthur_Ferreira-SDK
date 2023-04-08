import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MovieController, MovieRepositoryImplementation } from '../src';

const mockAxios = new MockAdapter(axios);

const movieData = [
  {
    _id: '1',
    name: 'Movie 1',
    runtimeInMinutes: 120,
    budgetInMillions: 100,
    boxOfficeRevenueInMillions: 500,
    academyAwardNominations: 5,
    academyAwardWins: 2,
    rottenTomatoesScore: 90,
  },
  {
    _id: '2',
    name: 'Movie 2',
    runtimeInMinutes: 150,
    budgetInMillions: 120,
    boxOfficeRevenueInMillions: 600,
    academyAwardNominations: 8,
    academyAwardWins: 3,
    rottenTomatoesScore: 95,
  },
];

const quoteData = [
  { _id: '1', dialog: 'Quote 1', character: 'Character 1' },
  { _id: '2', dialog: 'Quote 2', character: 'Character 2' },
];

describe('SDK Main Entry Point', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('fetches movies successfully', async () => {
    mockAxios.onGet('/movie').reply(200, { docs: movieData });

    const movieRepository = new MovieRepositoryImplementation({
      apiBaseUrl: process.env.API_BASE_URL,
      apiKey: process.env.API_KEY || '',
    });

    const movieController = new MovieController({ movieRepository });
    const movies = await movieController.getMovies();
    expect(movies).toHaveLength(2);
  });

  it('fetches movie quotes successfully', async () => {
    const movieId = '1';
    mockAxios.onGet(`/movie/${movieId}/quote`).reply(200, { docs: quoteData });

    const movieRepository = new MovieRepositoryImplementation({
      apiBaseUrl: process.env.API_BASE_URL,
      apiKey: process.env.API_KEY || '',
    });

    const movieController = new MovieController({ movieRepository });
    const quotes = await movieController.getMovieQuotes(movieId);
    expect(quotes).toHaveLength(2);
  });
});
