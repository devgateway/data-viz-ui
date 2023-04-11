<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since Twenty Nineteen 1.0
 */


///    get_option( 'react_ui_url' )."/".wpm_get_language().'?customize_changeset_uuid='.$_GET['customize_changeset_uuid'].'&random='.rand(10,100)
?>
<?php if(isset($_GET['customize_changeset_uuid'])){?>
    <iframe
       id="react-preview"
       style="border:0px; width: 100%; height: 100%; position: absolute;" src='<?php echo get_option( 'react_ui_url' )."/".wpm_get_language().'?customize_changeset_uuid='.$_GET['customize_changeset_uuid'].'&random='.rand(10,100); ?>'
       >
       </iframe>

      <div style="visibility: hidden">
<?php
    get_footer();
?>
</div>
<?php
   } else{
       wp_redirect('/wp/wp-login.php');
 }
?>

<php?

