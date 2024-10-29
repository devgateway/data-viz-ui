<?php
// register custom meta tag field
function myguten_register_post_meta() {

        $types= get_post_types( [], 'names' );
          foreach ($types as &$type) {
           register_post_meta( $type, 'myguten_meta_block_field', array(
                  'show_in_rest' => true,
                  'single' => true,
                  'type' => 'string',
              ) );

          }



}
add_action( 'init', 'myguten_register_post_meta' );

