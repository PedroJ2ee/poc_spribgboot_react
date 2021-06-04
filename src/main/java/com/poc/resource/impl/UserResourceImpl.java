package com.poc.resource.impl;

import java.util.ArrayList;
import java.util.List;
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

import com.poc.domain.Role;
import com.poc.domain.User;
import com.poc.resource.Resource;
import com.poc.service.IPageService;
import com.poc.service.IService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="http://localhost:3000")
public class UserResourceImpl implements Resource<User> {
	
	@Autowired
	private IService<User> userService;
	
	@Autowired
	private IService<Role> roleService;
	
	@Autowired
	private IPageService<User> userPageService;

	@Override
	public ResponseEntity<Page<User>> findAll(Pageable pageable, String searchText) {
		return new ResponseEntity<>(userPageService.findAll(pageable, searchText), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Page<User>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(userPageService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<User> findById(Long id) {
		return new ResponseEntity<>(userService.findById(id).get(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<User> save(User user) {
		Role comum = roleService.findByName("comum");
		user.setRole(comum);
		return new ResponseEntity<>(userService.saveOrUpdate(user), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<User> update(User user) {
		return new ResponseEntity<>(userService.saveOrUpdate(user), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(userService.deleteById(id), HttpStatus.OK);
	}

	@GetMapping("/roles")
	public  ResponseEntity<Set<String>> findAllRoles() {
		List<String> retorno = new ArrayList<String>();
		for (Role role : roleService.findAll()) {
			retorno.add(role.getName());
		}
		return new ResponseEntity<>(new TreeSet<>(retorno), HttpStatus.OK);
    }

}
