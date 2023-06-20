package com.pedroalmeida.gamebuddy.repository;

import com.pedroalmeida.gamebuddy.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {

}