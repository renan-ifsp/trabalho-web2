package br.com.agendacontato.AgendaContato;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import br.com.agendacontato.AgendaContato.Contato;

public interface ContatoRepositorio extends CrudRepository<Contato, Integer>{

	List<Contato> findByNome(String Nome);
	List<Contato> findBySobrenome(String Sobrenome);
	
}
