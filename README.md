# Welcome to GameBuddy: Your Sports Matchmaking Platform
Are you passionate about sports but struggle to find enough players to form a team or find opponents for a friendly match? Look no further! Welcome to **GameBuddy**, the ultimate sports matchmaking platform designed to help sports enthusiasts like you connect, form teams, and enjoy exciting matches together.

## What is GameBuddy?

**GameBuddy** is a platform that brings together individuals with a shared love for sports. Whether you're a football player seeking teammates for a casual game, a tennis enthusiast in search of opponents for a match, or even someone looking to join a game of basketball at a local court, GameBuddy has got you covered.

## Key Features

**Matchmaking Made Easy**: Say goodbye to the frustration of not having enough players for your game. With GameBuddy, you can quickly find others who share your interest and are eager to join you on the field or court.

**Team Formation**: Need a couple more players to complete your soccer team? Want to organize a doubles match in tennis? GameBuddy allows you to easily form teams and enjoy sports at your convenience.

**Flexibility**: Don't worry if you have a fluctuating number of players. GameBuddy is perfect for scenarios where you have a few players and need to find others to complete the lineup.

## How It Works

1) **Sign Up**: Create your GameBuddy account and tell us about your favorite sports and availability.
2) **Find Matches**: Browse through upcoming matches in your area or create your own match, specifying the sport, location, date, and number of players needed.
3) **Build Teams**: Easily form teams for your matches based on the number of players required. You can even find last-minute replacements if needed.
4) **Connect and Play**: Meet fellow sports enthusiasts, enjoy friendly competition, and have a blast playing the sports you love.

Whether you're an individual looking to join a game or a team captain seeking players, GameBuddy is your go-to platform for connecting with like-minded sports aficionados. Get ready to experience the joy of playing your favorite sports whenever you want, with whoever shares your passion. Join GameBuddy today and elevate your sports experience like never before!

## Print screens
Welcome to the frontend part of this project! Here, we've compiled a series of screenshots that offer an overview of the user interface and the features we've implemented in the application. These images provide a visual representation of the user experience and design aspects of our project.
Please keep in mind that while these screenshots provide a preview of the frontend design and functionalities, the true interactive experience can only be fully grasped by running the application.

### Game creation
The game creation process is a fundamental aspect of our application. Users can effortlessly create new games by providing essential information and settings. The interface is designed for simplicity and clarity, ensuring users can intuitively configure their games.
<div style="text-align: center;">
    <img src="src/main/resources/printscreens/creation2.png" alt="Game Creation">
    <img src="src/main/resources/printscreens/creation.png" alt="Game Creation">
</div>


### Listing of Games Created
Once a game is successfully created, users are presented with a confirmation screen. This screen summarizes the game's details and provides options for further actions, such as sharing the game link or editing its settings.
<div style="text-align: center;">
    <img src="src/main/resources/printscreens/created.png" alt="Games list">
</div>


### Show Game Details
Specific game details section gives users an overview of specific game they have created.
<div style="text-align: center;">
    <img src="src/main/resources/printscreens/details.png" alt="Game details">
</div>


### Edit Game Details
The ability to edit game details is a crucial feature. Users can easily access and modify various aspects of their games, such as the title, description, rules, and cover image. The editing interface is user-friendly and allows for seamless updates.
<div style="text-align: center;">
    <img src="src/main/resources/printscreens/edit.png" alt="Game edition">
</div>


These screenshots showcase some of the core features of the application (Frontend and Backend) project's. To fully appreciate the application's functionality, aesthetics, and user experience, we encourage you to either run the project locally for now.

## Getting Started
To start using the GameBuddy application, you'll need a few prerequisites installed on your system. Here's a step-by-step guide on how to set up the environment and launch the application.

### Prerequisites
Make sure you have the following software installed:


[Flutter](URL)

[IntelliJ IDEA](URL)

[Docker](URL)


### Backend Setup
```bat
git clone https://github.com/pedroalmeida96/gamebuddy
cd gamebuddy
docker-compose pull
docker-compose up -d
Start the springboot application locally
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)
```

### Frontend Setup
```bat
git clone https://github.com/pedroalmeida96/gamebuddy-flutter
cd gamebuddy-flutter
flutter run
```