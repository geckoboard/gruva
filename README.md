# Gruva

## Setup

This is how to get Gruva running on your machine so that you're able to work on it.

### Clubhouse API key
Before getting started, login to clubhouse to generate an API key. You can do this from your account settings -> API key. Make a note of this token, it's a good idea to store it in your 1password.

### 1. Clone the repo and install node modules
```
git clone git@github.com:geckoboard/keeper.git
cd keeper
yarn
```

### 2. Add the API key to environment variables
Create a new file in the `/server` directory named `.env`. Add the clubhouse API key to this file:
```
CLUBHOUSE_API_KEY=YOUR_API_KEY
```

### 3. Start the keeper server and client
```
cd server && yarn start
```

```
cd client && yarn start
```
