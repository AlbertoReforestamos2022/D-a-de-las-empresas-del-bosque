<div align="center">

# Día de las Empresas del Bosque

### Tema WordPress con Bloques Personalizados de Gutenberg

![WordPress](https://img.shields.io/badge/WordPress-6.0+-0073aa?logo=wordpress&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.0+-777bb4?logo=php&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952b3?logo=bootstrap&logoColor=white)

</div>

---

## 📋 Tabla de Contenidos

- [Introducción](#-introducción)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración](#-configuración)
- [Desarrollo de Bloques](#-desarrollo-de-bloques)
- [Comandos npm](#-comandos-npm)
- [Bootstrap 5](#-bootstrap-5)
- [Bloques Disponibles](#-bloques-disponibles)
- [Solución de Problemas](#-solución-de-problemas)
- [Referencias](#-referencias)

---

## Introducción

Esta documentación describe todos los requisitos, herramientas y configuraciones necesarias para desarrollar bloques personalizados de Gutenberg dentro del tema **"Día de las Empresas del Bosque"**.

El objetivo es mantener un entorno de desarrollo estandarizado que facilite la colaboración y el mantenimiento del proyecto.

> 💡 **Nota:** El desarrollo de bloques Gutenberg combina tecnologías de WordPress (PHP) con React y el ecosistema moderno de JavaScript. Es recomendable tener conocimientos básicos de ambos.

---

## Requisitos

### Servidor Local

Para desarrollar en WordPress de manera local se requiere un servidor que soporte PHP y MySQL. Las opciones recomendadas son:

| Herramienta          | Plataforma              | Descripción |
|----------------------|-------------------------|-------------|
| **XAMPP**            | Windows / macOS / Linux | ✅ La opción más usada. Incluye Apache, PHP y MariaDB. |
| **Local (Flywheel)** | Windows / macOS         | Diseñado específicamente para WordPress. Interfaz gráfica. |
| **Laragon**          | Windows                 | Rápido y ligero. Soporta múltiples versiones de PHP. |
| **DevKinsta**        | Windows / macOS         | Basado en Docker. Ideal para entornos aislados. |


### Versiones Requeridas

- **WordPress:** 6.0 o superior (recomendado: última versión estable)
- **PHP:** 8.0 o superior
- **MySQL / MariaDB:** 5.7 / 10.3 o superior
- **Node.js:** 18.x LTS o superior
- **npm:** 9.x o superior (incluido con Node.js)
- **Bootstrap:** 5.x

---

## Instalación

### 1. Clonar el Tema

```bash
# Clonar en wp-content/themes/
cd wp-content/themes/
git clone https://github.com/AlbertoReforestamos2022/D-a-de-las-empresas-del-bosque.git
```

### 2. Instalar Dependencias

```bash
cd diadelasempresasdelbosque
npm install
```

### 3. Verificar Node.js y npm

```bash
# Verificar versiones instaladas
node --version   # Debe mostrar v18.x.x o superior
npm --version    # Debe mostrar 9.x o superior
```

### 4. Compilar Bloques

```bash
# Desarrollo (con watch)
npm run start

# Producción (minificado)
npm run build
```

---

## Estructura del Proyecto

```
diadelasempresasdelbosque/
├── style.css              <- Metadata del tema (obligatorio)
├── functions.php          <- Registro de bloques y estilos
├── index.php              <- Template principal
├── package.json           <- Configuración de npm
├── package-lock.json      <- Lock de versiones (no editar)
│
├── src/
│   └── index.js           <- Punto de entrada (importa todos los bloques)
│
├── blocks/
│   ├── hero-carousel/
│   │   ├── block.json     <- Metadata del bloque
│   │   ├── index.js       <- Registra el bloque
│   │   ├── edit.js        <- Interfaz del editor
│   │   ├── save.js        <- HTML del frontend
│   │   └── style.scss     <- Estilos del bloque
│   └── [otros-bloques]/
│
├── build/
│   ├── index.js           <- Compilado (generado automáticamente)
│   ├── index.asset.php    <- Dependencias (generado automáticamente)
│   └── style-index.css    <- CSS compilado (generado automáticamente)
│
├── assets/
│   ├── css/
│   │   └── bootstrap.min.css
│   └── js/
│       └── bootstrap.bundle.min.js
│
└── node_modules/          <- Dependencias npm (NO subir a git)
```

>  **Importante:** La carpeta `/build` se genera automáticamente al correr `npm run build`. Nunca edites archivos en `/build` directamente. La carpeta `/node_modules` tampoco debe subirse a Git.

---

## Configuración

### package.json

Este es el `package.json` que debe estar en la raíz del tema:

```json
{
  "name": "diadelasempresasdelbosque",
  "version": "1.0.0",
  "description": "Tema WordPress - Día de las Empresas del Bosque",
  "scripts": {
    "start": "wp-scripts start",
    "build": "wp-scripts build",
    "lint:js": "wp-scripts lint-js",
    "lint:css": "wp-scripts lint-style"
  },
  "devDependencies": {
    "@wordpress/scripts": "^27.0.0"
  },
  "dependencies": {}
}
```

### functions.php

#### Registro Automático de Bloques

```php
<?php

// Registrar todos los bloques automáticamente
function deb_register_blocks() {
    foreach ( glob( get_theme_file_path( 'blocks/*/block.json' ) ) as $block_json ) {
        register_block_type( $block_json );
    }
}
add_action( 'init', 'deb_register_blocks' );
```

#### Encolar Estilos Compilados

```php
// Encolar el CSS compilado de los bloques
function deb_enqueue_block_assets() {
    if ( file_exists( get_theme_file_path( 'build/style-index.css' ) ) ) {
        wp_enqueue_style(
            'deb-blocks-style',
            get_theme_file_uri( 'build/style-index.css' ),
            array(),
            filemtime( get_theme_file_path( 'build/style-index.css' ) )
        );
    }
}
add_action( 'wp_enqueue_scripts', 'deb_enqueue_block_assets' );
```

#### Encolar Bootstrap

```php
// Encolar Bootstrap CSS y JS
function deb_enqueue_bootstrap() {
    wp_enqueue_style(
        'bootstrap',
        get_theme_file_uri( 'assets/css/bootstrap.min.css' ),
        array(),
        '5.3.0'
    );
    wp_enqueue_script(
        'bootstrap',
        get_theme_file_uri( 'assets/js/bootstrap.bundle.min.js' ),
        array(),
        '5.3.0',
        true // Cargar en el footer
    );
}
add_action( 'wp_enqueue_scripts', 'deb_enqueue_bootstrap' );
```

### Encolar Bootstrap CDN 
```php

# Agregar Bootstrap desde CDN
function deb_enqueue_bootstrap_cdn() {
    wp_enqueue_style('boostrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css', array(), null ); 
    wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', array(), null, true);
}
add_action('init', 'deb_enqueue_bootstrap_cdn'); 

```

#### Categorías Personalizadas

```php
// Crear categoría personalizada en el editor Gutenberg
function deb_custom_block_categories( $categories ) {
    return array_merge(
        array(
            array(
                'slug'  => 'deb-theme',
                'title' => 'Día de las Empresas del Bosque',
                'icon'  => 'admin-site-alt3',
            ),
        ),
        $categories
    );
}
add_filter( 'block_categories_all', 'deb_custom_block_categories', 10, 2 );
```

---

## Desarrollo de Bloques

### Estructura de block.json

Cada bloque debe tener un archivo `block.json` que define su configuración y atributos:

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "deb/nombre-del-bloque",
  "title": "Nombre del Bloque",
  "category": "deb-theme",
  "icon": "admin-site-alt3",
  "description": "Descripción breve del bloque",
  "keywords": ["keyword1", "keyword2"],
  "textdomain": "diadelasempresasdelbosque",
  "editorScript": "file:./index.js",
  "style": "file:./style-index.css",
  "attributes": {
    "miAtributo": {
      "type": "string",
      "default": ""
    }
  },
  "supports": {
    "html": false,
    "align": ["full", "wide"]
  }
}
```

### Tipos de Atributos Disponibles

| Tipo      | Ejemplo de uso         | Descripción |
|-----------|------------------------|-------------|
| `string`  | Título, texto          | Texto plano o HTML simple |
| `number`  | Velocidad, tamaño      | Valores numéricos enteros o decimales |
| `boolean` | Activar/desactivar     | Valores verdadero/falso |
| `array`   | Lista de slides        | Colección de elementos |
| `object`  | Configuración compleja | Objeto con múltiples propiedades |

### Paquetes de @wordpress/*

Cuando instalas `@wordpress/scripts`, muchos paquetes de WordPress ya están disponibles. Los más utilizados:

|    Paquete                | Importación                  | Para qué sirve |
|---------------------------|------------------------------|----------------|
| `@wordpress/blocks`       | `registerBlockType`          | Registrar nuevos bloques |
| `@wordpress/block-editor` | `useBlockProps, RichText...` | Componentes del editor |
| `@wordpress/components`   | `Button, TextControl...`     | Componentes UI de WP |
| `@wordpress/i18n`         | `__(), _n()`                 | Internacionalización de textos |
| `@wordpress/element`      | `useState, useEffect`        | Hooks de React (re-exportados) |
| `@wordpress/data`         | `useSelect, useDispatch`     | Estado global de WordPress |

> 💡 **Tip:** Estos paquetes NO necesitan instalarse con npm. WordPress los provee en el frontend a través de `wp_enqueue_script`.

### Ejemplo de importaciones en save.js
```javascript
    // save.js
    import { useBlockProps, RichText } from '@wordpress/block-editor'; 


```

### Ejemplo de imporaciones en edit.js
```javascript
    // edit.js
    import { __ } from '@wordpress/i18n';
    import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
    import { PanelBody, Button, TextControl, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

```

### Ejemplo de importaciones en edit.js

```javascript
    // index.js
    import { registerBlockType } from '@wordpress/blocks';
    import Edit from './edit';
    import save from './save';
    import './style.scss';
    import metadata from './block.json';

    registerBlockType(metadata.name, { 
        Edit: edit, 
        save: save
    });

```

### Crear un Nuevo Bloque

Sigue estos pasos para agregar un nuevo bloque al tema:

1. Crear la carpeta del bloque en `/blocks/nombre-bloque/`
2. Crear los archivos: `block.json`, `index.js`, `edit.js`, `save.js`, `style.scss`
3. Importar el bloque en `src/index.js`:
   ```javascript
   // src/index.js
   import '../blocks/hero-carousel';
   import '../blocks/sobre-nosotros';
   import '../blocks/nuevo-bloque'; // ← Agregar aquí
   ```
4. Ejecutar `npm run build` para compilar
5. Limpiar caché del navegador y verificar en el editor

### Diferencia entre edit.js y save.js

| Aspecto                  | edit.js                           | save.js |
|--------------------------|-----------------------------------|---------|
| **¿Dónde se ejecuta?**   | En el editor de WordPress         | En el frontend del sitio |
| **¿Puede tener estado?** | Sí, con `useState`                | No, es estático |
| **¿Puede usar hooks?**   | Sí (React hooks)                  | No |
| **Propósito**            | Interfaz de edición con controles | HTML guardado en la base de datos |

> ⚠️ **Importante:** Si modificas `save.js` en un bloque ya publicado, WordPress mostrará un error de "bloque inválido" en las páginas que lo usen. En ese caso, deberás hacer una "deprecation" del bloque para migrar el contenido antiguo.

---

## Comandos npm

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run start` | Modo desarrollo con watch. Recompila automáticamente al guardar cambios. |
| `npm run build` | Genera los archivos de producción optimizados en la carpeta `/build`. |
| `npm run lint:js` | Analiza el código JavaScript en busca de errores o malas prácticas. |
| `npm run lint:css` | Analiza los archivos SCSS/CSS en busca de errores de estilo. |

### Modo Desarrollo vs Producción

| Aspecto | `npm run start` (dev) | `npm run build` (prod) |
|---------|----------------------|------------------------|
| **Velocidad** | Compilación incremental (rápida) | Compilación completa (más lenta) |
| **Tamaño del archivo** | Sin minificar (más grande) | Minificado (más pequeño) |
| **Source maps** | Sí (para debug) | No |
| **Watch** | Sí, recompila al guardar | No |
| **Uso recomendado** | Durante el desarrollo | Antes de subir a producción |

---

## Bootstrap 5

### Integración con Bootstrap

Este tema usa Bootstrap 5 para los componentes de JavaScript como el Carousel. Es importante entender cómo coexisten Bootstrap y los estilos de los bloques.

### Cómo Cargar Bootstrap

Bootstrap debe cargarse como asset del tema, no desde CDN externo (por rendimiento y disponibilidad offline):

```
diadelasempresasdelbosque/
└── assets/
    ├── css/
    │   └── bootstrap.min.css
    └── js/
        └── bootstrap.bundle.min.js  ← Incluye Popper.js
```

> ⚠️ **Importante:** Usa siempre `bootstrap.bundle.min.js` (no `bootstrap.min.js`). La versión bundle incluye Popper.js que es necesario para componentes como Carousel, Tooltips y Dropdowns.

### Clases Bootstrap en Bloques Gutenberg

En el archivo `save.js` de los bloques se pueden usar directamente las clases de Bootstrap:

```javascript
// save.js - Usar clases Bootstrap directamente
export default function save({ attributes }) {
    return (
        <div
            id="mi-carousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="5000"
        >
            <div className="carousel-inner">
                {/* slides... */}
            </div>
        </div>
    );
}
```

---

## Bloques Disponibles

| Nombre | Slug | Descripción | Estado |
|--------|------|-------------|--------|
| **Hero Carousel** | `deb/hero-carousel` | Carrusel de imágenes con texto y botones opcionales. Usa Bootstrap Carousel. | ✅ Listo |

> 💡 **Nota:** Esta tabla se irá actualizando conforme se agreguen nuevos bloques al tema.

---

## Solución de Problemas

### El bloque no aparece en el editor

1. Verifica que esté importado en `src/index.js`
2. Ejecuta `npm run build`
3. Limpia caché del navegador

### Error "Block is invalid"

- **Causa:** Cambiaste `save.js` sin agregar deprecations
- **Solución:** Debes crear una migración del bloque antiguo al nuevo

### Estilos no se aplican

1. Ejecuta `npm run build`
2. Verifica que `style-index.css` exista en `build/`
3. Asegúrate de que Bootstrap CSS esté cargado ANTES de tus estilos
4. Limpia caché del sitio

### Bootstrap no funciona

1. Verifica que `bootstrap.bundle.min.js` esté cargado en `functions.php`
2. Abre la consola del navegador (F12)
3. Busca errores de Bootstrap o JavaScript
4. Asegúrate de que los atributos `data-bs-*` estén presentes en el HTML

### El carrusel no avanza automáticamente

1. Verifica que Bootstrap JS esté cargado
2. Asegúrate de que auto-play esté activado en la configuración del bloque
3. Revisa que `data-bs-ride="carousel"` esté presente en el HTML
4. Verifica en consola si hay errores JavaScript

---

## .gitignore Recomendado

Estos archivos y carpetas NO deben subirse al repositorio:

```gitignore
# .gitignore del tema
node_modules/
build/
.cache/
*.log
```

---

## 📚 Referencias

- [Documentación oficial de Gutenberg](https://developer.wordpress.org/block-editor/)
- [Referencia de @wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts)
- [Documentación de Bootstrap 5](https://getbootstrap.com/docs/5.3/)
- [Editor en línea de bloques Gutenberg](https://playground.wordpress.net/)

---
