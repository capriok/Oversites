import React from 'react'
import GoogleLogin from 'react-google-login'

import G_ICON from 'assets/google_icon.png'

interface Props {

}

const GoogleLog: React.FC<Props> = ({ }) => {


	async function gSuccess(res: object): Promise<void> {
		console.log('Success')
		console.log(res)
	}
	async function gFailure(err: object): Promise<void> {
		console.log('Failure')
		console.log(err)
	}


	const gButton = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '10px 20px',
		width: '100%',
		minHeight: '40px',
		img: {
			width: '20px',
			marginRight: '20px',
		}
	}
	return (
		<>
			<p>Sign in with Google (soon)</p>
			{/* <GoogleLogin
				clientId={process.env.REACT_APP_GOOGLECID || ''}
				onSuccess={gSuccess}
				onFailure={gFailure}
				cookiePolicy={'single_host_origin'}
				render={renderProps => (
					<button disabled style={gButton} onClick={renderProps.onClick}>
						<img src={G_ICON} alt="" style={gButton.img} />
								Google Login
					</button>
				)}
			/> */}
			<br />
			<br />
		</>
	)
}


export default GoogleLog