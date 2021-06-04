package com.poc.service.impl;

import java.util.Collection;
import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.poc.domain.Cliente;
import com.poc.repository.ClienteRepository;
import com.poc.service.IPageService;
import com.poc.service.IService;

@Service
public class ClienteServiceImpl implements IService<Cliente>, IPageService<Cliente> {

	@Autowired
	private ClienteRepository clienteRepository;
	
	@Override
	public Collection<Cliente> findAll() {
		return (Collection<Cliente>) clienteRepository.findAll();
	}

	@Override
	public Page<Cliente> findAll(Pageable pageable, String searchText) {
		return clienteRepository.findAllClientes(pageable, searchText);
	}

	@Override
	public Page<Cliente> findAll(Pageable pageable) {
		return clienteRepository.findAll(pageable);
	}

	@Override
	public Optional<Cliente> findById(Long id) {
		return clienteRepository.findById(id);
	}

	@Override
	public Cliente saveOrUpdate(Cliente cliente) {
		return clienteRepository.save(cliente);
	}

	@Override
	public String deleteById(Long id) {
		JSONObject jsonObject = new JSONObject();
		try {
			clienteRepository.deleteById(id);
			jsonObject.put("message", "Book deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

	@Override
	public Cliente findByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

}
