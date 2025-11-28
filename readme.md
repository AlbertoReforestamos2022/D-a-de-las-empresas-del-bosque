<h1> Día de las empresas del Bosque</h1>

<ul>
    <li>1. Antes de clonar el repositorio, hay que tener instalado nodeJS y npm. </li>
    <li>
        2. Iniciar el proyecto con 
        <ul>
            <li>node init <li>
        </ul>
    </li>
    <li>
        3. Instalar las dependencias de node con
        <ul>
            <li>node install<li>
        </ul>        
    </li>
    <li>
        4. Instalar Wordpress Scripts
        <ul>
            <li>npm install @wordpress/script --save-dev <li>
        </ul>          
    </li>
</ul>

<p> Agregar en el archivo 'package.json' los siguientes bloques para generar la carpeta build/ con los estilos y script compilados. </p>
<em>
    "scripts": {
        "build": "wp-scripts build",
        "start": "wp-scripts start"
    }
</em>


<p> .... Continuara ..... </p>


    
