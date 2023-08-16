package com.pedroalmeida.gamebuddy.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationRepository extends JpaRepository<Usuario, Long> {
    Usuario findByLogin(String login);
}
