package com.pedroalmeida.gamebuddy.controller;

import com.pedroalmeida.gamebuddy.model.User;
import com.pedroalmeida.gamebuddy.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getAllStudents() {
        return userService.getAllUsers();
    }

    @PostMapping
    public void addStudent(@Valid @RequestBody User user) {
        userService.addUser(user);
    }
}