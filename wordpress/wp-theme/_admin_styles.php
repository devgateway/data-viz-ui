<?php


function admin_style()
{

    wp_enqueue_style('semantic-styles', 'https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css');
    wp_enqueue_style('react-styles_common', '/../scss/themes/common.css');
    wp_register_style('admin', get_stylesheet_directory_uri() . '/css/editor.css');
    wp_enqueue_style('admin');

}
add_action('admin_enqueue_scripts', 'admin_style');