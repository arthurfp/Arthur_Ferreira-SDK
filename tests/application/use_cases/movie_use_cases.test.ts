import { MovieRepository } from '../../../src/domain/repositories/movie_repository';
import { Movie } from '../../../src/domain/entities/movie';
import { Quote } from '../../../src/domain/entities/quote';
import { GetMovies, GetMovieQuotes } from '../../../src/application/use_cases';

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

describe('Movie Use Cases', () => {
  const mockMovieRepository = new MockMovieRepository();

  it('GetMovies use case returns a list of movies', async () => {
    const getMovies = new GetMovies(mockMovieRepository);
    const movies = await getMovies.execute();
    expect(movies).toHaveLength(2);
  });

  it('GetMovieQuotes use case returns a list of quotes for a movie', async () => {
    const getMovieQuotes = new GetMovieQuotes(mockMovieRepository);
    const quotes = await getMovieQuotes.execute('1');
    expect(quotes).toHaveLength(2);
  });
});
