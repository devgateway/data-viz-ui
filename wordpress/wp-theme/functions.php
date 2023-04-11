<?php
if (!function_exists('tdi_setup')):

    function tdi_setup()
    {


        load_theme_textdomain('dg', get_stylesheet_directory() . '/language');
        load_plugin_textdomain('dg', false, dirname(plugin_basename(__FILE__)) . '/languages');


        register_nav_menus(array(
            'main' => esc_html__('Desktop', 'tdi'),
        ));

        add_theme_support( 'customize-selective-refresh-widgets' );
        add_theme_support('custom-spacing');
        add_theme_support('experimental-custom-spacing');
        add_theme_support('custom-logo');
        add_theme_support('custom-units', 'px', 'pt', 'rem', 'em', '%');
        add_theme_support('post-thumbnails');
        add_theme_support('editor-font-sizes', array(
            array(
                'name' => __('Breadcrumbs (12px)', 'tcdi'),
                'shortName' => __('BR', 'tcdi'),
                'size' => 12,
                'slug' => 'standard_12'
            ),
            array(
                'name' => __('Links 16px', 'tcdi'),
                'shortName' => __('L', 'tcdi'),
                'size' => 16,
                'slug' => 'standard_16'
            ),
            array(
                'name' => __('Body Copy (18px)', 'tcdi'),
                'shortName' => __('BC', 'tcdi'),
                'size' => 18,
                'slug' => 'standard_18'
            ),
            array(
                'name' => __('Title (24px)', 'tcdi'),
                'shortName' => __('T', 'tcdi'),
                'size' => 24,
                'slug' => 'standard_24'
            ),

            array(
                'name' => __('Section (30px)', 'tcdi'),
                'shortName' => __('ST', 'tcdi'),
                'size' => 30,
                'slug' => 'standard_30'
            ),

            array(
                'name' => __('Secondary (36px)', 'tcdi'),
                'shortName' => __('SC', 'tcdi'),
                'size' => 36,
                'slug' => 'standard_36'
            ),

            array(
                'name' => __('Intro (64px)', 'tcdi'),
                'shortName' => __('IT', 'tcdi'),
                'size' => 64,
                'slug' => 'standard_64'
            ),
        ));

        add_theme_support('editor-color-palette', array(
            array(
                'name' => __('Blue', 'tcdi'),
                'slug' => 'blue',
                'color' => '#3e53a6',
            ),
            array(
                'name' => __('Light Blue', 'tcdi'),
                'slug' => 'light-blue',
                'color' => '#5089a6',
            ),
            array(
                'name' => __('Gray', 'tcdi'),
                'slug' => 'gray',
                'color' => '#54657e',
            ),
            array(
                'name' => __('Green', 'tcdi'),
                'slug' => 'green',
                'color' => '#5baf95',
            ),
            array(
                'name' => __('Dark Gray', 'tcdi'),
                'slug' => 'dark-gray',
                'color' => '#5c5d63',
            ),
            array(
                'name' => __('White', 'tcdi'),
                'slug' => 'white',
                'color' => '#fff',
            ),
            array(
                'name' => __('Black', 'tcdi'),
                'slug' => 'black',
                'color' => '#000',
            ),
            array(
                'name' => __('White', 'tcdi'),
                'slug' => 'red',
                'color' => '#ba5555',
            ),
        ));
    }
endif;


add_action('after_setup_theme', 'tdi_setup');

add_filter('wp_is_application_passwords_available', '__return_true');
add_post_type_support('page', 'excerpt');

if (is_admin()) {
    session_start();
    if (function_exists("wpm_get_language")) {
        $_SESSION["page_locale"] = wpm_get_language();
        $_SESSION["user_locale"] = wpm_get_user_language();
    }
}
include '_admin_styles.php';
include '_mime_types.php';
include '_metadata.php';
include '_customization.php';
include '_wpm_config.php';
include '_settings.php';
include '_search.php';
include '_functions.php';

//  require get_template_directory() . '/inc/customizer.php';
