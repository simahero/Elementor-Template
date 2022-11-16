import React from 'react'
import Help from './Help'

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
		console.log('triggered')
		console.log(evt)
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
			<img src={dwe_ajax.logourl} style={{ width: 150 }} />
			<h1 style={{ marginBottom: 50, lineHeight: '30px' }} align='center'>
				DeadWaves <br /> Elementor Template Settings
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
								<select value={formData[label]} name={label} onChange={(e) => handleChange(e)}>
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
			<Help />
		</div>
	)
}

export default App
