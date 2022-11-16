import React from 'react'

function App() {
	const [data, setData] = React.useState()
	const [formData, setFormData] = React.useState({})
	const [options, setOptions] = React.useState([])

	const [networkIndicator, setNetworkIndicator] = React.useState()

	const url = dwe_ajax.apiurl

	React.useEffect(() => {
		fetch(`${url}/settings`)
			.then((response) => response.json())
			.then((response) => {
				const data = response.data

				data.settings = JSON.parse(data.settings)
				const newFormData = {}
				Object.keys(data.post_types).forEach((key) => {
					newFormData[key] = data.settings[key] ? data.settings[key] : -1
				})
				setFormData(newFormData)

				var newOptions = []
				data.templates.forEach((t) => {
					newOptions.push({ value: t.ID, label: t.post_title })
				})
				newOptions.push({ value: -1, label: 'Default' })
				setOptions(newOptions)

				setData(data)
			})
			.catch((error) => console.error(error))
	}, [])

	React.useEffect(() => {
		console.log(options)
	}, [options])

	React.useEffect(() => {
		setTimeout(() => {
			setNetworkIndicator(null)
		}, 2000)
	}, [networkIndicator])

	const handleChange = (evt) => {
		const value = parseInt(evt.target.value)
		setFormData({
			...formData,
			[evt.target.name]: value,
		})
	}

	const handleSubmit = (evt) => {
		fetch(`${url}/settings`, {
			method: 'POST',
			body: JSON.stringify(formData),
		})
			.then(() => {
				setNetworkIndicator('#63ff82')
			})
			.catch((error) => {
				console.error(error)
				setNetworkIndicator('#ff6363')
			})
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'white',
				padding: 40,
			}}
		>
			<h1 style={{ marginBottom: 50 }} align='center'>
				DeadWaves Elementor Template Settings
			</h1>

			{data &&
				Object.keys(data.post_types).map((label) => {
					return (
						<div key={label}>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									width: 400,
									marginBottom: 10,
								}}
							>
								<p>{label}</p>
								<select value={formData[label]} onChange={handleChange}>
									{options &&
										options.map((o) => {
											return <option value={o.value}>{o.label}</option>
										})}
								</select>
							</div>
						</div>
					)
				})}
			<button
				style={{
					width: 400,
					background: networkIndicator ? networkIndicator : 'white',
					padding: 10,
					cursor: 'pointer',
					transitionDuration: '1s',
					border: '1px solid',
					borderRadius: 0,
					marginTop: 50,
					marginBottom: 50,
				}}
				className='components-button is-primary'
				type='button'
				onClick={handleSubmit}
			>
				SAVE
			</button>

			<h1 style={{ marginBottom: 50 }} align='center'>
				Help
			</h1>

			<ol style={{ width: 400 }}>
				<li>
					Create a custom post type.
					<a
						style={{ marginLeft: 10 }}
						href='https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/'
						target='_blank'
					>
						Handbook
					</a>
					<a
						style={{ marginLeft: 10 }}
						href='https://wordpress.org/plugins/custom-post-type-ui/'
						target='_blank'
					>
						Use a plugin
					</a>
				</li>
				<li>
					Create a template for it.
					<a
						style={{ marginLeft: 10 }}
						href={dwe_ajax.home + '/wp-admin/post-new.php?post_type=elementor_library'}
						target='_blank'
					>
						New Template
					</a>
				</li>
				<li>Use any shortcode in your template referencing, post title, etc.</li>
				<li>Come back to this page, and set the template for your post type.</li>
				<li>
					Do not forget to press <strong>SAVE</strong> and wait until it turns green.
				</li>
			</ol>

			<p style={{ width: 400 }}>
				<strong>NOTE:</strong> You can <strong>NOT</strong> use custom templates on post types,
				where you would like to use the <i>Elementor</i> page builder.
				<br />
				<br />
				Leave them on the <strong>Default</strong> template setting.
				<br />
				<br />
				Otherwise you will get a{' '}
				<i>
					<strong>"Sorry, the content area was not found in your page.</strong>
					You must call 'the_contenť function in the current template, in order for Elementor to
					work on this page."
				</i>{' '}
				error.
				<br />
				<br />
				If you would like to add any information I recommend to use the{' '}
				<a href='https://wordpress.org/plugins/advanced-custom-fields/' target='_blank'>
					Advanced Custom Fields
				</a>{' '}
				plugin.
				<br />
				<br />
				More information on the Shortcode API:{' '}
				<a href='https://codex.wordpress.org/Shortcode_API' target='_blank'>
					Handbook
				</a>
				<br />
				More information on the ACF Shortcodes:{' '}
				<a href='https://www.advancedcustomfields.com/resources/shortcode/' target='_blank'>
					Handbook
				</a>
			</p>
		</div>
	)
}

export default App
