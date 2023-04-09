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
    return new Movie('1', 'Movie 1', 120, 100, 500, 5, 2, 90);
  }

  async getMovieQuotes(movieId: string): Promise<Quote[]> {
    return [new Quote('1', 'Quote 1', 'Character 1'), new Quote('2', 'Quote 2', 'Character 2')];
  }
}

class MockMovieRepositoryError implements MovieRepository {
  async getMovies(): Promise<Movie[]> {
    throw new Error('Error');
  }

  async getMovieById(movieId: string): Promise<Movie | null> {
    throw new Error('Error');
  }

  async getMovieQuotes(movieId: string): Promise<Quote[]> {
    throw new Error('Error');
  }
}

describe('MovieController', () => {
  describe('MovieController - Constructor', () => {
    const mockMovieRepository = new MockMovieRepository();

    it('should create a new instance with provided movieRepository', () => {
      const movieController = new MovieController({ movieRepository: mockMovieRepository });
      expect(movieController).toBeDefined();
    });

    it('should create a new instance with provided apiKey', () => {
      const movieController = new MovieController({
        apiKey: process.env.API_KEY || '',
      });
      expect(movieController).toBeDefined();
    });

    it('should throw an error when neither movieRepository nor apiKey is provided', () => {
      expect(() => new MovieController({})).toThrowError(
        "MovieController requires an apiKey or a movieRepository"
      );
    });
  });

  describe('MovieController - Success Calls', () => {
    const mockMovieRepository = new MockMovieRepository();
    const movieController = new MovieController({ movieRepository: mockMovieRepository });

    it('returns a list of movie DTOs', async () => {
      const movieDTOs = await movieController.getMovies();
      expect(movieDTOs).toHaveLength(2);
    });

    it('returns a movie id DTO', async () => {
      const movieId = '1';
      const movieDTOs = await movieController.getMovieById(movieId);
      expect(movieDTOs).toBeDefined();
    });

    it('returns a list of quote DTOs for a movie', async () => {
      const movieId = '1';
      const quoteDTOs = await movieController.getMovieQuotes(movieId);
      expect(quoteDTOs).toHaveLength(2);
    });
  });

  describe('MovieController - Error Calls', () => {
    const mockMovieRepositoryError = new MockMovieRepositoryError();
    const movieController = new MovieController({ movieRepository: mockMovieRepositoryError });

    it('throw an error when calling the list of movie DTOs', async () => {
      expect(async () => await movieController.getMovies()).rejects.toThrowError();
    });

    it('throw an error when calling the movie id DTO', async () => {
      const movieId = '1';
      expect(async () => await movieController.getMovieById(movieId)).rejects.toThrowError();
    });

    it('throw an error when calling the list of quote DTOs for a movie', async () => {
      const movieId = '1';
      expect(async () => await movieController.getMovieQuotes(movieId)).rejects.toThrowError();
    });
  });
});
