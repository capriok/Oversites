import React from 'react'

interface Props {
	oversites: Oversite[]
}

const Browse: React.FC<Props> = ({ oversites }) => {

	function bufferToBase64(buffer: object | any) {
		return btoa(
			buffer.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
		)
	}
	return (
		<>
			<h1>Os mapping test</h1>
			<div>
				{oversites.length > 0 &&
					oversites.map((os: Oversite) => (
						<>
							<p>{os.title}</p>
							<p>{os.description}</p>
							{os.screenshots.length > 0
								? os.screenshots.map((buffer) => {
									return <img style={{ width: '500px', margin: '0 auto' }}
										src={'data:image/jpg;base64,' + bufferToBase64(buffer)} alt="" />
								})
								: <p>No screenshots.</p>
							}
						</>
					))
				}
			</div>
		</>
	)
}

export default Browse