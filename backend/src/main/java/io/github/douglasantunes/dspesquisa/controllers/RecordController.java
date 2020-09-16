package io.github.douglasantunes.dspesquisa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.douglasantunes.dspesquisa.dto.RecordDTO;
import io.github.douglasantunes.dspesquisa.dto.RecordInsertDTO;
import io.github.douglasantunes.dspesquisa.services.RecordService;

@RestController
@RequestMapping(value = "/records")
public class RecordController {
	@Autowired
	private RecordService recordService;
	
	@PostMapping
	public ResponseEntity<RecordDTO> insert(@RequestBody RecordInsertDTO dto) {
		RecordDTO newDTO = recordService.insert(dto);
		return ResponseEntity.ok(newDTO);
	}
}
