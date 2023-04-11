<?php

function get_post_by_name(string $name, string $post_type = "page")
{
    $query = new WP_Query(["post_type" => $post_type, "name" => $name]);

    return $query->have_posts() ? reset($query->posts) : null;
}

function namespace_get_search_args()
{
    $args = [];
    $args['search'] = ['description' => esc_html__('The search term.', 'namespace'), 'type' => 'string',];
    return $args;
}

function namespace_register_search_route()
{
    register_rest_route('dg/v1', '/search', ['methods' => WP_REST_Server::READABLE, 'callback' => 'custom_api_search', 'args' => namespace_get_search_args()]);
}


function custom_api_search($request)
{

    $posts = [];
    $results = [];
    $posts_per_page = $request["per_page"];
    $page = $request['page'];

    if (!isset($posts_per_page)):
        $posts_per_page = 10;
    endif;
    if (!isset($page)):
        $page = 1;
    endif;

    $offset = ($posts_per_page * $page) - $posts_per_page;

    // check for a search term
    if (isset($request['search'])):
        global $wpdb;
        $like = "%" . $wpdb->esc_like($request["search"]) . "%";

        $args = array(
            'public' => true,
            '_builtin' => false
        );
        $types = get_post_types($args);
        $types_placeholders = count($types) == 0 ? "''" : implode(', ', array_fill(0, count($types), '%s'));

        //TODO:fix count
        $sql_count_str = "select count(*)  from  $wpdb->posts" . " WHERE (post_title like %s OR post_content like %s) " . " and post_status='publish' and post_type in ('page','post', $types_placeholders) " . " and (select meta_value from wp_postmeta where post_id=wp_posts.ID and meta_key='remove_from_search' and meta_value=1) is null";

        $sql_count = $wpdb->remove_placeholder_escape($wpdb->prepare($sql_count_str, array_merge(array(
            'a' => $like,
            'b' => $like
        ), $types)));
        $total_posts = $wpdb->get_var($sql_count);

        $sql = "select *," . " CASE" . " WHEN post_title like %s  THEN 1 " . " WHEN post_content like %s THEN 2 " . " ELSE 3" . " END as rate" . " from  $wpdb->posts" . " WHERE (post_title like %s OR post_content like %s)" . " and (select meta_value from wp_postmeta where post_id=wp_posts.ID and meta_key='remove_from_search' and meta_value=1) is null" . " and post_status='publish' and post_type in ('page','post',$types_placeholders)" . " order by  rate asc , post_title  asc, post_date desc LIMIT %d OFFSET %d";

        $queryParams = array(
            'a' => $like,
            'b' => $like,
            'c' => $like,
            'd' => $like
        );

        $query = $wpdb->remove_placeholder_escape($wpdb->prepare($sql, array_merge($queryParams, $types, array(
            'e' => $posts_per_page,
            'f' => $offset
        ))));

        $posts = $wpdb->get_results($query);

        foreach ($posts as $post):
            wpm_translate_post($post, isset($request['lang']) && $request['lang'] != 'undefined' ? $request['lang'] : 'en');

            $taxonomies = get_object_taxonomies($post);

            if ($post->post_type != 'post' and $post->post_type != 'page'):
                $parent = get_post_by_name($post->post_type);
            else:
                $parent = get_post($post->post_parent);
            endif;

            if ($parent->post_name === 'home'):
                $parent = null;
            endif;

            $metadata = get_post_meta($post->ID);

            $content_arr = get_extended($post->post_content);

            if (trim($content_arr['main']) != ""):
                $extract = $content_arr['main'];
            else:
                $extract = $content_arr['extended'];
            endif;

            $post_data = [
                        'ID' => $post->ID,
                        'title' => $post->post_title,
                        'slug' => $post->post_name,
                        'type' => $post->post_type,
                        'subtype' => $post->post_sub_type,
                        'parent_title' => wpm_translate_post($parent, isset($request['lang']) && $request['lang'] != 'undefined' ? $request['lang'] : 'en')->post_title,
                        'parent_slug' => $parent->post_name,
                        'parent_type' => $parent->post_type,
                        'parent_sub_type' => $parent->post_sub_type,
                        'parent_ID' => $parent->ID,
                        'parent_link' => get_permalink($parent->ID),
                        'extract' => substr(trim(preg_replace("/[\r\n]+/", " ", strip_tags($extract))), 0, 255) . " ...",
                        'status' => $post->post_status,

                        'terms' => array_map(function ($term) {
                            return wpm_translate_value($term->name, $request['lang']);
                            }, wp_get_post_terms($post->ID, array_filter($taxonomies,
                                function ($text) {
                                    return $text != 'bread_crumbs';
                                }
                            ))),

                    'link' => get_permalink($post->ID),
                     'bread_crumbs'=>array_map(
                     function ($term) {
                         return  wpm_translate_value($term->name, $request['lang']);
                    },
                      wp_get_post_terms($post->ID, "bread_crumbs", array( "orderby" => "parent"))),

            ];


                 foreach (array_filter($taxonomies, function ($text) {
                                                                                       return $text != 'bread_crumbs';
                                                                                   }) as $taxonomy):

                  $post_data[$taxonomy] = array_map(function ($term) { return  wpm_translate_value($term->name, $request['lang']);},
                                                     wp_get_post_terms($post->ID,$taxonomy));

                endforeach;


            $post_data['metadata'] = $metadata;
            $results[] = $post_data;

        endforeach;
    endif;

    $max_pages = ceil($total_posts / $posts_per_page);
    if ($page > $max_pages && $total_posts > 0) {
        return new WP_Error('rest_post_invalid_page_number', __('The page number requested is larger than the number of pages available.'), array(
            'status' => 400
        ));
    } else

        $response = rest_ensure_response($results);
    $response->header('X-WP-Total', (int)$total_posts);
    $response->header('X-WP-TotalPages', (int)$max_pages);

    return $response;

}

add_action('rest_api_init', 'namespace_register_search_route');