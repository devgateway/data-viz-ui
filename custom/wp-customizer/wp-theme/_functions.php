<?php
if (! function_exists('tdi_ng_setup')) :
    function tdi_ng_setup(){
         add_theme_support('editor-color-palette',
         array(
              array('name'  => __('DC Main Blue', 'dc'),'slug'  => 'dc-main-blue','color' => '#03579D'),
              array('name'  => __('DC Green', 'dc'),'slug'  => 'dc-green','color' => '#9BC65A'),
              array('name'  => __('DC Red', 'dc'),'slug'  => 'dc-red','color' => '#A90000'),
              array('name'  => __('DC Dark Grey', 'dc'),'slug'  => 'dc-dark-grey','color' => '#2B2F31'),
              array('name'  => __('DC Define', 'dc'),'slug'  => 'dc-define','color' => '#355966'),
              array('name'  => __('DC Design', 'dc'),'slug'  => 'dc-design','color' => '#3B8E8E'),
              array('name'  => __('DC Analysis', 'dc'),'slug'  => 'dc-analysis','color' => '#88AE3F'),
              array('name'  => __('DC Monitor', 'dc'),'slug'  => 'dc-monitor','color' => '#F1592D')));

            add_theme_support('editor-font-sizes',
            array(
                    array(
                        'name'      => __('Small / Read More / Reference', 'viz' ),
                        'shortName' => __( 'SM', 'viz' ),
                        'size'      => 14,
                        'slug'      => 'standard_14'
                    ),
                    array(
                          'name'      => __( 'Quote Author', 'viz' ),
                          'shortName' => __( 'QA', 'viz' ),
                          'size'      => 15,
                          'slug'      => 'standard_15'
                    ),
                     array(
                        'name'      => __( 'Regular', 'viz' ),
                        'shortName' => __( 'RE', 'viz' ),
                        'size'      => 18,
                        'slug'      => 'standard_18'),
                    array(
                        'name'      => __( 'Large / Theme Title', 'viz' ),
                        'shortName' => __( 'LR', 'viz' ),
                        'size'      => 24,
                        'slug'      => 'standard_24'
                    ),

                    array(
                        'name'      => __( 'Quote / Subtitle', 'viz' ),
                        'shortName' => __( 'ST', 'viz' ),
                        'size'      => 27,
                        'slug'      => 'standard_27'
                    ),

                    array(
                        'name'      => __( 'Homepage Titles', 'viz' ),
                        'shortName' => __( 'HT', 'viz' ),
                        'size'      => 30,
                        'slug'      => 'standard_30'
                    ),
                    array(
                        'name'      => __( 'Title', 'viz' ),
                        'shortName' => __( 'TE', 'viz' ),
                        'size'      => 36,
                        'slug'      => 'standard_36'
                    ),

                        array(
                        'name'      => __( 'Page Title', 'viz' ),
                        'shortName' => __( 'PT', 'viz' ),
                        'size'      => 64,
                        'slug'      => 'standard_64'
                    )
                    )

            );

    }
endif;

add_action('after_setup_theme', 'tdi_ng_setup');

function ng_style() {
  wp_enqueue_style('react-styles_ng', '/../scss/themes/cash/index.css');

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


});