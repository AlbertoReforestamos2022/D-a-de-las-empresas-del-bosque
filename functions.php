<?php

function deb_enqueue() {
    wp_enqueue_style('deb_style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'deb_enqueue'); 

// cargar los bloques personalizados
function deb_register_blocks() {
    register_block_type(__DIR__ . '/blocks/hero'); 

    # Registrar todos los bloques

}
add_action('init', 'deb_register_blocks'); 