import { Movie } from '../entities/movie';
import { Quote } from '../entities/quote';

export interface MovieRepository {
  getMovies(): Promise<Movie[]>;
  getMovieById(movieId: string): Promise<Movie | null>;
  getMovieQuotes(movieId: string): Promise<Quote[]>;
}
