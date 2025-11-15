import { useBlockProps, RichText, MediaUpload, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes}) {
    const { titulo, descripcion, imagenFondo } = attributes;

    const blockProps = useBlockProps({ 
        className: 'hero-section d-flex align-items-center justify-content-center text-center',
        style: {
            backgroundImage: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5)), url(${imagenFondo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '80vh'
        }
     }); 


     return(
        <>
            <InspectorControls>
                <PanelBody title="Imagen de fondo">
                    <MediaUpload
                        onSelect={(media) => setAttributes({ imagenFondo: media.url })}
                        allowedTypes={['image']}
                        render={({ open }) => (
                            <Button onClick={open} variant="secondary">
                                Cambiar imagen
                            </Button>
                        )}
                    />
                </PanelBody>

            </InspectorControls>


            <section { ...blockProps }>
                <div className="container">
                        <RichText 
                            tagName="h1"
                            className="display-3 fw-black text-white mb-4"
                            value={titulo}
                            onChange={(value) => setAttributes({  titulo: value  })}
                            placeholder="Escribe el titulo"
                        />

                        <RichText 
                            tagName="p"
                            className="lead text-white mb-4"
                            value={ descripcion }
                            onChange={(value) => setAttributes({ descripcion: value  })}
                            placeholder="Escribe la descripcion"
                        />
                </div>
            </section>
        </>
     );


}