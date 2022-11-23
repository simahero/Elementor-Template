<?php

namespace DeadWaves;

use Elementor\Plugin;

add_filter('template_include', function ($template) {

    $query_type = NULL;
    $query = NULL;

    if (is_404()) {
        $query_type = 'pages';
        $query = '404';
    }

    if (is_privacy_policy()) {
        $query_type = 'pages';
        $query = 'privacy_policy';
    }

    if (is_search()) {
        $query_type = 'pages';
        $query = 'search';
    }

    if (is_author()) {
        $query_type = 'pages';
        $query = 'author';
    }

    if (is_singular()) {
        $query_type = 'post_types';
        $query = get_post_type(get_the_ID());
    }

    if (is_archive()) {
        $query_type = 'archives';
        $query = get_post_type(get_the_ID());
    }

    // if (is_tag()) {
    //     $query_type = 'taxonomies';
    //     $query = 'tag';
    // }

    if (!$query_type || !$query) return $template;

    $map = json_decode(get_option(OPTION_MAP));

    if (!isset($map->$query_type)) return $template;
    if (!isset($map->$query_type->$query)) return $template;

    $template_id = $map->$query_type->$query;

    // var_dump(array($template_id, $map, $query_type, $query));

    if ($template_id != -1) {
        get_header();
        // the_content();
        echo Plugin::instance()->frontend->get_builder_content_for_display($template_id);
        get_footer();
    }
}, 99);
