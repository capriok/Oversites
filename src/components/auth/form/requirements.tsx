import React from 'react'
import 'styles/auth/auth-reqs.scss'

interface Props {
	username: string
	password: string
}

const FormRequirements: React.FC<Props> = ({ username, password }) => {

	function usernameCheck() {
		const AtoZ = new RegExp(/^[0-9a-zA-Z]+$/)
		const onlyAtoZ = AtoZ.test(username)

		return username.length >= 3 && onlyAtoZ
			? ' label-check-show'
			: ''
	}

	function passwordeCheck() {
		return password.length >= 3
			? ' label-check-show'
			: ''
	}

	return (
		<>
			<div className="requirements">
				<h3>Requirements</h3>
				<div className="req-label">
					<p>Username</p>
					<span id="usernameCheck" className={'label-check' + usernameCheck()}>&#x2714;</span>
				</div>
				<ul>
					<li>3 Charatcer Minimum</li>
					<li>a-z, A-Z, 0-9 only</li>
				</ul>
				<div className="req-label">
					<p>Password</p>
					<span id="passwordCheck" className={'label-check' + passwordeCheck()}>&#x2714;</span>
				</div>
				<ul>
					<li>3 Charatcer Minimum</li>
				</ul>
			</div>
		</>
	)
}

export default FormRequirements