import axios from "axios";

const toCapitalize = (str) => {
    str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export class PlatoService {

    getPlato() {
        return axios.get("https://whatcanieat-backend.herokuapp.com/api/platos");
    }


    getAllPlatos() {
        return axios.get( 
            "https://whatcanieat-backend.herokuapp.com/api/abm/platos", 
            {
                headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('token') }
            }
        )
    }
    addPlato(nombre, nombreReal, nombreEng, continente, sabor, temperatura) {
        return axios.post(
            "https://whatcanieat-backend.herokuapp.com/api/abm/platos",
            [
                {
                    "nombre": nombre,
                    "nombreReal": nombreReal,
                    "nombreEng": nombreEng,
                    "continente": continente,
                    "sabor": sabor,
                    "temperatura": temperatura
                }
            ],
            {
                headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('token') }
            }
        )
    }
};


