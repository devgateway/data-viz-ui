<?php
if (! function_exists('tdi_ng_setup')) :
    function tdi_ng_setup(){
         add_theme_support('editor-color-palette',
         array(
              array('name'  => __('Purple', 'tcdi'),'slug'  => 'purple','color'	=> '#9468a6'),
              array('name'  => __('Blue', 'tcdi'),'slug'  => 'blue','color'	=> '#5c9abe'),
              array('name'  => __('Dark purple', 'tcdi'),'slug'  => 'dark-purple','color'	=> '#714882'),
              array('name'  => __('Light orange', 'tcdi'),'slug'  => 'light-orange','color'	=> '#f2c76a'),
              array('name'  => __('Grey', 'tcdi'),'slug'  => 'grey','color'	=> '#9f9f9f'),
              array('name'  => __('Regular Grey', 'tcdi'),'slug'  => 'regular-grey','color'	=> '#535454'),
              array('name'  => __('Background Grey', 'tcdi'),'slug'  => 'background-grey','color'	=> '#ececec'),
              array('name'  => __('Lilac', 'tcdi'),'slug'  => 'lilac','color'	=> '#c589b6'),
              array('name'  => __('Light blue', 'tcdi'),'slug'  => 'light-blue','color'	=> '#61b0d5'),
              array('name'  => __('Light purple', 'tcdi'),'slug'  => 'light-purple','color'	=> '#9e7fb8'),
              array('name'  => __('White', 'tcdi'),'slug'  => 'white','color'	=> '#FFFFFF'),
              array('name'  => __('Border', 'tcdi'),'slug'  => 'border','color'	=> '#41a1e0')));


            add_theme_support('editor-font-sizes',
            array(
                    array(
                        'name'      => __( 'Small / Read More / Reference', 'tcdi' ),
                        'shortName' => __( 'SM', 'tcdi' ),
                        'size'      => 14,
                        'slug'      => 'standard_14'
                    ),
                    array(
                          'name'      => __( 'Quote Author', 'tcdi' ),
                          'shortName' => __( 'QA', 'tcdi' ),
                          'size'      => 15,
                          'slug'      => 'standard_15'
                    ),
                     array(
                        'name'      => __( 'Regular', 'tcdi' ),
                        'shortName' => __( 'RE', 'tcdi' ),
                        'size'      => 18,
                        'slug'      => 'standard_18'),
                    array(
                        'name'      => __( 'Large / Theme Title', 'tcdi' ),
                        'shortName' => __( 'LR', 'tcdi' ),
                        'size'      => 24,
                        'slug'      => 'standard_24'
                    ),

                    array(
                        'name'      => __( 'Quote / Subtitle', 'tcdi' ),
                        'shortName' => __( 'ST', 'tcdi' ),
                        'size'      => 27,
                        'slug'      => 'standard_27'
                    ),

                    array(
                        'name'      => __( 'Homepage Titles', 'tcdi' ),
                        'shortName' => __( 'HT', 'tcdi' ),
                        'size'      => 30,
                        'slug'      => 'standard_30'
                    ),
                    array(
                        'name'      => __( 'Title', 'tcdi' ),
                        'shortName' => __( 'TE', 'tcdi' ),
                        'size'      => 36,
                        'slug'      => 'standard_36'
                    ),

                        array(
                        'name'      => __( 'Page Title', 'tcdi' ),
                        'shortName' => __( 'PT', 'tcdi' ),
                        'size'      => 64,
                        'slug'      => 'standard_64'
                    )
                    )

            );

    }
endif;

add_action('after_setup_theme', 'tdi_ng_setup');

function ng_style() {
  wp_enqueue_style('react-styles_ng', '/../scss/themes/ke/index.css');

}
add_action('admin_enqueue_scripts', 'ng_style');


add_action("rest_api_init", function () {

    register_rest_route(
          "dg/v1"
        , "/pages/(?P<id>\d+)/contentElementor"
        , [
            "methods" => "GET",
            "callback" => function (\WP_REST_Request $req) {

                $contentElementor = "";

                if (class_exists("\\Elementor\\Plugin")) {
                    $post_ID = $req->get_param("id");

                    $pluginElementor = \Elementor\Plugin::instance();
                    $contentElementor = $pluginElementor->frontend->get_builder_content($post_ID);
                }


                return $contentElementor;

            },
        ]
    );

function add_custom_editor_styles() {
    $custom_css = "
        hr.wp-block-separator {
                    border: 1px solid #dadada !important;
                    border-top: 1px solid #dadada !important;
                    border-bottom: 1px solid #dadada !important;
                    opacity: 0.4 !important;
                    /* Add any other custom styles here */
                }
    ";
    wp_add_inline_style('wp-block-library', $custom_css);
}
add_action('enqueue_block_editor_assets', 'add_custom_editor_styles');


});