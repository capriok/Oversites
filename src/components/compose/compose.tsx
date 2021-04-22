import React, { useState, useRef } from 'react'

import 'styles/compose/compose.scss'

interface Props {

}

interface File {
	name: string
	data: string
}

const Compose: React.FC<Props> = ({ }) => {
	const [form, setForm] = useState({
		title: "new os 1",
		site: "local.host",
		severity: "No Effect",
		description: "test test test",
		category: "Functionality",
	})
	const [uploads, setUploads] = useState<File[]>([])
	const filesRef = useRef<any>(null)

	async function filesToState(e) {
		const files: any = Array.from(e.target.files)

		if (e.target.files) {
			Promise.all(files.map((file) => {
				return new Promise((resolve, reject) => {
					let reader = new FileReader()
					reader.addEventListener('load', ({ target }) => {
						resolve({
							name: file.name,
							data: target?.result
						})
					})
					reader.addEventListener('error', reject)
					filesRef.current = filesRef.current !== null
						? [...filesRef.current, file]
						: [file]
					reader.readAsDataURL(file)
				})
			}))
				.then((rFiles) => {
					setUploads(rFiles as File[])
				})
		}
	}

	function postOversite() {
		let formData = new FormData()

		formData.append('uid', '17')
		formData.append('title', form.title)
		formData.append('site', form.site)
		formData.append('severity', form.severity)
		formData.append('uploads', filesRef.current)
		formData.append('category', form.category)

		fetch(process.env.REACT_APP_ENDPOINT + '/oversite' || '',
			{
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				body: formData
			}
		).then(() => {
			// setUploads([])
		}).catch(err => console.log(err))
	}

	function checkForm() {
		for (const field in form) {
			if (form['site'].slice(form['site'].length - 4) !== '.com') return true
			if (form[field] === '') return true
		}
	}

	return (
		<div className="compose">
			<h1 className="compose-title">Compose Oversight</h1>
			<table>
				<tbody>
					<tr>
						<td><p className="row-label">Title</p></td>
						<td><input type="text" onChange={(e) => setForm({ ...form, title: e.target.value })} /></td>
					</tr>
					<tr>
						<td><p className="row-label">Website</p></td>
						<td><input type="text" onChange={(e) => setForm({ ...form, site: e.target.value })} /></td>
					</tr>
					<tr>
						<td><p className="row-label">Severity</p></td>
						<td>
							<select name="Severity" onChange={(e) => setForm({ ...form, severity: e.target.value })}>
								<option value="" style={{ display: 'none' }} />
								<option value="Critical">Critical</option>
								<option value="High">High</option>
								<option value="Moderate">Moderate</option>
								<option value="Low">Low</option>
								<option value="No Effect">No Effect</option>
							</select>
						</td>
					</tr>
					<tr>
						<td><p className="row-label">Description</p></td>
						<td>
							<textarea
								rows={7}
								placeholder="Do your best to explain the problem and include steps to recreate the problem."
								onChange={(e) => setForm({ ...form, description: e.target.value })} />
						</td>
					</tr>
					<tr>
						<td><p className="row-label">Category</p></td>
						<td>
							<select name="Categories" onChange={(e) => setForm({ ...form, category: e.target.value })}>
								<option value="" style={{ display: 'none' }} />
								<option value="Design Flaw">Design Flaw</option>
								<option value="Authentication">Authentication</option>
								<option value="Functionality">Functionality</option>
								<option value="Compatibility">Compatibility</option>
								<option value="Other">Other</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							<p className="row-label">Screenshots</p>
						</td>
						<td>
							<button className="upload-btn"><label htmlFor="fileUpload">Upload Images</label></button>
							<input
								style={{ display: 'none' }}
								id="fileUpload"
								accept="image/jpeg,image/png"
								type="file"
								multiple={true}
								onChange={(e) => filesToState(e)} />
						</td>
					</tr>
					{uploads.length > 0 &&
						<tr>
							<td><p className="row-label">Previews:</p></td>
							<td>
								<div className="preview-map">
									{uploads.map((file, i) => (
										<div key={i}>
											<div className="preview-head">
												<p className="preview-name">{file.name}</p>
												<p className="preview-close">
													<button onClick={() => {
														setUploads(uploads.filter((u) => u !== file))
													}}>
														Delete
													</button>
												</p>
											</div>
											<img key={i} className="preview-img" src={file.data} alt="" />
										</div>
									))}
								</div>
							</td>
						</tr>
					}
					<tr>
						<td></td>
						<td>
							<br />
							<button
								className="submit-btn"
								onClick={postOversite}
								disabled={checkForm()}>
								Submit
								</button>
						</td>
					</tr>
				</tbody>
			</table>
			<br />
		</div>
	)
}

export default Compose