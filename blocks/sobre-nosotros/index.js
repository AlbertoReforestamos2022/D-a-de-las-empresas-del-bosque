import { registerBlockType } from '@wordpress/blokcs'
import Edit from './edit';
import Save from './save'; 
import '.../sobre-nosotros/style.scss'; 
import metadata from './block.json';

registerBlockType(metadata.name, {
    edit: Edit,
    save: Save,
});