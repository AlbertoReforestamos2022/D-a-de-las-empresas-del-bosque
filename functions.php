<?php

function deb_enqueue() {
    wp_enqueue_style('deb_style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'deb_enqueue'); 

// cargar los bloques personalizados
function deb_register_blocks() {
    register_block_type(__DIR__ . '/blocks/hero/block.json'); 

    # Registrar todos los bloques

}
add_action('init', 'deb_register_blocks'); 


# Agregar Bootstrap al proyecto
function deb_assets() {
    # Boostrap CSS 
    wp_enqueue_style(
        'bootstrap-css',
        get_template_directory_uri() . 'node/modules/bootstrap/dist/css/bootstrap.min.css'
    ); 

    wp_enqueue_scripts(
        'boostrap-js',
        get_template_directory_uri() . 'node/modules/bootstrap/dist/js/boostrap.bundle.min.js'
    ); 
}
add_action('wp_enqueue_scripts', 'deb_assets'); 
