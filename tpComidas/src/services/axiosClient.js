import axios from 'axios'

export const AxiosClient = axios.create({
    baseURL: 'https://api.spoonacular.com'
})

export const Login = axios.create({
    baseURL: 'http://challenge-react.alkemy.org/'

})