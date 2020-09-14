package io.github.douglasantunes.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.douglasantunes.dspesquisa.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {

}
