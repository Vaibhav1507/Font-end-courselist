## Scripts

### Prerequisites

- Have the latest version of nodejs installed with npm


### To start the project

1. Open the project folder in a console or terminal.
1. Execute `npm install` command to install the required libraries of the project.
1. Execute `npm start` command to start the application on [http://localhost:3000](http://localhost:3000).

Note: The application is updated automatically each time a file is modified in the project.

### Task

Reproduce as closely as possible the search result cards design below. The display must be responsive. The number of cards displayed should decrease or increase depending on the screen width using bootstrap.

** BONUS 1 **: Use the Festo LX public search REST API documented below to get real data.

** BONUS 2 **: Display the detailed information of the course (description for example) in a new detail page or a popup from the “Show More” button. (No particular restriction)

### Evaluation criteria

- Code quality (Clean Code).
- Design accuracy.

### Design of the result card

![Design lesson cards](CardsDesign.jpg)

### Search API

The search API is available through the REST API at the following address:

`GET https://lx.festo.com/SearchService/api/search/learning-paths/public`

**Settings :**
- term (string): the searched text (default "")
- page (number): results page (default 1)
- size (number): number of results (default 20)
- sortOrder (number): sort value (MostRelevant default)
    - MostRelevant = 1
    - Popularity = 2
    - MostRecent = 3
    - Oldest = 4

For example :
`https://lx.festo.com/SearchService/api/search/learning-paths/public?term=motor&page=1&size=20&sortOrder=1`

The model corresponding to the return of the web service is already in the project under:
`/src/web-service/models/CourseSearchResultList.ts`

**IMPORTANT: Note that we don't allow `localhost:3000` in the `Access-Control-Allow-Origin` response headers of `lx.festo.com`, so you'll have to bypass the CORS. You can easily deal with this issue by installing a web browser plugin or using a proxy like `https://cors-anywhere.herokuapp.com/`.**
