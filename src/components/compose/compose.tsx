import React, { useState, useRef, FC } from 'react'
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
		private: false,
	})
	const [uploads, setUploads] = useState<File[]>([])
	const filesRef = useRef<any>(null)

	async function FilesToState(e) {
		const files: any = Array.from(e.target.files)

		filesRef.current = []
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
					filesRef.current = [...filesRef.current, file]
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

		formData.append('userId', user.id)

		formData.append('title', form.title)
		formData.append('domain', form.domain)
		formData.append('severity', form.severity)
		formData.append('description', form.description)
		formData.append('category', form.category)
		formData.append('private', form.private.toString())

		filesRef.current.forEach((file) => {
			formData.append('Sights', file)
		})

		for (var pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1])
		}

		const { status, data } = await osApi.PostUserOversite(user.userId, formData)

		console.log({ status });
		console.log({ data });

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
					<Row>
						<RowLabel label="Title" />
						<RowContent>
							<input value={form.title} type="text" onChange={(e) => setForm({ ...form, title: e.target.value })} />
						</RowContent>
					</Row>
					<Row>
						<RowLabel label="Website" />
						<RowContent>
							<input value={form.domain} type="text" onChange={(e) => setForm({ ...form, domain: e.target.value })} />
						</RowContent>
					</Row>
					<Row>
						<RowLabel label="Severity" />
						<RowContent>
							<select value={form.severity} name="Severity" onChange={(e) => setForm({ ...form, severity: e.target.value })}>
								<option value="" style={{ display: 'none' }} />
								<option value="Critical">Critical</option>
								<option value="High">High</option>
								<option value="Moderate">Moderate</option>
								<option value="Low">Low</option>
								<option value="No Effect">No Effect</option>
							</select>
						</RowContent>
					</Row>
					<Row>
						<RowLabel label="Description" />
						<RowContent>
							<textarea
								value={form.description}
								rows={7}
								placeholder="Do your best to explain the problem and include steps to recreate the problem."
								onChange={(e) => setForm({ ...form, description: e.target.value })} />
						</RowContent>
					</Row>
					<Row>
						<RowLabel label="Title" />
						<RowContent>
							<select value={form.category} name="Categories" onChange={(e) => setForm({ ...form, category: e.target.value })}>
								<option value="" style={{ display: 'none' }} />
								<option value="Design Flaw">Design Flaw</option>
								<option value="Authentication">Authentication</option>
								<option value="Functionality">Functionality</option>
								<option value="Compatibility">Compatibility</option>
								<option value="Other">Other</option>
							</select>
						</RowContent>
					</Row>
					<Row>
						<RowLabel label="Private" />
						<RowContent>
							<div className="radio-cont">
								<div className="radio-item">
									<label htmlFor="privacyRadioTrue">Yes</label>
									<input id="privacyRadioTrue"
										type="radio"
										name="privacy"
										checked={form.private}
										onChange={() => setForm({ ...form, private: true })} />
								</div>
								<div className="radio-item">
									<label htmlFor="privacyRadioFalse">No</label>
									<input id="privacyRadioFalse"
										type="radio"
										name="privacy"
										checked={!form.private}
										onChange={() => setForm({ ...form, private: false })} />
								</div>
							</div>
						</RowContent>
					</Row>
					<Row>
						<RowLabel label="Sights" />
						<RowContent>
							<button className="upload-btn"><label htmlFor="fileUpload">Upload Images</label></button>
							<input
								style={{ display: 'none' }}
								id="fileUpload"
								accept="image/jpeg,image/png"
								type="file"
								multiple={true}
								onChange={(e) => FilesToState(e)} />
						</RowContent>
					</Row>
					{uploads.length > 0 &&
						<Row>
							<RowLabel label="Previews" />
							<RowContent>
								<div className="preview-map">
									{uploads.map((file, i) => (
										<div key={i} className="preview-cont">
											<div className="img-cont">
												<img key={i} className="preview-img" src={file.data} alt="" />
											</div>
											<div className="preview-foot">
												<p className="preview-name">{file.name}</p>
												<p className="preview-close">
													<button onClick={() => {
														filesRef.current = filesRef.current.filter((f) => f.name !== file.name)
														setUploads(uploads.filter((u) => u.name !== file.name))
													}}>
														Delete
													</button>
												</p>
											</div>
										</div>
									))}
								</div>
							</RowContent>
						</Row>
					}
					<Row>
						<RowLabel></RowLabel>
						<RowContent>
							<button
								className="submit-btn"
								// disabled={checkForm()}
								onClick={PostOversite}>
								Submit
								</button>
						</RowContent>
					</Row>
				</tbody>
			</table>
		</div >
	)
}

export default Compose

const Row = ({ children }) => (
	<tr>{children}</tr>
)

const RowLabel: FC<{ label?: any }> = ({ label }) => (
	<td><p className="row-label">{label}</p></td>
)

const RowContent = ({ children }) => (
	<td>{children}</td>
)