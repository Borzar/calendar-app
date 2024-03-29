import { convertEventsToDate } from '../helpers/convertEventsToDate'
import apiCalendar from './apiCalendar'

export const getNameUser = async (state: any) => {
	try {
		const response = await apiCalendar.get('/auth/renew')
		state(response.data.name)
	} catch (error) {
		console.log(error)
	}
}

export const userLogin = async (data: {}) => {
	try {
		const resp = await apiCalendar.post('/auth', data)
		localStorage.setItem('token', resp.data.token)
	} catch (error) {
		console.log({ error })
	}
}

export const userRegister = async (data: {}) => {
	try {
		const resp = await apiCalendar.post('/auth/new', data)
		localStorage.setItem('token', resp.data.token)
	} catch (error) {
		console.log({ error })
	}
}

export const checkAuthToken = async () => {
	const token = localStorage.getItem('token')
	if (!token) return console.log('token expired')
	try {
		const resp = await apiCalendar.get('/auth/renew')
		localStorage.setItem('token', resp.data.token)
	} catch (error) {
		localStorage.clear()
		console.log('token expired')
	}
}

export const getApiEvents = async (state: any) => {
	try {
		const eventsApi = await apiCalendar.get('/events')
		await convertEventsToDate(eventsApi.data.events)
		state(eventsApi.data.events)
	} catch (error) {
		console.log('get event error')
	}
}

export const updateApiEvent = async (id: string, data: {}) => {
	try {
		await apiCalendar.put(`/events/${id}`, data)
	} catch (error) {
		console.log('update event error')
	}
}

export const deleteApiEvent = async (id: string) => {
	try {
		await apiCalendar.delete(`/events/${id}`)
	} catch (error) {
		console.log('delete event error')
	}
}

export const createApiEvent = async (data: {}) => {
	try {
		await apiCalendar.post('/events', data)
	} catch (error) {
		console.log('create event error')
	}
}
