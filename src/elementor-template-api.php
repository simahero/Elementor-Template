<?php

class API
{

    private $namespace;

    public function __construct()
    {
        $this->namespace = 'deadwaves/v1/elementor';
        $this->text_domain = 'deadwaves_elementor';
    }

    function register_rest_routes()
    {

        register_rest_route(
            $this->namespace,
            'settings',
            array(
                'methods'             => 'GET',
                'callback'            => function (WP_REST_Request $request) {

                    //get library item post type = elementor_library

                    $post_types = get_post_types(
                        //array('_builtin' => false)
                    );
                    unset($post_types['elementor_library']);

                    $templates = get_posts([
                        'post_type'        => 'elementor_library',
                        'post_status'      => 'publish',
                        'numberposts'      => -1,
                        'orderby'          => 'date',
                        'order'            => 'DESC',
                    ]);

                    return wp_send_json_success(array(
                        'post_types' => $post_types,
                        'settings'   => get_option(OPTION_MAP),
                        'templates'  => $templates
                    ));
                },
                'permission_callback' => function () {
                    return $this->permission_callback();
                },
            )
        );

        register_rest_route(
            $this->namespace,
            'settings',
            array(
                'methods'             => 'POST',
                'callback'            => function (WP_REST_Request $request) {
                    update_option(OPTION_MAP, $request->get_body(), 'yes');
                    return wp_send_json_success();
                },
                'permission_callback' => function () {
                    return $this->permission_callback();
                },
            )
        );
    }

    function permission_callback()
    {
        return '__return_true';
        // return current_user_can('administrator');
    }
}
