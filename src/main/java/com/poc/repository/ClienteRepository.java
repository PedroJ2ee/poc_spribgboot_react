package com.poc.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poc.domain.Cliente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ClienteRepository extends PagingAndSortingRepository<Cliente, Long> {

    @Query("FROM Cliente b WHERE b.nome LIKE %:searchText% OR b.nome LIKE %:searchText% OR b.cpf LIKE %:searchText% OR b.uf LIKE %:searchText% ORDER BY b.nome ASC")
    Page<Cliente> findAllClientes(Pageable pageable, @Param("searchText") String searchText);
}
