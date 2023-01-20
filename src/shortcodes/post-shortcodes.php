<?php

add_shortcode('dws_search_result_count', function () {
    global $wp_query;
    echo $wp_query->found_posts;
});


add_shortcode('dws_title', function () {
    echo get_the_title();
});

add_shortcode('dws_content', function () {

    if (is_admin()) {
        echo "CONTENT SHORTCODE";
        return;
    }

    //$post = get_post(get_the_ID());
    //echo apply_filters('the_content', $post->post_content);
});

add_shortcode('dws_meta', function () {
    echo get_the_title();
});
