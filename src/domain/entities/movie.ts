export class Movie {
  constructor(
    public id: string,
    public name: string,
    public runtimeInMinutes: number,
    public budgetInMillions: number,
    public boxOfficeRevenueInMillions: number,
    public academyAwardNominations: number,
    public academyAwardWins: number,
    public rottenTomatoesScore: number,
  ) {}
}
