package com.pedroalmeida.gamebuddy.appuser;

import com.pedroalmeida.gamebuddy.appuser.*;
import com.pedroalmeida.gamebuddy.appuser.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AppUserDTOMapper appUserDTOMapper;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllUsers() {
        // Arrange
        List<AppUser> mockUserList = Arrays.asList(
                new AppUser("1", "John"),
                new AppUser("2", "Alice"));

        when(userRepository.findAll()).thenReturn(mockUserList);

        when(appUserDTOMapper.apply(mockUserList.get(0)))
                .thenReturn(AppUserDTO.builder().userId("1").name("John").build());
        when(appUserDTOMapper.apply(mockUserList.get(1)))
                .thenReturn(AppUserDTO.builder().userId("2").name("Alice").build());

        // Act
        List<AppUserDTO> result = userService.getAllUsers();

        // Assert
        assertEquals(2, result.size());
        assertEquals("John", result.get(0).getName());
        assertEquals("Alice", result.get(1).getName());
    }

    @Test
    public void testGetAppUser(){
        String userId = "1";
        String userName = "John";
        AppUser mockUser = new AppUser(userId, userName);
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));
        when(appUserDTOMapper.apply(mockUser)).thenReturn(AppUserDTO.builder().userId(userId).name(userName).build());

        AppUserDTO result = userService.getAppUser(userId);
        assertEquals(userId, result.getUserId());
        assertEquals(userName, result.getName());
    }

    @Test
    public void testGetAppUser_withInvalidId() {
        // Arrange
        String invalidId = "invalid";
        when(userRepository.findById(invalidId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> userService.getAppUser(invalidId));
    }

    @Test
    public void testAddAppUser() {
        var newUser = AppUser.builder().userId("1").name("John").build();
        when(userRepository.save(newUser)).thenReturn(newUser);

        var result = userService.addUser(newUser);

        assertNotNull(result);
        assertEquals(newUser.getUserId(), result.getUserId());
        assertEquals(newUser.getName(), result.getName());
    }
}
