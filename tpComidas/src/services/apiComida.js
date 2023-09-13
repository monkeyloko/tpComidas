import { AxiosClient } from "./axiosClient";

    export const getComidas = async () => {
        return AxiosClient.get(`/recipes/complexSearch?apikey=3e7e61c043be47c599916ac2377b1f4e`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                throw error;
            });
    }
    export const getComidasBySearch = async (nombre) => {
        return AxiosClient.get(`/recipes/complexSearch?apikey=3e7e61c043be47c599916ac2377b1f4e&query=${nombre}`)
            .then((response) => {
                return response.data.Search;
            }).catch((error) => {
                throw error;
            });
    }
    export const getComidasById = async (id) => {
        return AxiosClient.get(`/recipes/${id}/information?apiKey=3e7e61c043be47c599916ac2377b1f4e`)
            .then((response) => {
                return response.data.Search;
            }).catch((error) => {
                throw error;
            });
    }
