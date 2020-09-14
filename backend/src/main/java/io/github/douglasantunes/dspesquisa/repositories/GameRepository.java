package io.github.douglasantunes.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.douglasantunes.dspesquisa.entities.Game;

public interface GameRepository extends JpaRepository<Game, Long> {

}
