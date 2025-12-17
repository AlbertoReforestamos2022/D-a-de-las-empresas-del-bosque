<?php

function deb_enqueue() {
    wp_enqueue_style('deb_style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'deb_enqueue'); 

// Cargar fuentes de google fonts
function deb_google_fonts() {
    
}

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

// Encolar estilos de bloques en el FRONTEND
function deb_enqueue_block_assets() {
    if (file_exists(get_theme_file_path('build/style-index.css'))) {
        wp_enqueue_style(
            'deb-blocks-style',
            get_theme_file_uri('build/style-index.css'),
            array(),
            filemtime(get_theme_file_path('build/style-index.css'))
        );
    }
}
add_action('wp_enqueue_scripts', 'deb_enqueue_block_assets');

## Material Icons
function deb_enqueue_material_icons() {
    wp_enqueue_style(
        'material-icons',
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined',
        array(),
        null
    );

    # Font Awesome
    wp_enqueue_style(
        'font-awesome-editor',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        array(),
        '6.4.0'
    );
}
add_action('wp_enqueue_scripts', 'deb_enqueue_material_icons');
add_action('enqueue_block_editor_assets', 'deb_enqueue_material_icons'); // También en el editor

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
    wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', array(), null, true);
}
add_action('init', 'deb_enqueue_bootstrap_cdn'); 


## Efecto Blur JS en header 'parts/header.html'
# Agregar script para navbar scroll effect
function deb_navbar_scroll_script() {
    ?>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const navbar = document.querySelector('.navbar-custom');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        });
    </script>
    <?php
}
add_action('wp_footer', 'deb_navbar_scroll_script');

# Agregar estilos al editor 
function deb_enqueue_editor_styles() {
    ## Bootstrap
    wp_enqueue_style(
        'bootstrap-editor',
        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css',
        array(),
        '5.3.2'
    );

    # Font Awesome
    wp_enqueue_style(
        'font-awesome-editor',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        array(),
        '6.4.0'
    );

    ## Script
    wp_enqueue_script('bootstrap-script-editor', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', array(), '5.3.2', true); 

    ## Estilos del tema
    wp_enqueue_style(
        'deb-theme-editor', 
        get_stylesheet_uri(),
        array('bootstrap-editor'),
        filemtime(get_stylesheet_directory(). '/style.css')
    );

    ## Estilos compilados de bloques (si existen)
    if(file_exists(get_theme_file_path('build/style-index.css'))) {
        wp_enqueue_style(
            'deb-blocks-editor',
            get_theme_file_uri('build/style-index.css'), 
            array(),
            filemtime(get_theme_file_path('build/style-index.css'))
        ); 
    }
}
add_action('enqueue_block_editor_assets', 'deb_enqueue_editor_styles'); 

// Script para funcionalidad "Ver más" de documentos
function deb_documentos_ver_mas_script() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const botonesVerMas = document.querySelectorAll('.btn-ver-mas');
        
        botonesVerMas.forEach(boton => {
            // Guardar el estado inicial en el botón
            boton.setAttribute('data-mostrados-actual', boton.dataset.inicial);
            
            boton.addEventListener('click', function() {
                const inicial = parseInt(this.dataset.inicial);
                const porPagina = parseInt(this.dataset.porPagina);
                const total = parseInt(this.dataset.total);
                const textoMas = this.dataset.textoMas;
                const textoMenos = this.dataset.textoMenos;
                const blockId = this.dataset.blockId;
                
                // Obtener cuántos se están mostrando actualmente
                let mostradosActual = parseInt(this.getAttribute('data-mostrados-actual'));
                
                const container = document.getElementById(blockId);
                
                if (!container) {
                    console.error('No se encontró el contenedor:', blockId);
                    return;
                }
                
                // Seleccionar items según el tipo de layout
                let items;
                if (container.classList.contains('documentos-lista')) {
                    items = container.querySelectorAll('.documento-item');
                } else if (container.tagName === 'TBODY') {
                    items = container.querySelectorAll('tr[data-index]');
                } else {
                    items = container.querySelectorAll('.col-md-6, .col-lg-4');
                }
                
                console.log('Items encontrados:', items.length);
                console.log('Mostrados actual:', mostradosActual);
                
                if (this.classList.contains('expandido')) {
                    // COLAPSAR - Ocultar todo excepto los iniciales
                    items.forEach((item, index) => {
                        if (index >= inicial) {
                            item.classList.add('documento-oculto');
                        }
                    });
                    
                    this.innerHTML = textoMas + ' <i class="fas fa-chevron-down ms-2"></i>';
                    this.classList.remove('expandido');
                    this.setAttribute('data-mostrados-actual', inicial);
                    
                    // Scroll suave al inicio
                    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                } else {
                    // EXPANDIR - Mostrar más documentos
                    const nuevosHasta = Math.min(mostradosActual + porPagina, total);
                    
                    console.log('Mostrando desde', mostradosActual, 'hasta', nuevosHasta);
                    
                    for (let i = mostradosActual; i < nuevosHasta; i++) {
                        if (items[i]) {
                            console.log('Mostrando item', i);
                            items[i].classList.remove('documento-oculto');
                        }
                    }
                    
                    // Actualizar el contador
                    this.setAttribute('data-mostrados-actual', nuevosHasta);
                    
                    // Actualizar el texto del botón
                    if (nuevosHasta >= total) {
                        this.innerHTML = textoMenos + ' <i class="fas fa-chevron-up ms-2"></i>';
                        this.classList.add('expandido');
                    } else {
                        const restantes = total - nuevosHasta;
                        this.innerHTML = textoMas + ' (' + restantes + ' restantes) <i class="fas fa-chevron-down ms-2"></i>';
                    }
                }
            });
        });
    });
    </script>
    <?php
}
add_action('wp_footer', 'deb_documentos_ver_mas_script');