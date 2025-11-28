import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, descripcion, imagenes, velocidad } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5 bg-white overflow-hidden'
    });

    const updateImagen = (index, field, value) => {
        const newImagenes = [...imagenes];
        newImagenes[index][field] = value;
        setAttributes({ imagenes: newImagenes });
    };

    const addImagen = () => {
        const newImagenes = [...imagenes, { url: '', alt: '' }];
        setAttributes({ imagenes: newImagenes });
    };

    const removeImagen = (index) => {
        const newImagenes = imagenes.filter((_, i) => i !== index);
        setAttributes({ imagenes: newImagenes });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configuración de Galería', 'diadelasempresasdelbosque')}>
                    <RangeControl
                        label={__('Velocidad de animación (segundos)', 'diadelasempresasdelbosque')}
                        value={velocidad}
                        onChange={(value) => setAttributes({ velocidad: value })}
                        min={10}
                        max={60}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Imágenes', 'diadelasempresasdelbosque')}>
                    <Button 
                        variant="primary" 
                        onClick={addImagen}
                        className="mb-3"
                    >
                        {__('Agregar Imagen', 'diadelasempresasdelbosque')}
                    </Button>

                    {imagenes.map((imagen, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Imagen {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeImagen(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <MediaUpload
                                onSelect={(media) => {
                                    updateImagen(index, 'url', media.url);
                                    updateImagen(index, 'alt', media.alt || '');
                                }}
                                allowedTypes={['image']}
                                value={imagen.url}
                                render={({ open }) => (
                                    <div>
                                        {imagen.url ? (
                                            <div>
                                                <img 
                                                    src={imagen.url} 
                                                    alt={imagen.alt} 
                                                    style={{ width: '100%', marginBottom: '8px' }} 
                                                />
                                                <Button onClick={open} variant="secondary">
                                                    Cambiar imagen
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
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="text-center mb-5">
                        <RichText
                            tagName="h2"
                            className="display-5 fw-bold"
                            value={titulo}
                            onChange={(value) => setAttributes({ titulo: value })}
                            placeholder="Título de la galería"
                        />
                        <RichText
                            tagName="p"
                            className="lead text-muted"
                            value={descripcion}
                            onChange={(value) => setAttributes({ descripcion: value })}
                            placeholder="Descripción de la galería"
                        />
                    </div>

                    <div className="marquee-container">
                        <div className="marquee-content" style={{ animationDuration: `${velocidad}s` }}>
                            {imagenes.map((imagen, index) => (
                                <div key={index} className="card card-custom shadow-sm mx-3" style={{ minWidth: '320px' }}>
                                    {imagen.url ? (
                                        <img 
                                            src={imagen.url} 
                                            className="card-img-top" 
                                            style={{ height: '200px', objectFit: 'cover' }}
                                            alt={imagen.alt}
                                        />
                                    ) : (
                                        <div 
                                            className="card-img-top d-flex align-items-center justify-content-center bg-light" 
                                            style={{ height: '200px' }}
                                        >
                                            <span className="text-muted">Sin imagen</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* Duplicar para efecto infinito en preview */}
                            {imagenes.map((imagen, index) => (
                                <div key={`dup-${index}`} className="card card-custom shadow-sm mx-3" style={{ minWidth: '320px' }}>
                                    {imagen.url && (
                                        <img 
                                            src={imagen.url} 
                                            className="card-img-top" 
                                            style={{ height: '200px', objectFit: 'cover' }}
                                            alt={imagen.alt}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-center text-muted mt-3 small">
                        <em>Vista previa: La animación se verá en el frontend</em>
                    </p>
                </div>
            </section>
        </>
    );
}