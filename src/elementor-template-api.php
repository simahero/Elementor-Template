<?php

class API
{

    private $namespace;

    public function __construct()
    {
        $this->namespace = 'deadwaves/v1/elementor';
        $this->text_domain = 'deadwaves_elementor';

        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    function register_rest_routes()
    {

        register_rest_route(
            $this->namespace,
            'library',
            array(
                'methods'             => 'GET',
                'callback'            => function (WP_REST_Request $request) {
                    $post_types = get_post_types(array(), 'objects');
                    unset($post_types['elementor_library']);
                    unset($post_types['elementor-hf']);

                    $pages = array();
                    $pages['404'] = (object) array(
                        'label' => '404'
                    );

                    $pages['privacy_policy'] = (object) array(
                        'label' => 'Privacy policy'
                    );

                    $pages['search'] = (object) array(
                        'label' => 'Search'
                    );

                    $pages['author'] = (object) array(
                        'label' => 'Author'
                    );

                    // $taxonomies = get_taxonomies(array(), 'objects');

                    $archives = array_filter($post_types, function ($post_type) {
                        return $post_type->has_archive;
                    });

                    //$term each term individually
                    //$post each post individually

                    return wp_send_json_success(array(
                        'post_types' => $post_types,
                        'pages'      => $pages,
                        'archives'   => $archives,
                    ));
                },
                'permission_callback' => function () {
                    return $this->permission_callback();
                },
            )
        );

        register_rest_route(
            $this->namespace,
            'templates',
            array(
                'methods'             => 'GET',
                'callback'            => function (WP_REST_Request $request) {
                    return wp_send_json_success(get_posts([
                        'post_type'        => 'elementor_library',
                        'post_status'      => 'publish',
                        'numberposts'      => -1,
                        'orderby'          => 'date',
                        'order'            => 'DESC',
                    ]));
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
                'methods'             => 'GET',
                'callback'            => function (WP_REST_Request $request) {
                    return wp_send_json_success(get_option(OPTION_MAP));
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

new API();
