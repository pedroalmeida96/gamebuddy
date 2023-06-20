package com.pedroalmeida.gamebuddy.repository;

import com.pedroalmeida.gamebuddy.model.AppUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<AppUser, String> {
}