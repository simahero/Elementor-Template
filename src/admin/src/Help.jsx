function Help() {
	return (
		<>
			<h1 style={{ marginTop: 50, marginBottom: 50 }} align='center'>
				Help
			</h1>
			<ol style={{ width: '100%', listStyle: 'circle', marginLeft: 40 }}>
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
					Create an Elementor template for it.
					<a
						style={{ marginLeft: 10 }}
						href={DWE.HOME_URL + '/wp-admin/post-new.php?post_type=elementor_library'}
						target='_blank'
					>
						New Template
					</a>
				</li>
				<li>
					Use any widget from the Elementor toolset and use shortcodes in your template referencing,
					post title, etc.
				</li>
				<li>Come back to this page, and set the template for your post type.</li>
				<li>
					Do not forget to press <strong>SAVE</strong> and wait until it turns green.
				</li>
			</ol>
			<p style={{ width: '100%' }}>
				<strong>NOTE:</strong> You can <strong>NOT</strong> use custom templates on post types,
				where you would like to use the <i>Elementor</i> page builder.
				<br />
				Otherwise you will get a{' '}
				<i>
					<strong>"Sorry, the content area was not found in your page.</strong>
					You must call 'the_contenť function in the current template, in order for Elementor to
					work on this page."
				</i>{' '}
				error.
				<br />
				To fix it, leave them on the <strong>Default</strong> template setting.
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
			<h1 style={{ marginTop: 50, marginBottom: 50 }} align='center'>
				Shortcodes included
			</h1>

			<h1 style={{ marginTop: 50, marginBottom: 50 }} align='center'>
				[ELEMENTOR_SC]
			</h1>
			<h3 style={{ width: '100%' }}>Args:</h3>

			<ul style={{ width: '100%', listStyle: 'circle', marginLeft: 40 }}>
				<li>
					<strong>id:</strong> Template id to render
				</li>
			</ul>
			<p style={{ width: '100%' }}>
				<strong>Example:</strong> [ELEMENTOR_SC id="1"]
				<br />
				<strong>[ELEMENTOR_SC id="1"]</strong> will rendered a saved elementor template with the id
				of <i>1</i>
			</p>

			<h1 style={{ marginTop: 50, marginBottom: 50 }} align='center'>
				[CON_SC]
			</h1>
			<h3 style={{ width: '100%' }}>Args:</h3>
			<ul style={{ width: '100%', listStyle: 'circle', marginLeft: 40 }}>
				<li>
					<strong>condition_type:</strong> Type of the condition
				</li>
				<li>
					<strong>condition_match:</strong> Query parameter
				</li>
				<li>
					<strong>condition_value:</strong> Query parameter value to match
				</li>
				<li>
					<strong>shortcode:</strong> Shortcode to render if the condition satisfies
				</li>
				<li>
					<strong>id / any other:</strong> Added to the shortcode as $atts.
				</li>
			</ul>
			<p style={{ width: '100%' }}>
				<strong>Example:</strong> [CON_SC condition_type="query" condition_match="param"
				condition_value="1" shortcode="ELEMENTOR_SC" id="1" ]
				<br />
				<strong>[ELEMENTOR_SC id="1"]</strong> will be rendered if the url matches <i>?param=1</i>
			</p>
			<br />
			<h3 style={{ width: '100%' }}>Args:</h3>
			<ul style={{ width: '100%', listStyle: 'circle', marginLeft: 40 }}>
				<li>
					<strong>condition_type:</strong> Type of the condition
				</li>
				<li>
					<strong>condition_value:</strong> User role to match
				</li>
				<li>
					<strong>shortcode:</strong> Shortcode to render if the condition satisfies
				</li>
				<li>
					<strong>id / any other:</strong> Added to the shortcode as $atts.
				</li>
			</ul>
			<p style={{ width: '100%' }}>
				<strong>Example:</strong> [CON_SC condition_type="role" condition_value="administrator"
				shortcode="ELEMENTOR_SC" id="17199" ]
				<br />
				<strong>[ELEMENTOR_SC id="1"]</strong> will be rendered if the current user has role{' '}
				<i>administrator</i>
			</p>
			<br />
			<h3 style={{ width: '100%' }}>Args:</h3>
			<ul style={{ width: '100%', listStyle: 'circle', marginLeft: 40 }}>
				<li>
					<strong>condition_match:</strong> Query parameter
				</li>
				<li>
					<strong>condition_value:</strong> Query parameter value to match
				</li>
				<li>
					<strong>shortcode:</strong> Shortcode to render if the condition satisfies
				</li>
				<li>
					<strong>id / any other:</strong> Added to the shortcode as $atts.
				</li>
			</ul>
			<p style={{ width: '100%' }}>
				<strong>Example:</strong> [CON_SC condition_type="logged-in" shortcode="ELEMENTOR_SC"
				id="17199" ]
				<br />
				<strong>[ELEMENTOR_SC id="1"]</strong> will be rendered if the user is <i>logged in</i>
			</p>
			<br />
		</>
	)
}

export default Help
