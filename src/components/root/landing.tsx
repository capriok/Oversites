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
					<p>List the notables.</p>
					<p>This is the hook and should tell a little about the service.</p>
					<p>Continue with question and answer, rhetorical quetion instant answer</p>
					<p>Show why the service has a desired use and bait the user into trying the
						service out by clicking the following button on the page.</p>
					<button>Get Started Now!</button>
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