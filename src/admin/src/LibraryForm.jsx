function LibraryForm({ library, templates, settings, library_type, handleChange }) {
	return (
		<>
			{Object.entries(library[library_type]).map(([key, value]) => {
				return (
					<div key={key}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: 400,
								marginBottom: 10,
							}}
						>
							<p>{value.label}</p>
							<select
								value={settings[library_type][key]}
								name={key}
								onChange={(e) => handleChange(e, library_type)}
							>
								{templates &&
									templates.map((template) => {
										return <option value={template.ID}>{template.post_name}</option>
									})}
							</select>
						</div>
					</div>
				)
			})}
		</>
	)
}

export default LibraryForm
