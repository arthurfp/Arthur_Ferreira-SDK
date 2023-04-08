import { Movie } from '../../../src/domain/entities/movie';
import { Quote } from '../../../src/domain/entities/quote';
import { MovieRepository } from '../../../src/domain/repositories/movie_repository';
import { MovieController } from '../../../src/interfaces/controllers/movie_controller';

class MockMovieRepository implements MovieRepository {
  async getMovies(): Promise<Movie[]> {
    return [
      new Movie('1', 'Movie 1', 120, 100, 500, 5, 2, 90),
      new Movie('2', 'Movie 2', 150, 120, 600, 8, 3, 95),
    ];
  }

  async getMovieById(movieId: string): Promise<Movie | null> {
    return null;
  }

  async getMovieQuotes(movieId: string): Promise<Quote[]> {
    return [new Quote('1', 'Quote 1', 'Character 1'), new Quote('2', 'Quote 2', 'Character 2')];
  }
}

describe('MovieController', () => {
  const mockMovieRepository = new MockMovieRepository();
  const movieController = new MovieController({ movieRepository: mockMovieRepository });

  it('returns a list of movie DTOs', async () => {
    const movieDTOs = await movieController.getMovies();
    expect(movieDTOs).toHaveLength(2);
  });

  it('returns a list of quote DTOs for a movie', async () => {
    const movieId = '1';
    const quoteDTOs = await movieController.getMovieQuotes(movieId);
    expect(quoteDTOs).toHaveLength(2);
  });
});
