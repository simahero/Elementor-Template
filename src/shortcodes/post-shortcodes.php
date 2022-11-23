<?php

add_shortcode('dws_search_result_count', function () {
    global $wp_query;
    echo $wp_query->found_posts;
});


add_shortcode('dws_title', function () {
    echo get_the_title();
});

add_shortcode('dws_meta', function () {
    echo get_the_title();
});
