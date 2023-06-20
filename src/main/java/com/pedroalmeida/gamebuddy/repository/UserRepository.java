package com.pedroalmeida.gamebuddy.repository;

import com.pedroalmeida.gamebuddy.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<AppUser, String> {
}