import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, contenido, imagen, imagenAlt, imagenPosicion, showButton, buttonText, buttonUrl } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5'
    });

    const isImageRight = imagenPosicion === 'right';

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configuración', 'diadelasempresasdelbosque')}>
                    <SelectControl
                        label={__('Posición de la imagen', 'diadelasempresasdelbosque')}
                        value={imagenPosicion}
                        options={[
                            { label: 'Izquierda', value: 'left' },
                            { label: 'Derecha', value: 'right' }
                        ]}
                        onChange={(value) => setAttributes({ imagenPosicion: value })}
                    />

                    <ToggleControl
                        label={__('Mostrar botón', 'diadelasempresasdelbosque')}
                        checked={showButton}
                        onChange={(value) => setAttributes({ showButton: value })}
                    />

                    {showButton && (
                        <>
                            <TextControl
                                label={__('Texto del botón', 'diadelasempresasdelbosque')}
                                value={buttonText}
                                onChange={(value) => setAttributes({ buttonText: value })}
                            />

                            <TextControl
                                label={__('URL del botón', 'diadelasempresasdelbosque')}
                                value={buttonUrl}
                                onChange={(value) => setAttributes({ buttonUrl: value })}
                                placeholder="https://..."
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Imagen', 'diadelasempresasdelbosque')}>
                    <MediaUpload
                        onSelect={(media) => {
                            setAttributes({ 
                                imagen: media.url,
                                imagenAlt: media.alt || ''
                            });
                        }}
                        allowedTypes={['image']}
                        value={imagen}
                        render={({ open }) => (
                            <div>
                                {imagen ? (
                                    <div>
                                        <img 
                                            src={imagen} 
                                            alt={imagenAlt} 
                                            style={{ width: '100%', marginBottom: '8px' }} 
                                        />
                                        <Button onClick={open} variant="secondary" className="mb-2">
                                            Cambiar imagen
                                        </Button>
                                        <br />
                                        <Button 
                                            isDestructive 
                                            onClick={() => setAttributes({ imagen: '', imagenAlt: '' })}
                                        >
                                            Eliminar imagen
                                        </Button>
                                    </div>
                                ) : (
                                    <Button onClick={open} variant="primary">
                                        Seleccionar imagen
                                    </Button>
                                )}
                            </div>
                        )}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="row align-items-center g-4">
                        {/* Columna de texto */}
                        <div className={`col-lg-6 ${!isImageRight ? 'order-lg-2' : ''}`}>
                            <RichText
                                tagName="h2"
                                className="display-5 fw-bold mb-4"
                                value={titulo}
                                onChange={(value) => setAttributes({ titulo: value })}
                                placeholder="Título de la sección"
                            />

                            <RichText
                                tagName="div"
                                className="contenido-texto mb-4"
                                value={contenido}
                                onChange={(value) => setAttributes({ contenido: value })}
                                placeholder="Escribe el contenido aquí..."
                            />

                            {showButton && (
                                <a href={buttonUrl} className="btn btn-primary-custom">
                                    {buttonText}
                                </a>
                            )}
                        </div>

                        {/* Columna de imagen */}
                        <div className={`col-lg-6 ${!isImageRight ? 'order-lg-1' : ''}`}>
                            {imagen ? (
                                <img 
                                    src={imagen} 
                                    alt={imagenAlt} 
                                    className="img-fluid rounded shadow"
                                />
                            ) : (
                                <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                                    <span className="text-muted">Selecciona una imagen desde el Inspector</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}