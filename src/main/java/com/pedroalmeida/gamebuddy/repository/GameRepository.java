package com.pedroalmeida.gamebuddy.repository;

import com.pedroalmeida.gamebuddy.model.Game;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends CrudRepository<Game, String> {

}