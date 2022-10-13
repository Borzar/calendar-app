import axios from 'axios'

const calendarApi = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
})

export default calendarApi
