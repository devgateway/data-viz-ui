<?php


function add_setting_section()
{

    register_setting('general', // Options group
        'react_ui_url', // Option name/database
        array(
            'show_in_rest' => true,
            'type' => 'string'
        ));

    /* Create settings section */
    add_settings_section('wp-react-section', // Section ID
        'WP React Settings', // Section title
        'wp_react_setting_section_header', // Section callback function
        'general'
    // Settings page slug
    );

    /* Create settings field */
    add_settings_field('wp-react-ui-url', // Field ID
        __('WP React URI'), // Field title
        'wp_react_ui_callback', // Field callback function
        'general', // Settings page slug
        'wp-react-section'
    // Section ID
    );

}





function wp_react_setting_section_header()
{
    echo "<p>Enter React APP base URL (include hash symbol if using hash history) </p>";
}

function wp_react_ui_callback()
{
    ?>
    <label for="droid-identification">
        <input id="react_ui_url" class="regular-text" type="text" name="react_ui_url"
               value="<?php echo(get_option('react_ui_url')) ?>">
    </label>
    <?php
}

function wp_react_api_url_callback()
{
    ?>
    <label for="droid-identification">
        <input
                id="react_api_url"
                class="regular-text" type="text" name="react_api_url"
                value="<?php echo(get_option('react_api_url')) ?>">
    </label>
    <?php
}



function namespace_register_setting_route()
{
    register_rest_route('dg/v1', '/settings', ['methods' => WP_REST_Server::READABLE, 'callback' => 'show_ui_setting', 'args' => namespace_get_search_args()]);
}
add_action('rest_api_init', 'namespace_register_setting_route');

function show_ui_setting($request)
{

    $p_name = $_GET['customize_changeset_uuid'];
    $settings = array(
        "react_ui_url" => get_option("react_ui_url"),
        "react_api_url" => get_option("react_api_url"),
        "languages" => wpm_get_lang_option()
    );

    $current_name = wpm_translate_value(get_option('blogname'));
    $current_description = wpm_translate_value(get_option('blogdescription'));
    $current_logo = intval(get_option('site_logo', 0));
    $current_site_icon = intval(get_option('site_icon', 0));
    $settings['name'] = $current_name;
    $settings['description'] = $current_description;
    $settings['site_logo'] = $current_logo;
    $settings['site_icon'] = $current_site_icon;


    if (isset($p_name)) {
        $the_query = new WP_Query(
            array(
                'post_name__in' => array($p_name),
                'post_type' => array('customize_changeset'),
                'post_status' => array('auto-draft', 'draft'),
                'cache_wp_query' => false,
            ));
        $the_query->the_post();
        $changes = json_decode($the_query->post->post_content, true);
        //console.log($the_query->post->post_content);
        if (isset($changes)) {

            $settings['UUID'] = $the_query->post->post_name;
            if (isset($changes->blogname->value)) {
                $settings['name'] = $changes->blogname->value;
            }

            if (isset($changes->blogdescription->value)) {
                $settings['description'] = $changes->blogdescription->value;
            }

            if (isset($changes->{'dg-semantic::custom_logo'}->value)) {
                $settings['site_logo'] = $changes->{'dg-semantic::custom_logo'}->value;
            }

            if (isset($changes->site_icon->value)) {
                $settings['site_icon'] = $changes->site_icon->value;
            }


            $menu_change_key = array_filter(array_keys($changes), function ($k) {
                return str_starts_with($k, "nav_menu_item");
            });

            $menu_changes = array();

            foreach ($menu_change_key as $k) {
                $menu_changes[$k] = $changes[$k];
            }

            $settings['menu_settings'] = $menu_changes;
        }
    }

    $response = rest_ensure_response($settings);


    return $response;
}

add_action('admin_init', 'add_setting_section');