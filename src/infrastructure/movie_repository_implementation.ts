import axios, { AxiosInstance } from 'axios';
import { MovieRepository } from '../domain/repositories/movie_repository';
import { Movie } from '../domain/entities/movie';
import { Quote } from '../domain/entities/quote';

export class MovieRepositoryImplementation implements MovieRepository {
  private apiBaseUrl: string;
  private apiKey: string;
  private axiosInstance: AxiosInstance;

  constructor({
    apiKey,
    apiBaseUrl = 'https://the-one-api.dev/v2',
  }: {
    apiBaseUrl?: string;
    apiKey: string;
  }) {
    this.apiBaseUrl = apiBaseUrl;
    this.apiKey = apiKey;

    this.axiosInstance = axios.create({
      baseURL: this.apiBaseUrl,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  async getMovies(): Promise<Movie[]> {
    const response = await this.axiosInstance.get('/movie');
    return response.data.docs.map((movie: any) => this.mapMovie(movie));
  }

  async getMovieById(movieId: string): Promise<Movie | null> {
    const response = await this.axiosInstance.get(`/movie/${movieId}`);
    const movieData = response.data;
    return movieData ? this.mapMovie(movieData) : null;
  }

  async getMovieQuotes(movieId: string): Promise<Quote[]> {
    const response = await this.axiosInstance.get(`/movie/${movieId}/quote`);
    return response.data.docs.map((quote: any) => this.mapQuote(quote));
  }

  private mapMovie(movieData: any): Movie {
    return new Movie(
      movieData._id,
      movieData.name,
      movieData.runtimeInMinutes,
      movieData.budgetInMillions,
      movieData.boxOfficeRevenueInMillions,
      movieData.academyAwardNominations,
      movieData.academyAwardWins,
      movieData.rottenTomatoesScore,
    );
  }

  private mapQuote(quoteData: any): Quote {
    return new Quote(quoteData._id, quoteData.dialog, quoteData.character);
  }
}
