import { convertEventsToDate } from '../helpers/convertEventsToDate'
import calendarApi from './calendarApi'

export const userLogin = async (data: {}) => {
	try {
		const resp = await calendarApi.post('/auth', data)
		localStorage.setItem('token', resp.data.token)
	} catch (error) {
		console.log({ error })
	}
}

export const userRegister = async (data: {}) => {
	try {
		const resp = await calendarApi.post('/auth/new', data)
		localStorage.setItem('token', resp.data.token)
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

export const getEvents = async (state: any) => {
	try {
		const eventsApi = await calendarApi.get('/events')
		await convertEventsToDate(eventsApi.data.events)
		state(eventsApi.data.events)
	} catch (error) {
		console.log('create event error')
	}
}

export const createEvent = async (data: {}) => {
	try {
		await calendarApi.post('/events', data)
	} catch (error) {
		console.log('create event error')
	}
}
