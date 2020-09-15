package io.github.douglasantunes.dspesquisa.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.douglasantunes.dspesquisa.dto.GameDTO;
import io.github.douglasantunes.dspesquisa.entities.Game;
import io.github.douglasantunes.dspesquisa.repositories.GameRepository;

@Service
public class GameService {
	@Autowired
	private GameRepository gameRepository;
	
	@Transactional(readOnly = true)
	public List<GameDTO> findAll() {
		List<Game> list = gameRepository.findAll();
		return list.stream()
				.map(x -> new GameDTO(x))
				.collect(Collectors.toList());
	}
}
