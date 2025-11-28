import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, ColorPalette } from "@wordpress/block-editor"; 
import { PanelBody, Button, Placeholder, TextControl } from "@wordpress/components"; 

export default function Edit({ attributes, setAttributes }){
    const { titulo, descripcion } = attributes; 

    const blockProps = useBlockProps({
        className : 'py-5',
        id: 'about',

    }); 

    const onChangeBGColor = ( hexColor ) => {
        setAttributes( {bg_color: hexColor } );
    }; 

    const onChangeTextColor = ( hexColor ) => {
        setAttributes( {text_color: hexColor} ) ;
    }; 

    return(
        <>
            {/** Agregar opcion fondo de sección */}
            <InspectorControls key="setting">
                <div>
                    <fieldset>
                        <legend className="blocks-base-control__label">
                            { __('Background color', 'block-development-examples') }
                        </legend>
                        
                        <ColorPalette
                            onChange={ onChangeBGColor }
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="blocks-base-control__label">
                            { __('Text color', 'block-development-examples') }
                        </legend>

                        <ColorPalette
                            onChange={ onChangeTextColor }
                        />
                    </fieldset>
                </div>
            </InspectorControls>
            <TextControl
                __nextHasNoMarginBottom
                __next40pxDefaultSize
                value={ attributes.message }
                onChange={ ( val ) => setAttributes( { message: val } ) }

                style={
                    {
                        backgroundColor: attributes.bg_color,
                        color: attributes.text_color,
                    }
                }
            />

            <section { ...blockProps}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <RichText 
                                tagName="h2"
                                className="display-5 fw-bold mb-4"
                                value={ titulo }
                                onChange={value => setAttributes({ titulo: value })}
                                Placeholder="Escribe un titulo"
                            />

                            <RichText
                                tagName="p"
                                className="mb-3"
                                value={ descripcion }
                                onChange={value=> setAttributes({ descripcion: value })}
                                placeholder="Escribe una descrpción"
                            />
                        </div>
                    </div>
                </div> 
            </section>

        </>
    );


} 