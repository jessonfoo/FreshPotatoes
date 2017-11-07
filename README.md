# <img src="https://potatoes.ahdb.org.uk/sites/default/files/150824_Potato_4PRINT-Kindred-v1-A5%20cropped.jpg" width="40px"> FreshPotatoes.com

## Overview

FreshPotatoes.com is a wiki-based website for films and artists.  

The FreshPotatoes team has defined a RESTful API endpoint they want you to build. The endpoint will allow external partners, like Netflix, to access FreshPotato artist and film data.

In this README, you'll find information about:

* [What to build](#what-to-build)
  * [API Specifications](#api-specifications)
* [Technologies to use](#freshpotatoes-technologies)
* [What to turn in](#what-to-turn-in)
* [How to submit your work](#how-to-submit-your-work)

---

## What To Build

Build a recommendations API endpoint that retrieves top-rated film recommendations.  You have been given a suite of failing tests - make them pass.

#### User Story

*"As a developer, who doesn't work for FreshPotatoes, I want to use the FreshPotatoes API to get a list of recommended films related to one film."*

#### Acceptance Criteria

1) Recommended films must have:
  * The same genre as the parent film
  * A minimum of 5 reviews
  * An average rating greater than 4.0
  * Been released within 15 years, before or after the parent film
  * A sort order based on film id (order by film id)

2) The application should allow developers to:
  * Paginate by offset
  * Limit the number of returned records

3) The application should handle for:
  * Client/server failure
  * Missing routes

---

## API Specifications

##### List Recommendations

Returns a list of top-rated, recommended films related to the matched film.

```

GET /films/:film_id/recommendations

```

**Parameters**

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td>limit</td>
    <td>integer</td>
    <td>(optional)
The desired number of results returned.</td>
    <td>10</td>
  </tr>
  <tr>
    <td>offset</td>
    <td>integer</td>
    <td>(optional)
Specifies the first entry to be returned from the collection.
    <td>1</td>
  </tr>
</table>


**Successful Response**

```
{
  "recommendations" : [
    {
      "id": 109,
      "title": "Reservoir Dogs",
      "releaseDate": "09-02-1992",
      "genre": "Action",
      "averageRating": 4.2,
      "reviews": 202
    },
    {
      "id": 102,
      "title": "Jackie Brown",
      "releaseDate": "09-15-1997",
      "genre": "Action",
      "averageRating": 4.1,
      "reviews": 404
    },
    {
      "id": 85,
      "title": "True Romance",
      "releaseDate": "09-25-1993",
      "genre": "Action",
      "averageRating": 4.0,
      "reviews": 165098
    }
  ],
  "meta": {
    "limit": 10,
    "offset": 0
  }
}

```

**Failure Response** - Use the test suite for guidance on specific error messages.

```
{
  "message" : "Return an explicit error here"
}
```

---

## FreshPotatoes Technologies

#### Codebase

The FreshPotatoes API service will be separate from their customer-facing web application.  In this repo, you'll find the code that will power their API: starter code and tests built with Node, Express, Mocha, SQLite, and Sequelize.

* Once you’ve cloned, install the node modules: `$ npm install`
* Then, run your application:  `$ npm start`
* To run integration tests, run: `$ npm test`

#### Database

The database schema is also provided via entity-relationship diagram. To interact with the database: `$ sqlite3 db/database.db`.

<p align="center">
  <img src="https://i.imgur.com/eAuzbPZ.png">
</p>


#### Third-Party API

The FreshPotatoes database has been developed using film data from a third-party service where fans can write reviews about their favorite movies.  

As part of this project, you must use this API to access film review data.  The third-party API is documented [here](third-party-api.md).

#### Relevant Documentation

* [Node.js v6](https://nodejs.org/dist/latest-v6.x/docs/api/)
* [ExpressJS API](http://expressjs.com/en/4x/api.html)
* [SQLite](https://www.sqlite.org/docs.html)
* [NPM sqlite package](https://www.npmjs.com/package/sqlite)
* [Sequelize](http://docs.sequelizejs.com/en/v3/)
* [Request docs](https://github.com/request/request)
* [Third-Party API](third-party-api.md)

---

## What To Turn In

The FreshPotatoes tech team will look for:

* **A git repository** - Once you've downloaded the codebase, initiate a git repository.  As you work, make logical, frequent commits and descriptive commit messages.

* **Production-level code**. - As you implement your solution, think about maintainability, extensibility, security, and performance.

* **Consistent code**. To the best of your abilities, adhere to the [styleguide](styleguide.md) provided.

---

## How To Submit Your Work

Create a public Dropbox or Google Drive folder with your work and email the folder URL to
<a href="mailto:credentials@ga.co">credentials@ga.co</a>.  In the subject line, include your name and the company's name, if applicable.

---

#### Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
