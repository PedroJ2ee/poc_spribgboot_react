package com.poc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.poc.domain.Cliente;
import com.poc.domain.Role;
import com.poc.domain.User;
import com.poc.service.IService;

@SpringBootApplication
public class Application implements CommandLineRunner {
	@Autowired
	private IService<User> userService;
	
	@Autowired
	private IService<Role> roleService;

	@Autowired
	private IService<Cliente> clienteService;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if(roleService.findAll().isEmpty()) {
			roleService.saveOrUpdate(new Role("admin"));
			roleService.saveOrUpdate(new Role("comum"));
		}
		
		if(userService.findAll().isEmpty()) {
			User user1 = new User();
			user1.setEmail("test@comum.com");
			user1.setName("Comum");
			user1.setMobile("9787456545");
			user1.setRole(roleService.findByName("comum"));
			user1.setPassword(new BCryptPasswordEncoder().encode("123456"));
			userService.saveOrUpdate(user1);
			
			User user2 = new User();
			user2.setEmail("test@admin.com");
			user2.setName("Admin");
			user2.setMobile("9787456545");
			user2.setRole(roleService.findByName("admin"));
			user2.setPassword(new BCryptPasswordEncoder().encode("123456"));
			userService.saveOrUpdate(user2);
		}
		
		if (clienteService.findAll().isEmpty()) {
			for (int i = 1; i <= 3; i++) {
				Cliente cliente = new Cliente();
				cliente.setNome("Cliente " + i);
				cliente.setCpf("321.654.1" + i);
				cliente.setTelefone("33214-321"+i);
				cliente.setEmail("cliente"+i+"@email.com");
				clienteService.saveOrUpdate(cliente);
			}
		}
	}

}
