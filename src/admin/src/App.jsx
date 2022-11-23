import React from 'react'
import LibraryForm from './LibraryForm'
import Help from './Help'

function App() {
	const [library, setLibrary] = React.useState()
	const [templates, setTemplates] = React.useState()
	const [settings, setSettings] = React.useState()

	const [networkIndicator, setNetworkIndicator] = React.useState()

	const library_structure = { post_types: {}, taxonomies: {}, pages: {}, archives: {}, other: {} }

	const getLibrary = () => {
		fetch(`${DWE.API_URL}/library`)
			.then((response) => response.json())
			.then((response) => {
				setLibrary(response.data)
			})
			.catch((error) => console.error(error))
	}

	const getTemplates = () => {
		fetch(`${DWE.API_URL}/templates`)
			.then((response) => response.json())
			.then((response) => {
				var template_elements = response.data
				template_elements.push({ ID: -1, post_name: 'Default' })
				setTemplates(template_elements)
			})
			.catch((error) => console.error(error))
	}

	const getSettings = () => {
		if (!library || library.length == 0) return

		fetch(`${DWE.API_URL}/settings`)
			.then((response) => response.json())
			.then((response) => {
				const data = JSON.parse(response.data)
				const newSettings = Object.assign(library_structure, data)
				Object.keys(library).forEach((library_type) => {
					Object.keys(library[library_type]).forEach((key) => {
						newSettings[library_type][key] = newSettings[library_type][key]
							? newSettings[library_type][key]
							: -1
					})
				})
				setSettings(newSettings)
			})
			.catch((error) => console.error(error))
	}

	React.useEffect(() => {
		getLibrary()
		getTemplates()
	}, [])

	React.useEffect(() => {
		getSettings()
	}, [library])

	React.useEffect(() => {
		setTimeout(() => {
			setNetworkIndicator(null)
		}, 2000)
	}, [networkIndicator])

	const handleChange = (evt, library_type) => {
		const value = parseInt(evt.target.value)
		setSettings((settings) => {
			const copy = Object.assign(library_structure, settings)
			copy[library_type][evt.target.name] = value
			return copy
		})
	}

	const handleSubmit = () => {
		fetch(`${DWE.API_URL}/settings`, {
			method: 'POST',
			body: JSON.stringify(settings),
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
			<img src={DWE.LOGO_URL} style={{ width: 150 }} />
			<h1 style={{ marginBottom: 50, lineHeight: '30px' }} align='center'>
				DeadWaves <br /> Elementor Template Settings
			</h1>
			{library &&
				templates &&
				settings &&
				Object.keys(library).map((library_type) => {
					return (
						<div key={library_type}>
							<h3 style={{ textTransform: 'capitalize' }}>{library_type}</h3>
							<LibraryForm
								library={library}
								templates={templates}
								settings={settings}
								library_type={library_type}
								handleChange={handleChange}
							/>
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
