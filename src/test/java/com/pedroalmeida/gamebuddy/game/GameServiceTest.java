package com.pedroalmeida.gamebuddy.game;

import com.pedroalmeida.gamebuddy.appuser.AppUser;
import com.pedroalmeida.gamebuddy.gameType.GameType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class GameServiceTest {

    @Mock
    private PlayersValidator playerValidator;

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
        List<Game> games = new ArrayList<>();
        when(gameRepository.findAll()).thenReturn(games);

        // Act
        List<Game> result = gameService.getAllGames();

        // Assert
        assertEquals(games, result);
        verify(gameRepository, times(1)).findAll();
    }

    @Test
    public void testGetGameById() {
        // Arrange
        String gameId = "123";
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

        // Add the AppUser object to the ArrayList
        game.setParticipants(List.of(AppUser.builder()
                .userId("123")
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
        String gameId = "123";
        AppUser john = AppUser.builder().userId("123").name("John").build();
        AppUser alice = AppUser.builder().userId("234").name("Alice").build();

        Game existingGame = new Game();
        existingGame.setGameId(gameId);
        existingGame.setParticipants(List.of(john));
        existingGame.setGameType(GameType.FOOTBALL);
        existingGame.setLocation("Location");

        Game updatedGame = new Game();
        updatedGame.setGameId(gameId);
        updatedGame.setParticipants(List.of(john, alice));
        updatedGame.setGameType(GameType.FOOTBALL);
        updatedGame.setLocation("New Location");

        when(gameRepository.findById(gameId)).thenReturn(Optional.of(existingGame));
        when(playerValidator.handlePlayers(updatedGame, existingGame)).thenReturn(updatedGame);
        when(gameRepository.save(updatedGame)).thenReturn(updatedGame);

        // Act
        Game result = gameService.updateGame(updatedGame);

        // Assert
        assertNotNull(result);
        assertEquals(updatedGame, result);
        assertEquals(updatedGame.getGameType(), result.getGameType());
        assertEquals(updatedGame.getLocation(), result.getLocation());
        verify(gameRepository, times(1)).findById(gameId);
        verify(gameRepository, times(1)).save(updatedGame);
        verify(playerValidator, times(1)).handlePlayers(updatedGame, existingGame);
    }

    @Test
    public void testDeleteGame() {
        // Arrange
        String gameId = "123";

        // Act
        gameService.deleteGame(gameId);

        // Assert
        verify(gameRepository, times(1)).deleteById(gameId);
    }
}
