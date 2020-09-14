package io.github.douglasantunes.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.douglasantunes.dspesquisa.entities.Record;

public interface RecordRepository extends JpaRepository<Record, Long> {

}
