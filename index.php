<?php

/**
 * Plugin Name:       DeadWaves - Elementor template
 * Plugin URI:        
 * Description:       Elementor Page Builder
 * Version:           1.0.5
 * Author:            Ront車 Zolt芍n
 * Author URI:        simahero.github.io
 * Text Domain:       deadwaves-elementor
 */

/* 
  01001001 00100000 01001100 01001111
  01010110 01000101 00100000 01010000
  01000001 01010100 01010010 01001001
  01000011 01001001 01000001 00000000
*/

defined('ABSPATH') || exit;

define('JS_VERSION', '1.0.4');
define('OPTION_MAP', 'deadwaves-cpt-mapping-options');

require_once 'src/shortcodes/post-shortcodes.php';
require_once 'src/shortcodes/elementor-shortcode.php';
require_once 'src/shortcodes/conditional-shortcode.php';

require_once 'src/elementor-template-api.php';
require_once 'src/elementor-template-settings.php';
require_once 'src/elementor-template.php';
