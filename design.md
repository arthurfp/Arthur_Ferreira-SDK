# Deployment

The SDK developed in this project was deployed in the package manager `npm`.

**Link:** https://www.npmjs.com/package/arthur_ferreira-sdk

# Architecture

**Depending** on the purpose of this SDK, I would have used the KISS (Keep it simple, stupid!) parttern in this project, and therefore created less folder and files. But since the idea of this challenge was to demonstrate my knowledge about the coding principles, I decided to implement the "Clean Architecture" pattern (by Robert C. Martin, aka Uncle Bob).

The main idea behind Clean Architecture is to "organize the code into layers with well-defined responsibilities. The layers are organized based on their level of abstraction, where the innermost layers represent the core business logic and domain entities, and the outer layers deal with application-specific concerns, infrastructure, and user interfaces".

In this project I created the architecture with the following directories:

1. **application**: Application-specific use cases and business rules.
2. **domain**: Core business logic and domain entities.
3. **infrastructure**: External services, data persistence, and communication with the outside world.
4. **interfaces**: User interfaces, controllers, and adapters for communication between layers.

# Implementation

The domain layer contains the main business logic and domain-specific data structures, including `Movie` and `Quote` interfaces that define the data structure for movie and quote objects. The `MovieRepository` interface defines the contract for fetching movie data.

The application layer consists of the `MovieController` class, which serves as a bridge between the domain layer and the interface layer. The `MovieController` encapsulates the application business logic and interacts with the `MovieRepository` to fetch data.

The infrastructure layer includes the `MovieRepositoryImplementation` class, which implements the `MovieRepository` interface for fetching data from the Lord of the Rings API. The class uses `Axios` (HTTP client lib) to make requests to the API. It <u>also handles error cases and ensures that the data returned is in the expected format</u>.

The interface layer contains the `MovieRepository` interface, which establishes a contract for interacting with movie data. This layer is responsible for abstracting the data access layer and allowing the application layer to work with different data sources without needing to change the core business logic.

# Tests

In the project, I've created tests to make sure everything works as it should. These tests check different parts, like how we set up our main class and how we talk to the API to get data. We used a tool called Jest to help us write and run the tests. This helps us know if everything is working well and makes it easier to fix or add things to our project later.

Note: **All typescript  files in this project has a test coverage of 80% or more** (almost all with 100%).