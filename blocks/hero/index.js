import { registerBlockType } from '@wordpress/blocks'; 
import  Edit from './edit';
import  Save from './save'; 
import '../hero/style.scss';
import metadata from './block.json';

registerBlockType(metadata.name, {
    edit: Edit,
    save: Save,
});