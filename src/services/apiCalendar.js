import axios from 'axios'

const apiCalendar = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
})

apiCalendar.interceptors.request.use((config) => {
	config.headers = {
		...config.headers,
		'x-token': localStorage.getItem('token'),
	}
	return config
})

export default apiCalendar
