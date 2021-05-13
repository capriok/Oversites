import axios from 'axios'

const Log = (msg: string, data: any = '') => console.log(`%c${msg}`, 'color: crimson; font-weight: bold;', data);

const baseInstanceParams = {
	baseURL: process.env.REACT_APP_ENDPOINT,
	withCredentials: true,
	timeout: 5000
}

const AxiosGeneralInstance = axios.create({
	...baseInstanceParams,
	headers: {
		'Content-Type': 'application/json'
	},
})

const AxiosFormInstance = axios.create({
	...baseInstanceParams,
	headers: {
		'Content-Type': "multipart/form-data; boundary=" + Math.random().toString().substr(2)
	},
})

export {
	AxiosGeneralInstance,
	AxiosFormInstance,
	Log
}
