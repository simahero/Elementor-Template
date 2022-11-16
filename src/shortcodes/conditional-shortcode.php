<?php

namespace SH_E;

class Condition
{

    private static $_instance = null;

    public static function instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __construct()
    {

        add_shortcode('CON_SC', [$this, 'render_shortcode']);

        add_filter('widget_text', 'do_shortcode');
    }

    //[CON_SC shortcode="ELEMENTOR_SC" condition_type="query" condition_match="param" condition_value="1" id="17199" ]

    public function render_shortcode($atts)
    {

        if (
            !isset($atts['condition_type']) || empty($atts['condition_type']) ||
            !isset($atts['condition_match']) || empty($atts['condition_match']) ||
            !isset($atts['condition_value']) || empty($atts['condition_value']) ||
            !isset($atts['shortcode']) || empty($atts['shortcode'])
        ) {
            return '';
        }

        $to_render = null;

        switch ($atts['condition_type']) {
            case 'query':

                if ($_GET[$atts['condition_match']] == $atts['condition_value']) {

                    $shortcode = '[' . $atts['shortcode'];

                    unset($atts['condition_type']);
                    unset($atts['condition_match']);
                    unset($atts['condition_value']);
                    unset($atts['shortcode']);

                    foreach ($atts as $key => $value) {
                        $shortcode .= ' ' . $key . '=';
                        $shortcode .= '"' . $value . '"';
                    }

                    $shortcode .= ']';

                    $to_render = do_shortcode($shortcode);
                }
        }

        return $to_render;
    }
}

Condition::instance();
