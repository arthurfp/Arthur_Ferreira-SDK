import { Movie } from '../../domain/entities/movie';
import { Quote } from '../../domain/entities/quote';

export class MovieAdapter {
  static toDTO(movie: Movie): any {
    return {
      id: movie.id,
      name: movie.name,
      runtimeInMinutes: movie.runtimeInMinutes,
      budgetInMillions: movie.budgetInMillions,
      boxOfficeRevenueInMillions: movie.boxOfficeRevenueInMillions,
      academyAwardNominations: movie.academyAwardNominations,
      academyAwardWins: movie.academyAwardWins,
      rottenTomatoesScore: movie.rottenTomatoesScore,
    };
  }

  static toQuoteDTO(quote: Quote): any {
    return {
      id: quote.id,
      text: quote.text,
      character: quote.character,
    };
  }
}
