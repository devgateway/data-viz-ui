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
                'name' => __('Breadcrumbs (12px)', 'viz'),
                'shortName' => __('BR', 'viz'),
                'size' => 12,
                'slug' => 'standard_12'
            ),
            array(
                'name' => __('Links 16px', 'viz'),
                'shortName' => __('L', 'viz'),
                'size' => 16,
                'slug' => 'standard_16'
            ),
            array(
                'name' => __('Body Copy (18px)', 'viz'),
                'shortName' => __('BC', 'viz'),
                'size' => 18,
                'slug' => 'standard_18'
            ),
            array(
                'name' => __('Title (24px)', 'viz'),
                'shortName' => __('T', 'viz'),
                'size' => 24,
                'slug' => 'standard_24'
            ),

            array(
                'name' => __('Section (30px)', 'viz'),
                'shortName' => __('ST', 'viz'),
                'size' => 30,
                'slug' => 'standard_30'
            ),

            array(
                'name' => __('Secondary (36px)', 'viz'),
                'shortName' => __('SC', 'viz'),
                'size' => 36,
                'slug' => 'standard_36'
            ),

            array(
                'name' => __('Intro (64px)', 'viz'),
                'shortName' => __('IT', 'viz'),
                'size' => 64,
                'slug' => 'standard_64'
            ),
        ));

        add_theme_support('editor-color-palette', array(
            array(
                'name' => __('Blue', 'viz'),
                'slug' => 'blue',
                'color' => '#3e53a6',
            ),
            array(
                'name' => __('Light Blue', 'viz'),
                'slug' => 'light-blue',
                'color' => '#5089a6',
            ),
            array(
                'name' => __('Gray', 'viz'),
                'slug' => 'gray',
                'color' => '#54657e',
            ),
            array(
                'name' => __('Green', 'viz'),
                'slug' => 'green',
                'color' => '#5baf95',
            ),
            array(
                'name' => __('Dark Gray', 'viz'),
                'slug' => 'dark-gray',
                'color' => '#5c5d63',
            ),
            array(
                'name' => __('White', 'viz'),
                'slug' => 'white',
                'color' => '#fff',
            ),
            array(
                'name' => __('Black', 'viz'),
                'slug' => 'black',
                'color' => '#000',
            ),
            array(
                'name' => __('White', 'viz'),
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
    session_write_close();
}

include '_admin_styles.php';
include '_mime_types.php';
include '_custom_fields.php';
include '_metadata.php';

include '_customization.php';
include '_wpm_config.php';
include '_settings.php';
include '_search.php';
include '_functions.php';

//  require get_template_directory() . '/inc/customizer.php';
