package com.pedroalmeida.gamebuddy.repository;

import com.pedroalmeida.gamebuddy.model.Game;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GameRepository extends CrudRepository<Game, Long> {

}