import { AxiosClient } from "./axiosClient";

    export const getComidas = async () => {
        return AxiosClient.get(`/recipes/complexSearch?apiKey=11b3e249617e479cb8b89d102d4959ec`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                throw error;
            });
    }
    export const getComidasBySearch = async (nombre) => {
        return AxiosClient.get(`/recipes/complexSearch?apiKey=11b3e249617e479cb8b89d102d4959ec&query=${nombre}`)
            .then((response) => {
                return response.data.results;
            }).catch((error) => {
                throw error;
            });
    }
    export const getComidasById = async (id) => {
        return AxiosClient.get(`/recipes/${id}/information?apiKey=11b3e249617e479cb8b89d102d4959ec`)
            .then((response) => {
                return response.data.Search;
            }).catch((error) => {
                throw error;
            });
    }
