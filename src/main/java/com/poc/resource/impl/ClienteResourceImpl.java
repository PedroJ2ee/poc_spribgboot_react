package com.poc.resource.impl;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poc.domain.Cliente;
import com.poc.resource.Resource;
import com.poc.service.IPageService;
import com.poc.service.IService;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins="http://localhost:3000")
public class ClienteResourceImpl implements Resource<Cliente> {
	
	@Autowired
	private IService<Cliente> clienteService;
	
	@Autowired
	private IPageService<Cliente> clientePageService;

	@Override
	public ResponseEntity<Page<Cliente>> findAll(Pageable pageable, String searchText) {
		return new ResponseEntity<>(clientePageService.findAll(pageable, searchText), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Page<Cliente>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(clientePageService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Cliente> findById(Long id) {
		return new ResponseEntity<>(clienteService.findById(id).get(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Cliente> save(Cliente cliente) {
		return new ResponseEntity<>(clienteService.saveOrUpdate(cliente), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Cliente> update(Cliente cliente) {
		return new ResponseEntity<>(clienteService.saveOrUpdate(cliente), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(clienteService.deleteById(id), HttpStatus.OK);
	}
}
