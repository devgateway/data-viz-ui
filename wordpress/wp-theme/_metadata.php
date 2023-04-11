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
}

add_action('rest_api_init', 'add_post_meta_field');

