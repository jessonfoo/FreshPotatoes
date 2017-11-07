### 3rd Party API Docs

##### List Reviews

Returns a list of all reviews that match films by ids.

```

GET http://credentials-api.generalassemb.ly/4576f55f-c427-4cfc-a11c-5bfe914ca6c1

```

**Parameters**

<table>
  <tr>
    <td>Name</td>
    <td>Type</td>
    <td>Description</td>
    <td>Example query</td>
  </tr>
  <tr>
    <td>films</td>
    <td>array of integers (comma separated)</td>
    <td><strong>(required)</strong> The reviews to return by film_id.</td>
    <td>?films=8</td>
  </tr>
</table>

**Successful Response**


```
[
  {
    "film_id": 8,
    "reviews": [
      {
        "id": 6436,
        "author": "Emely Koepp",
        "content": "Turns in a performance that is unperceiving and abnormal as the forgetful plucky girl.",
        "rating": 3
      },
      {
        "id": 15175,
        "author": "Annetta Schmidt",
        "content": "Turns in a performance that is obscure but boorish as the dynamic oddball.",
        "rating": 3
      },
      {
        "id": 36635,
        "author": "Chanelle Stokes",
        "content": "Comes across as debauched and shamelessly ordinary as the vivacious plucky girl.",
        "rating": 2
      },
      {
        "id": 51111,
        "author": "Lorena Jacobs",
        "content": "Turns in a performance that is delusive but demonic as the wrathful snoop.",
        "rating": 2
      },
      {
        "id": 69726,
        "author": "Ashleigh Hodkiewicz",
        "content": "Comes across as hateful if not fearless as the broad igor.",
        "rating": 3
      },
      {
        "id": 76120,
        "author": "Ignacio Gleichner",
        "content": "Turns in a performance that is impervious if not ludicrous as the ossified toadie.",
        "rating": 1
      },
      {
        "id": 91201,
        "author": "Gennaro Harber",
        "content": "Comes across as senseless and puny as the strange mr fixit.",
        "rating": 3
      }
    ]
  }
]
```
