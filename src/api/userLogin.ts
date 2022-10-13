import calendarApi from './calendarApi'

export const userLogin = async (data: {}) => {
	console.log(data)
	try {
		const resp = await calendarApi.post('/auth', data)
		console.log({ resp })
	} catch (error) {
		console.log({ error })
	}
}
