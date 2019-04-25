# Bowling Statistics Web Application ~ Backend

## Setup Development Environment

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm start
```

Starts and opens nodemon server on localhost port 3001

## Endpoints

[Games](#Games)

[Users](#Users)

## Games

### GET all Games ~ /games/

Returns List of JSON object games

```JSON
{
"games": [
    {
        "_id": "5c7c309b0e03b72918611fae",
        "playerId": "tdmiller7@bsu.edu",
        "score": 145,
        "date": "2019-04-20"
    },
    {
        "_id": "5cb2c9fed0a7dc4b80275418",
        "playerId": "tdmiller@tuckermillerdev.com",
        "score": 150,
        "date": "2019-03-22"
    }]
}
```

### GET Games from Player ~ /games/find?id={ playerId }

```JSON
{
"games": [
    {
        "_id": "5cb3631f0d9af10024d23ab5",
        "playerId": "tuckerdanielmiller@gmail.com",
        "score": 134,
        "date": "2017-09-22T16:00:00.000Z"
    },
    {
        "_id": "5cb363250d9af10024d23ab6",
        "playerId": "tuckerdanielmiller@gmail.com",
        "score": 111,
        "date": "2017-09-22T16:00:00.000Z"
    }]
}
```

### Add Game to a Player ~ /games/add

#### Body of Game POST method

```JSON
    {
        "id" : "playerID",
        "score" : 300,
        "date" : "2017-09-22T16:00:00.000Z" or "2019-03-22"
    }
```

After any game is added the updateProfile method calls and updates the users Average and Max

### Delete Game from a Player ~ /games/

#### Body of DELETE method

```JSON
    {
        "id" : "gameUID",
        "playerId" : "playerID"
    }
```

After any game is deleted the updateProfile method calls and updates the users Average and Max

## Users

### GET all Users ~ /users/

Returns List of JSON object users

```JSON
{
"users": [
    {
        "_id": "tuckerdanielmiller@gmail.com",
        "playerName": "Tucker Miller",
        "average": 134,
        "max": 226
    },
    {
        "_id": "mnoonan136@gmail.com",
        "playerName": "Michael Noonan",
        "average": 125,
        "max": 200
    }]
}
```

### GET specific Player/User ~ /users/find?id={ playerId }

```JSON
{
"users": [
    {
        "_id": "tuckerdanielmiller@gmail.com",
        "playerName": "Tucker Miller",
        "average": 134,
        "max": 226
    }]
}
```

### Add a Player ~ /users/add

#### Body of User POST method

```JSON
    {
        "id" : "playerID",
        "name" : "Player Name"
    }
```

Default set Max and Average to 0

### Update a Player ~ /users/update

#### Body of User PUT method

```JSON
    {
        "id" : "playerID",
        "playerName" : "Player Name",
        "max" : 300,
        "average" : 150
    }
```
