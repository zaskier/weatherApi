# Description of weatherApi
It collects data and allow to alter result for extending API data through HTTP endpoint. Application is fetching data from [Weather API](http://api.openweathermap.org/data/2.5/weather).  with new data format which is saved in MongoDB. It allows to alter record after "Post" for adding new waether Stations for loacation &amp; and alter parameters like new weather from different weather station for specified location every entry requires userID, pigeon population and location.
- app can work locally or be hosted on Cloud Services
- application works with CRUD operations using MongoDB
- application is formated wit ESLint
# Assummption of Initial state of working application

- authentication is not provided for this state(usually i would do it for App Engine with Identity Aware Proxy(GCP) on AWS i would try beyondcorp)
- API is on free version it can be replaced in config json file "\controllers\weather-api-config.json" for every instance it is hosted.
- for Reuest of body assumptions Weather data is simple(it could be expanded if required) "weatherStationID" parameter is not required for weather entry. 
- If featched weather API would not workproperly new entry cannot be created. 
- "location" parameter needs to be the format as in the API [Weather API](http://api.openweathermap.org/data/2.5/weather). It could be improved by NLP transaltion if it would be required from other backend team. Polish or any other couyntry special sign could be aded for request if needed.
# To run locally aplication:
```
git clone  https://github.com/zaskier/weatherApi.git
⦁ cd weatherAPI
⦁ npm install 
⦁ mongod //this command should be done in another terminal, to add mongod perform this tutorial https://www.youtube.com/watch?v=FwMwO8pXfq0
⦁ node app.js
```
# To run upload on GCP App Engine project commands
```
⦁ git clone  https://github.com/zaskier/weatherApi.git
⦁ cd weatherAPI
⦁ gcloud config set project {project-id}
⦁ gcloud app deploy
```


# TO TEST HTTP CRUD API Actions


  - [POST /weather](#post-weather) - Add new entry 
    - request body
   ```
   {
        "userID": "wojciech.iskierka@protonmail.com",    //required
        "location": "Palo Alto"  //required
		"pigeonPopulationInArea": "225"  //required
   }
   ```
   - example request response 
   ```
    {
        "weather": {
            "shortDescription": "scattered clouds",
            "temperature": "280.06",
            "humidity": "81",
            "pressure": "1025",
            "visibility": "10000",
            "windDeg": "2.06",
            "windSpeed": "0",
            "clouds": "40",
            "matchedLocatioName": "Palo Alto"
        },
        "_id": "5ffb249a05153e51f4c8260d",
		"pigeonPopulationInArea": "225"
        "userID": "wojciech.iskierka@protonmail.com",
        "location": "Palo Alto" 
        "__v": 0
    }
   ```
  - [GET /weather/[userID]](#get-userID) - get's all elements but it can be also filtered by optional URL parameter "userID"
   ## Operation on specified record  {http://localhost:8080}/api/weather/{entryID'} 
  - [GET /weather/[entryID]](#get-entryID) -  gets entry 
  - [PUT /weather/[entryID]](#put-entryID)  - modifies entry
      - request body
  ```
   {
        "userID": "wojciech.iskierka@protonmail.com",    //required
        "location": "Palo Alto"  //required
        "weatherStationID": "EPKK - Cracov-Balice (KRK)",
        "weather": {
                "shortDescription": "scattered clouds",
                "temperature": "280.06",
                "humidity": "81",
                "pressure": "1025",
                "visibility": "10000",
                "windDeg": "2.06",
                "windSpeed": "0",
                "clouds": "40",
                "matchedLocatioName": "Cracov"
            },
		"pigeonPopulationInArea": "225"  //required

   }
   ```
  - [PATCH /weather/[entryID]](#patch-entryID) - modify specified params of body
  - [DELETE /weather/[entryID]](#delete-entryID) - delete record

# TESTS
- example unit tests are made with Mocha and i have commented them on purose.(I'm stil working on them and I will fix upgrade them in the futre)
- Integration Test's are made with Supertest to start them type in terminal
```
"npm test"
```