package com.pedroalmeida.gamebuddy.game;

import com.pedroalmeida.gamebuddy.appuser.AppUser;
import com.pedroalmeida.gamebuddy.gameType.GameType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class GameServiceTest {

    @Mock
    private GameRepository gameRepository;

    @InjectMocks
    private GameService gameService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllGames() {
        // Arrange
        Sort sortByGameId = Sort.by(Sort.Direction.ASC, "gameId");

        List<Game> games = new ArrayList<>();
        when(gameRepository.findAll(sortByGameId)).thenReturn(games);

        // Act
        List<Game> result = gameService.getAllGames();

        // Assert
        assertEquals(games, result);
        verify(gameRepository, times(1)).findAll(sortByGameId);
    }

    @Test
    public void testGetGameById() {
        // Arrange
        Integer gameId = 123;
        Game game = new Game();
        when(gameRepository.findById(gameId)).thenReturn(Optional.of(game));

        // Act
        Optional<Game> result = gameService.getGameById(gameId);

        // Assert
        assertEquals(Optional.of(game), result);
        verify(gameRepository, times(1)).findById(gameId);
    }

    @Test
    public void testCreateGame() {
        // Arrange
        Game game = new Game();
        game.setGameType(GameType.FOOTBALL);
        // Add the AppUser object to the ArrayList
        game.setParticipants(List.of(AppUser.builder()
                .userId(123)
                .name("John Doe")
                .build()));

        game.setGameDateTime(LocalDateTime.now().plusHours(1));

        when(gameRepository.save(game)).thenReturn(game);

        // Act
        Game result = gameService.createGame(game);

        // Assert
        assertEquals(game, result);
        assertEquals(game.getParticipants().size(), game.getNumPlayers());
        verify(gameRepository, times(1)).save(game);
    }

    @Test
    public void testUpdateGame() {
        Game existingGame = new Game();
        existingGame.setGameId(123);
        existingGame.setGameType(GameType.FOOTBALL);

        // Assuming you have a custom method named findByReferenceId
        when(gameRepository.getReferenceById(123)).thenReturn(existingGame);
        when(gameRepository.save(existingGame)).thenReturn(existingGame);

        Game updatedGame = new Game();
        updatedGame.setGameId(123);
        updatedGame.setGameType(GameType.PADEL);

        Game result = gameService.updateGame(updatedGame);

        verify(gameRepository).save(existingGame);
        assertEquals(existingGame, result);
    }


    @Test
    public void testDeleteGame() {
        // Arrange
        Integer gameId = 123;

        // Act
        gameService.deleteGame(gameId);

        // Assert
        verify(gameRepository, times(1)).deleteById(gameId);
    }
}
