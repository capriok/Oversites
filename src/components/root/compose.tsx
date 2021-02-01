import React, { useState, useEffect, useRef } from 'react'

interface Props {

}

const Compose: React.FC<Props> = ({ }) => {
	const [currFile, setCurr] = useState<any>({})
	const fileRef = useRef<any>(null)


	async function ssToState(e) {
		let reader = new FileReader();
		const file = e.target.files[0];
		if (file) {
			reader.onloadend = () => {
				setCurr(reader.result)
			};
			fileRef.current = file
			reader.readAsDataURL(file)
		}
	}

	function ssUpload() {
		let formData = new FormData();
		formData.append('uid', '17');
		formData.append('ss', fileRef.current);
		fetch(process.env.REACT_APP_ENDPOINT + '/oversite' || '',
			{
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		).then(() => {
			setCurr({})
		}).catch(err => console.log(err))
	}

	return (
		<>
			<h1>Os upload test</h1>
			<table>
				<tr>
					<td>Website</td>
					<td><input type="text" /></td>
				</tr>
				<tr>
					<td>Title</td>
					<td><input type="text" /></td>
				</tr>
				<tr>
					<td>Description</td>
					<td><input type="text" /></td>
				</tr>
				<tr>
					<td>Category</td>
					<td>
						<select name="Categories" id="">
							<option value="" style={{ display: 'none' }} ></option>
							<option value="Portfolio">Portfolio</option>
							<option value="E-Commerce">E-Commerce</option>
							<option value="Advertisement">Advertisement</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>
						Screenshots
					</td>
					<td>
						<button><label htmlFor="ssUpload">Upload Image</label></button>
						<input
							style={{ display: 'none' }}
							id="ssUpload"
							accept="image/jpeg, image/png"
							type="file"

							onChange={(e) => ssToState(e)} /></td>
				</tr>
			</table>
			<p>Preview:</p>
			<img src={currFile} alt="" style={{ width: '500px', margin: '0 auto' }} />
			<br />
			<button onClick={() => ssUpload()}>Submit</button>
		</>
	)
}

export default Compose