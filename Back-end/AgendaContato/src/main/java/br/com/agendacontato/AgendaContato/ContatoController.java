package br.com.agendacontato.AgendaContato;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/agenda")
@CrossOrigin(origins = "*")
public class ContatoController {

	@Autowired
	private ContatoRepositorio repositorio;
	
	//INSERT
	@PostMapping(path="/add")
	public @ResponseBody String novoContato(
			@RequestParam String nome,
			@RequestParam String sobrenome,
			@RequestParam String telefone,
			@RequestParam String email,
			@RequestParam String site,
			@RequestParam String social) {
		Contato n = new Contato();
		n.setNome(nome);
		n.setSobrenome(sobrenome);
		n.setTelefone(telefone);
		n.setEmail(email);
		n.setSite(site);
		n.setSocial(social);
		repositorio.save(n);
		return "Contato salvo com sucesso";		
	}
	
	//INSERT (Variação)
	@PostMapping(path="/add_contato")
	public @ResponseBody String novoContato2(@RequestBody Contato newContato) {
		repositorio.save(newContato);
		return "Contato inserido com sucesso.";
	}
	
	//SELECT todos
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Contato> retornaTodos(){
		return repositorio.findAll();
	}
	
	//SELECT pelo ID
	@GetMapping(path="/contato")
	public @ResponseBody Optional<Contato> retornaContato(@RequestParam String id){
		return repositorio.findById(Integer.parseInt(id));
	}
	
	//SELECT pelo ID (Variação - mais usada)
	@GetMapping(path="/locate_contato/{id}")
	public @ResponseBody Optional<Contato> retornaContato2(
			@PathVariable(required=true,name="id") Integer id){
		return repositorio.findById(id);
	}
	
	//SELECT pelo Nome
	@GetMapping(path="/locate_by_nome/{Nome}")
	public @ResponseBody List<Contato> locateByNome(
			@PathVariable(required=true,name="Nome") String Nome){
		return repositorio.findByNome(Nome);
	}
	
	//SELECT pelo Sobrenome
	@GetMapping(path="/locate_by_sobrenome/{Sobrenome}")
	public @ResponseBody List<Contato> locateBySobrenome(
			@PathVariable(required=true,name="Sobrenome") String Sobrenome){
		return repositorio.findBySobrenome(Sobrenome);
	}
			
	//DELETE
	@DeleteMapping(path="/delete/{id}")
	public @ResponseBody String deleteContato(
			@PathVariable(required=true,name="id") Integer id) {
		Optional<Contato> contato = repositorio.findById(id);
		if (contato.isPresent()) {
			repositorio.delete(contato.get());
			return "Contato deletado com sucesso.";
		}
		return "Contato não encontrado.";
	}
	
	//UPDATE
	@PutMapping(path="/update/{id}")
	public @ResponseBody Optional<Contato> updateContato(
			@PathVariable(required=true,name="id") Integer id,
			@RequestBody Contato contato){
		Optional<Contato> c = repositorio.findById(id);
		if (c.isPresent()) {
			c.get().setNome(contato.getNome());
			c.get().setSobrenome(contato.getSobrenome());
			c.get().setEmail(contato.getEmail());
			c.get().setTelefone(contato.getTelefone());
			c.get().setSite(contato.getSite());
			c.get().setSocial(contato.getSocial());
			repositorio.save(c.get());
			return c;
		}
		return null;
	}	
	
}
