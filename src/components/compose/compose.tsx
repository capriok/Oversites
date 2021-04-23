import React, { useState, useRef } from 'react'
import { useGlobalValue } from 'state/global-context/state'
import osApi from 'api/os'

import 'styles/compose/compose.scss'

interface Props {

}

interface File {
	name: string
	data: string
}

const Compose: React.FC<Props> = ({ }) => {
	const [{ user }] = useGlobalValue()

	const [form, setForm] = useState({
		title: "new os 1",
		domain: "local.host",
		severity: "No Effect",
		description: "test test test",
		category: "Functionality",
	})
	const [uploads, setUploads] = useState<File[]>([])
	const filesRef = useRef<any>(null)

	async function FilesToState(e) {
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

	async function PostOversite() {
		let formData = new FormData()

		formData.append('id', user.id)
		formData.append('title', form.title)
		formData.append('domain', form.domain)
		formData.append('severity', form.severity)
		formData.append('category', form.category)
		formData.append('sights', filesRef.current)

		for (var pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1])
		}

		const { status, data } = await osApi.PostUserOversite(user.userId, formData)
	}

	function CheckForm() {
		for (const field in form) {
			if (form['domain'].slice(form['domain'].length - 4) !== '.com') return true
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
						<td><input value={form.title} type="text" onChange={(e) => setForm({ ...form, title: e.target.value })} /></td>
					</tr>
					<tr>
						<td><p className="row-label">Website</p></td>
						<td><input value={form.domain} type="text" onChange={(e) => setForm({ ...form, domain: e.target.value })} /></td>
					</tr>
					<tr>
						<td><p className="row-label">Severity</p></td>
						<td>
							<select value={form.severity} name="Severity" onChange={(e) => setForm({ ...form, severity: e.target.value })}>
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
								value={form.description}
								rows={7}
								placeholder="Do your best to explain the problem and include steps to recreate the problem."
								onChange={(e) => setForm({ ...form, description: e.target.value })} />
						</td>
					</tr>
					<tr>
						<td><p className="row-label">Category</p></td>
						<td>
							<select value={form.category} name="Categories" onChange={(e) => setForm({ ...form, category: e.target.value })}>
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
								onChange={(e) => FilesToState(e)} />
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
								// disabled={checkForm()}
								onClick={PostOversite}>
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