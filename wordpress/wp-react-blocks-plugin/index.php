<?php
/**
 * Plugin Name: WP React Components
 * Plugin URI: https://github.com/devgateway/dg-wp-react
 * Description: Custom UI Components for viz.
 * Version: 0.1.0
 * Author: Sebastian Dimunzio
  * @package dg
 */
defined( 'ABSPATH' ) || exit;
function add_custom_block_categories( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'wp-react-lib-blocks',
				'title' => __( 'React Libs Blocks', 'wp-react-lib-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'add_custom_block_categories', 10, 2);


function register_scripts(){
wp_register_script( 'dummy-handle-header2', '' );



wp_enqueue_script( 'dummy-handle-header2' );

        if (function_exists('wpm_get_language')) {
             wp_add_inline_script( 'dummy-handle-header2', '
                console.log("----- Language -----'.wpm_get_language().'----------") ;
                console.log("---- -User Language -----'.wpm_get_user_language().'----------") ;
                window._user_locale="'.wpm_get_user_language().'" ;
                window._page_locale="'.wpm_get_language().'" ;' );
            }else{
             wp_add_inline_script( 'dummy-handle-header2', '
                console.log("---------- en ----------") ;
                console.log("---------- en ----------") ;
                window._user_locale="en" ;
                window._page_locale="en" ;' );

            }

}
add_action( 'admin_enqueue_scripts', 'register_scripts' );




include 'blocks/index.php';

