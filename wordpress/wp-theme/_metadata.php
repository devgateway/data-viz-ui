<?php
function callback_read_meta_data($object)
{
     $post_id = $object['id'];
      return get_post_meta($post_id);
}

function add_post_meta_field()
{
    register_rest_field(get_post_types(), 'meta_fields', array(
        'get_callback' => 'callback_read_meta_data'
    ));

    $types = [
			'post',
			'post-revision',
			'page',
			'page-revision'
		];

		        $custom_types = get_post_types(array(
        			'public' => true,
        			'_builtin' => false
        		));

        		foreach($custom_types as $type) {
        		 $types[] = $type;
                			$types[] = $type . '-revision';
                		}

        foreach($types as $type) {
          register_rest_field($type, 'meta_fields_2', array(
                'get_callback' => 'callback_read_meta_data'
            ));


                        		}

}

add_action('rest_api_init', 'add_post_meta_field');
