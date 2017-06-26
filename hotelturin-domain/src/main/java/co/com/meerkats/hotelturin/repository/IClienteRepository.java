package co.com.meerkats.hotelturin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.cdi.Eager;

import co.com.meerkats.hotelturin.domain.Cliente;
import co.com.meerkats.hotelturin.domain.ClienteKey;

@Eager
public interface IClienteRepository extends JpaRepository<Cliente, ClienteKey> {
	
}
