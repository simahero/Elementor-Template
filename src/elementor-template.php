<?php

namespace DeadWaves;

use Elementor\Plugin;

add_filter('template_include', function ($template) {

    $post_type = get_post_type(get_the_ID());
    $map = (array) json_decode(get_option(OPTION_MAP));

    if (!isset($map[$post_type])) return $template;

    $template_id = $map[$post_type];

    if ($template_id != -1) {
        get_header();
        // the_content();
        echo Plugin::instance()->frontend->get_builder_content_for_display($template_id);
        get_footer();
    }
}, 99);
