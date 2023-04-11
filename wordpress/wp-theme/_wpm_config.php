<?php
function add_wpm_config()
{


    $POST_TYPES = get_post_types(array(
        '_builtin' => false
    ), 'object');
    $TAXONOMIES = get_taxonomies([], 'names');

    foreach ($POST_TYPES as &$type) {
         if (!str_starts_with($type->name,'acf')){
            add_filter('wpm_post_' . $type->name . '_config', '__return_empty_array');
        }
    }

    foreach ($TAXONOMIES as &$name) {
        add_filter('wpm_taxonomy_' . $name . '_config', '__return_empty_array');
    }

}


add_action('init', 'add_wpm_config');
