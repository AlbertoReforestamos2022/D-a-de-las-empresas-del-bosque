<?php

function deb_enqueue() {
    wp_enqueue_style('deb_style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'deb_enqueue'); 

// cargar los bloques personalizados
function deb_register_blocks() {
    foreach ( glob( get_theme_file_path( 'blocks/*/block.json' ) ) as $block_json ) {
        register_block_type( $block_json );
    }
}

add_action( 'init', 'deb_register_blocks' );

# Encolar build/index.js
function deb_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'deb-blocks-editor',
        get_theme_file_uri('build/index.js'),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
        filemtime(get_theme_file_path('build/index.js'))
    );
}
add_action('enqueue_block_editor_assets', 'deb_enqueue_block_editor_assets');

# Crear una nueva categoria en el tema 
function deb_custom_block_categories( $categories ) {
    return array_merge(
        array(
            array(
                'slug'   => 'deb-theme',
                'title' => 'Día de las Empresas del Bosque theme',
            ),
        ),
        $categories

        );
}
add_filter('block_categories_all', 'deb_custom_block_categories', 10, 2);


# Agregar Bootstrap desde CDN
function deb_enqueue_bootstrap_cdn() {
    wp_enqueue_style('boostrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', array(), null ); 
    wp_enqueue_style('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', array(), null, true);
}
add_action('init', 'deb_enqueue_bootstrap_cdn'); 

# Agregar Bootstrap al proyecto
// function deb_assets() {
//     # Boostrap CSS 
//     wp_enqueue_style(
//         'bootstrap-css',
//         get_template_directory_uri() . 'node/modules/bootstrap/dist/css/bootstrap.min.css'
//     ); 

//     wp_enqueue_script(
//         'boostrap-js',
//         get_template_directory_uri() . 'node/modules/bootstrap/dist/js/boostrap.bundle.min.js'
//     ); 
// }
// add_action('wp_enqueue_scripts', 'deb_assets'); 
