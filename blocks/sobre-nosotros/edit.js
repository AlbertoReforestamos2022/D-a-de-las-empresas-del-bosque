import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor"; 
import { PanelBody, Button, Placeholder } from "@wordpress/components"; 

export default function Edit({ attributes, setAttributes }){
    const { titulo, descripcion } = attributes; 

    const blockProps = useBlockProps({
        className : 'py-5',
        id: 'about',

    }); 

    return(
        <>
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