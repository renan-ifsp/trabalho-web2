import axios from 'axios';


const url_base = "http://localhost:8080/agenda";

class ContatoServices {
    
    getContato(){
        return axios.get(url_base + "/all")
    }

    getContatoById(id){
        return axios.get(url_base + "/locate_contato/" + id);
    }

    createContato(contato){
        return axios.post(url_base + "/add_contato",contato);
    }

    editContato(contato){
        return axios.put(url_base + "/update/" + contato.id_contato,contato);
    }

    deleteContato(id){
        return axios.delete(url_base + "/delete/" + id)
    }
}

export default new ContatoServices();


