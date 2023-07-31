package com.pedroalmeida.gamebuddy.game;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameService {
    private final PlayersValidator playerValidator;
    private final GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Optional<Game> getGameById(String gameId) {
        return gameRepository.findById(gameId);
    }

    public Game createGame(Game game) {
        if (game.getParticipants().isEmpty()) {
            throw new IllegalArgumentException("No participants");
        }
        if (game.getGameDateTime().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("The game date time must be in the future.");
        }
        game.setNumPlayers(game.getParticipants().size());
        return gameRepository.save(game);
    }

    public Game updateGame(Game updatedGame) {
        Game oldGame = gameRepository.findById(updatedGame.getGameId())
                .orElseThrow(() -> new IllegalArgumentException("Game not found"));
        updatedGame = playerValidator.handlePlayers(updatedGame, oldGame);
        return gameRepository.save(updatedGame);
    }


    public void deleteGame(String gameId) {
        //notify all players
        gameRepository.deleteById(gameId);
    }
}