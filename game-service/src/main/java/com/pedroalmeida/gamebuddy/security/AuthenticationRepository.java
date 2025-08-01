package com.pedroalmeida.gamebuddy.security;

import com.pedroalmeida.gamebuddy.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
