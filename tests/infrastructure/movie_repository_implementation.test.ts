import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MovieRepositoryImplementation } from '../../src/infrastructure/movie_repository_implementation';

const mockAxios = new MockAdapter(axios);
const movieRepository = new MovieRepositoryImplementation({
  apiBaseUrl: process.env.API_BASE_URL,
  apiKey: process.env.API_KEY || '',
});

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

describe('MovieRepositoryImplementation', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('fetches movies successfully', async () => {
    mockAxios.onGet('/movie').reply(200, { docs: movieData });

    const movies = await movieRepository.getMovies();
    expect(movies).toHaveLength(2);
  });

  it('fetches movie by id successfully', async () => {
    const movieId = '1';
    mockAxios.onGet(`/movie/${movieId}`).reply(200, { docs: [movieData[0]] });

    const movie = await movieRepository.getMovieById(movieId);

    const  {_id, ...mockMovieData } = movieData[0];

    const mockMovie = {
      id: _id,
      ...mockMovieData
    };

    expect(movie).toMatchObject(mockMovie);
  });

  it('fetches movie quotes successfully', async () => {
    const movieId = '1';
    mockAxios.onGet(`/movie/${movieId}/quote`).reply(200, { docs: quoteData });

    const quotes = await movieRepository.getMovieQuotes(movieId);
    expect(quotes).toHaveLength(2);
  });

  it("should throw an error when the API returns a non-200 status code", async () => {
    mockAxios.onGet().reply(500, {
      success: false,
      message: "Something went wrong."
    });

    await expect(movieRepository.getMovies()).rejects.toThrow("Failed to fetch movies from API");

    await expect(movieRepository.getMovieById("5cd95395de30eff6ebccde56")).rejects.toThrow("Failed to fetch movie from API");

    await expect(movieRepository.getMovieQuotes("5cd95395de30eff6ebccde56")).rejects.toThrow("Failed to fetch quotes from API");
  });

  it("should throw an error when the API response data is not in the expected format", async () => {
    mockAxios.onGet().reply(200, {
      unexpectedKey: [{ unexpectedKey: "unexpectedValue" }]
    });

    await expect(movieRepository.getMovies()).rejects.toThrow("Unexpected API response format");

    await expect(movieRepository.getMovieById("5cd95395de30eff6ebccde56")).rejects.toThrow("Unexpected API response format");

    await expect(movieRepository.getMovieQuotes("5cd95395de30eff6ebccde56")).rejects.toThrow("Unexpected API response format");
  });
});
