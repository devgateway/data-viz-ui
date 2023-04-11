<?php

function namespace_register_customization_route()
{


    register_rest_route('dg/v1', '/settings/customization',

        ['methods' => WP_REST_Server::READABLE, 'callback' => 'show_customization_settings', 'args' => namespace_get_search_args()]);

}

function show_customization_settings($request)
{


    $name = $_GET['customize_changeset_uuid'];

    $results = array();
    $current_name = wpm_translate_value(get_option('blogname'));
    $current_description = wpm_translate_value(get_option('blogdescription'));
    $current_logo = intval(get_option('site_logo', 0));
    $current_site_icon = intval(get_option('site_icon', 0));


    //      $results["react_ui_url"] = get_option("react_ui_url");
//       $results["react_api_url"] = get_option("react_api_url");
//       $results["languages"] = wpm_get_lang_option();

    $results['name'] = $current_name;
    $results['description'] = $current_description;
    $results['site_logo'] = $current_logo;
    $results['site_icon'] = $current_site_icon;

    if (isset($name)) {
        $the_query = new WP_Query(
            array(
                'post_name__in' => array($_GET['customize_changeset_uuid']),
                'post_type' => array('customize_changeset'),
                'post_status' => array('auto-draft', 'draft')
            ));


        if ($the_query->have_posts()) {
            while ($the_query->have_posts()) {
                $the_query->the_post();
                $changes = json_decode($the_query->post->post_content);

                if (isset($changes->blogname)) {
                    $results['name'] = $changes->blogname->value;
                }

                $results['description'] = $changes->blogdescription->value;
                $results['site_logo'] = $changes->{'dg-semantic::custom_logo'}->value;
                $results['site_icon'] = $changes->site_icon->value;
                //$results['raw']=$changes;

            }
        }
        $response = rest_ensure_response($results);
    }
    return $response;
}


add_action('rest_api_init', 'namespace_register_customization_route');