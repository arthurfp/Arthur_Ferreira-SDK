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
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axiosInstance.get('/movie');
        if (response.status !== 200 || !response.data?.docs) {
          reject(new Error("Unexpected API response format"));
        }
        resolve(response.data.docs.map((movie: any) => this.mapMovie(movie)));
      } catch (error: unknown) {
        if (error instanceof Error) {
          reject(new Error(`Failed to fetch movies from API: ${error.message}`));
        }
      }
    });
  }

  async getMovieById(movieId: string): Promise<Movie | null>  {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axiosInstance.get(`/movie/${movieId}`);
        if (response.status !== 200 || !response.data?.docs) {
          reject(new Error("Unexpected API response format"));
        }
        const movieData = response.data.docs;
        resolve(movieData.length ? this.mapMovie(movieData[0]) : null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          reject(new Error(`Failed to fetch movie from API: ${error.message}`));
        }
      }
    });
  }

  async getMovieQuotes(movieId: string): Promise<Quote[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axiosInstance.get(`/movie/${movieId}/quote`);
        if (response.status !== 200 || !response.data?.docs) {
          reject(new Error("Unexpected API response format"));
        }
        resolve(response.data.docs.map((quote: any) => this.mapQuote(quote)));
      } catch (error: unknown) {
        if (error instanceof Error) {
          reject(new Error(`Failed to fetch quotes from API: ${error.message}`));
        }
      }
    });
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
