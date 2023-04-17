<?php

defined( 'ABSPATH' ) || exit;




/**
 * Load all translations for our plugin from the MO file.
*/

function wp_react_lib_init() {



        $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

        wp_register_script(
            'wp-lib-block-editor-js',
            plugins_url( 'build/index.js', __FILE__ ),
            $asset_file['dependencies'],
            $asset_file['version']
        );


        wp_register_style(
            'wp-lib-block-editor-css',
            plugins_url( 'editor.css', __FILE__ ),
            array( ),
            filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
        );

        wp_register_style(
            'wp-lib-block-block-styles',
            plugins_url( 'style.css', __FILE__ ),
            array( ),
            filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
        );

        register_block_type( 'wp-react-lib/wp-react-lib-blocks', array(
            'editor_script' => 'wp-lib-block-editor-js',
            'editor_style'  => 'wp-lib-block-editor-css',
            'style'  => 'wp-lib-block-block-styles'
        ) );


          wp_enqueue_script( 'wp-lib-block-editor');

        $types= get_post_types( [], 'names' );
          foreach ($types as &$type) {
                register_post_meta($type,'redirect_url',array( 'show_in_rest' => true, 'single' => true, 'type' => 'string', ));
          }

}


add_action( 'init', 'wp_react_lib_init');