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

    //[CON_SC condition_type="query" condition_match="param" condition_value="1" shortcode="ELEMENTOR_SC" id="17199" ]
    //[CON_SC condition_type="role" condition_value="administrator" shortcode="ELEMENTOR_SC" id="17199" ]
    //[CON_SC condition_type="logged-in" shortcode="ELEMENTOR_SC" id="17199" ]

    public function get_render($atts)
    {
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

        return do_shortcode($shortcode);
    }

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
                    $to_render = $this->get_render($atts);
                }
                break;
            case 'role':
                $user = wp_get_current_user();
                $roles = (array) $user->roles;
                if (in_array($atts['condition_value'], $roles)) {
                    $to_render = $this->get_render($atts);
                }
                break;
            case 'logged-in':
                if (is_user_logged_in() == $atts['condition_value']) {
                    $to_render = $this->get_render($atts);
                }
                break;
        }

        return $to_render;
    }
}

Condition::instance();
