import { AxiosClient } from "./axiosClient";

    export const getComidas = async () => {
        return AxiosClient.get(`/recipes/complexSearch?apiKey=5c9a5aa2095547059dec4963fcfff3a3`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                throw error;
            });
    }
    export const getComidasBySearch = async (nombre) => {
        return AxiosClient.get(`/recipes/complexSearch?apiKey=5c9a5aa2095547059dec4963fcfff3a3&query=${nombre}`)
            .then((response) => {
                return response.data.results;
            }).catch((error) => {
                throw error;
            });
    }
    export const getComidasById = async (id) => {
        return AxiosClient.get(`/recipes/${id}/information?apiKey=5c9a5aa2095547059dec4963fcfff3a3`)
            .then((response) => {
                return response.data;
            }).catch((error) => {
                throw error;
            });
    }
