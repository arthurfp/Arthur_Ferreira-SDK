import { MovieRepository } from '../../domain/repositories/movie_repository';
import { Movie } from '../../domain/entities/movie';
import { Quote } from '../../domain/entities/quote';

export class GetMovies {
  constructor(private movieRepository: MovieRepository) {}

  async execute(): Promise<Movie[]> {
    return this.movieRepository.getMovies();
  }
}

export class GetMovieById {
  constructor(private movieRepository: MovieRepository) {}

  async execute(movieId: string): Promise<Movie | null> {
    return this.movieRepository.getMovieById(movieId);
  }
}

export class GetMovieQuotes {
  constructor(private movieRepository: MovieRepository) {}

  async execute(movieId: string): Promise<Quote[]> {
    return this.movieRepository.getMovieQuotes(movieId);
  }
}
