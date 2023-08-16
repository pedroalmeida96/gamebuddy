package com.pedroalmeida.gamebuddy.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationRepository extends JpaRepository<AuthUser, Long> {
    AuthUser findByUsername(String username);
}
