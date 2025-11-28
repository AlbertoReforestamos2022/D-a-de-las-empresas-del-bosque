import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, ToggleControl, RangeControl, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { imagenes, showControls, showIndicators, autoplay, interval } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5'
    });

    const updateImagen = (index, field, value) => {
        const newImagenes = [...imagenes];
        newImagenes[index][field] = value;
        setAttributes({ imagenes: newImagenes });
    };

    const addImagen = () => {
        const newImagenes = [...imagenes, { url: '', alt: '', caption: '' }];
        setAttributes({ imagenes: newImagenes });
    };

    const removeImagen = (index) => {
        const newImagenes = imagenes.filter((_, i) => i !== index);
        setAttributes({ imagenes: newImagenes });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configuración del Carrusel', 'diadelasempresasdelbosque')}>
                    <ToggleControl
                        label={__('Mostrar controles (flechas)', 'diadelasempresasdelbosque')}
                        checked={showControls}
                        onChange={(value) => setAttributes({ showControls: value })}
                    />

                    <ToggleControl
                        label={__('Mostrar indicadores', 'diadelasempresasdelbosque')}
                        checked={showIndicators}
                        onChange={(value) => setAttributes({ showIndicators: value })}
                    />

                    <ToggleControl
                        label={__('Reproducción automática', 'diadelasempresasdelbosque')}
                        checked={autoplay}
                        onChange={(value) => setAttributes({ autoplay: value })}
                    />

                    {autoplay && (
                        <RangeControl
                            label={__('Intervalo (milisegundos)', 'diadelasempresasdelbosque')}
                            value={interval}
                            onChange={(value) => setAttributes({ interval: value })}
                            min={1000}
                            max={10000}
                            step={500}
                        />
                    )}
                </PanelBody>

                <PanelBody title={__('Imágenes', 'diadelasempresasdelbosque')} initialOpen={true}>
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
                                                <Button onClick={open} variant="secondary" className="mb-2">
                                                    Cambiar imagen
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button onClick={open} variant="primary" className="mb-2">
                                                Seleccionar imagen
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />

                            <TextControl
                                label={__('Texto alternativo', 'diadelasempresasdelbosque')}
                                value={imagen.alt}
                                onChange={(value) => updateImagen(index, 'alt', value)}
                            />

                            <TextControl
                                label={__('Texto de descripción (opcional)', 'diadelasempresasdelbosque')}
                                value={imagen.caption}
                                onChange={(value) => updateImagen(index, 'caption', value)}
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div id="carouselPreview" className="carousel slide">
                        {showIndicators && (
                            <div className="carousel-indicators">
                                {imagenes.map((_, index) => (
                                    <button 
                                        key={index}
                                        type="button" 
                                        className={index === 0 ? 'active' : ''}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        )}

                        <div className="carousel-inner">
                            {imagenes.map((imagen, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    {imagen.url ? (
                                        <img 
                                            src={imagen.url} 
                                            className="d-block w-100" 
                                            alt={imagen.alt}
                                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                                            <span className="text-muted">Sin imagen</span>
                                        </div>
                                    )}
                                    {imagen.caption && (
                                        <div className="carousel-caption d-none d-md-block">
                                            <p>{imagen.caption}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {showControls && (
                            <>
                                <button className="carousel-control-prev" type="button">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Anterior</span>
                                </button>
                                <button className="carousel-control-next" type="button">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Siguiente</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}