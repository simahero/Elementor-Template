<?php

add_action('admin_menu', 'prefix_register_settings_menu');

function prefix_register_settings_menu()
{
    //add_menu_page
    add_options_page('DeadWaves Elementor Template Settings', 'DeadWaves Settings', 'manage_options', 'deadwaves-elementor', 'plugin_settings_page');
}

function plugin_settings_page()
{
?>
    <div style="padding: 50px;" id="deadwaves-elementor-settings-page"></div>
<?php
}

add_action('admin_enqueue_scripts', 'prefix_enqueue_scripts');

function prefix_enqueue_scripts()
{
    wp_enqueue_script('deadwaves-elementor-settings-js', plugins_url('/admin/dist/deadwaves-elementor.js', __FILE__), array(), JS_VERSION, true);
    wp_localize_script('deadwaves-elementor-settings-js', 'dwe_ajax', array(
        'apiurl' => get_home_url() . '/wp-json/deadwaves/v1/elementor',
        'home' => home_url()
    ));
}
