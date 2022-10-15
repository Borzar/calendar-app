import calendarApi from './calendarApi'

export const userLogin = async (data: {} ) => {
	try {
		const resp = await calendarApi.post('/auth', data)
		localStorage.setItem('token', resp.data.token)
		console.log(resp)
		} catch (error) {
		console.log({ error })
	}
}

export const userRegister = async (data: {}) => {
	try {
		const resp = await calendarApi.post('/auth/new', data)
		localStorage.setItem('token', resp.data.token)
		console.log(resp)
	} catch (error) {
		console.log({ error })
	}
}

export const checkAuthToken = async () => {
	const token = localStorage.getItem('token')
	if (!token) return console.log('token expired')
	try {
		const resp = await calendarApi.get('/auth/renew')
		localStorage.setItem('token', resp.data.token)
	} catch (error) {
		localStorage.clear()
		console.log('token expired')
	}
}
