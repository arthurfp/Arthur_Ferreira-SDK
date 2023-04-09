import { GetMovies, GetMovieById, GetMovieQuotes } from '../../application/use_cases';
import { MovieRepository } from '../../domain/repositories/movie_repository';
import { MovieAdapter } from '../adapters/movie_adapter';
import { MovieRepositoryImplementation } from '../../infrastructure/movie_repository_implementation';

export class MovieController {
  private movieRepository: MovieRepository;

  constructor({
    movieRepository,
    apiKey,
    apiBaseUrl = 'https://the-one-api.dev/v2',
  }: {
    movieRepository?: MovieRepository;
    apiBaseUrl?: string;
    apiKey?: string;
  }) {
    if (!movieRepository) {
      if (apiKey) {
        movieRepository = new MovieRepositoryImplementation({ apiBaseUrl, apiKey });
      } else {
        throw new Error('MovieController requires an apiKey or a movieRepository');
      }
    }
    this.movieRepository = movieRepository;
  }

  async getMovies(): Promise<any> {
    const getMovies = new GetMovies(this.movieRepository);
    
    return getMovies.execute().then((movies) => {
      return movies.map((movie) => MovieAdapter.toDTO(movie));
    }).catch((error) => {
      throw new Error(error)
    });
  }

  async getMovieById(movieId: string): Promise<any> {
    const getMovies = new GetMovieById(this.movieRepository);
    
    return getMovies.execute(movieId).then((movie) => {
      return movie ? MovieAdapter.toDTO(movie) : null;
    }).catch((error) => {
      throw new Error(error)
    });
    
  }

  async getMovieQuotes(movieId: string): Promise<any> {
    const getMovieQuotes = new GetMovieQuotes(this.movieRepository);
    
    return getMovieQuotes.execute(movieId).then((quotes) => {
      return quotes.map((quote) => MovieAdapter.toQuoteDTO(quote));
    }).catch((error) => {
      throw new Error(error)
    });
  }
}
