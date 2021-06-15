import React from 'react'

import 'styles/root/landing.scss'

import OS_LANDING from 'assets/os-landing.svg'
import OS_NETWORK from 'assets/os-network.svg'

interface Props {

}

const Landing: React.FC<Props> = () => {
	return (
		<div className="landing">
			<div className="head-cont">
				<div className="hook">
					<h1>Welcome</h1>
					<p>Stay up to date on development oversights.</p>
					<p>Think of the time you can save finding bugs?</p>
					<p>Stay focused on the development process by delegating otherwise in house work loads to the best application testers and critiquers there are, the users.</p>
					<button><a href="/login">Get Started Now!</a></button>
				</div>
				<img className="lure" src={OS_LANDING} alt="" />
			</div>
			<div className="body-cont">
				<div className="hook">
					<h1>In a world of interconnectivity...</h1>
					<img className="lure" src={OS_NETWORK} alt="" />
					<p>We can all work together to create a better experience for eachother.</p>
					<p>We aim to acheive many goals on your behalf.</p>
					<p>Success is up to you, we can help you cross the finish line.</p>
				</div>
				<ul className="list">
					<li>Connectivity</li>
					<li>Insights</li>
					<li>Quality Control</li>
					<li>Analytics</li>
					<li>Improvements</li>
				</ul>
			</div>
		</div>
	)
}

export default Landing