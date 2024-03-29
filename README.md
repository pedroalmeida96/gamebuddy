# Welcome to GameBuddy: Your Sports Matchmaking Platform
## What is GameBuddy?

**GameBuddy** is a platform that brings individuals together  in order to find sports partners. Whether you're a football player seeking teammates for a casual game, a tennis enthusiast in search of opponents for a match, or even someone looking for a gym partner, GameBuddy has got you covered.

## Technologies used
Java, Spring Boot, React, React Bootstrap, gradle, Docker, git, Hibernate, JPA, Postgresql, JUnit, GitHub Actions

## How It Works
1) **Sign Up**
2) **Find Matches**: Browse through matches or create your own match, specifying the sport, location, date, and number of players needed.
3) **Build Teams**: Form teams for your matches based on the number of players required. You can even find last-minute replacements if needed.
4) **Connect and Play**

## Print screens
### Login and registration
<div style="text-align: center;">
    <img src="src/main/resources/printscreens/gamebuddy2.png" alt="Registration">
    <img src="src/main/resources/printscreens/gamebuddy1.png" alt="Login">
</div>

### Game creation
The game creation process is a fundamental aspect of our application. Users can effortlessly create new games by providing essential information and settings. The interface is designed for simplicity and clarity, ensuring users can intuitively configure their games.
<div style="text-align: center;">
    <img src="src/main/resources/printscreens/gamebuddy3.png" alt="Game Creation">
</div>

### Listing of Games Created
Once a game is successfully created, users are presented with a confirmation screen. This screen summarizes the game's details and provides options for further actions, such as sharing the game link or editing its settings.
<div style="text-align: center;">
    <img src="src/main/resources/printscreens/gamebuddy4.png" alt="Game Creation">
</div>

### Edit Game Details
The ability to edit game details is a crucial feature. Users can easily access and modify various aspects of their games, such as the title, description, rules, and cover image. The editing interface is user-friendly and allows for seamless updates.
<div style="text-align: center;">
    <img src="src/main/resources/printscreens/Screenshot_6.png" alt="Game edition">
    <img src="src/main/resources/printscreens/Screenshot_7.png" alt="Game edited">
</div>

These screenshots showcase some of the project core features (front-end and backend-end). To fully appreciate the application's functionality, I encourage you to run the project locally and test it.

## Getting Started

### Pre-requisites
Make sure you have the following software installed:

[Docker](URL)


### Setup
```bat
git clone https://github.com/pedroalmeida96/gamebuddy
cd gamebuddy
docker-compose pull
docker-compose up -d
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)
```