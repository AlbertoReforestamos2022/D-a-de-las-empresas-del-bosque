import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, ToggleControl, RangeControl, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        titulo, 
        descripcion, 
        imagenes,
        showControls,
        showIndicators,
        autoplay,
        interval,
        backgroundColor,
        tituloColor,
        descripcionColor,
        captionBgColor,
        captionTextColor,
        tituloFontSize,
        descripcionFontSize,
        textAlign
    } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
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

    const carouselId = `carousel-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <>
            <InspectorControls>
                {/* Colores */}
                <PanelColorSettings
                    title={__('Colores', 'diadelasempresasdelbosque')}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Color de fondo', 'diadelasempresasdelbosque')
                        },
                        {
                            value: tituloColor,
                            onChange: (color) => setAttributes({ tituloColor: color }),
                            label: __('Color del título', 'diadelasempresasdelbosque')
                        },
                        {
                            value: descripcionColor,
                            onChange: (color) => setAttributes({ descripcionColor: color }),
                            label: __('Color de la descripción', 'diadelasempresasdelbosque')
                        },
                        {
                            value: captionBgColor,
                            onChange: (color) => setAttributes({ captionBgColor: color }),
                            label: __('Fondo de los captions', 'diadelasempresasdelbosque')
                        },
                        {
                            value: captionTextColor,
                            onChange: (color) => setAttributes({ captionTextColor: color }),
                            label: __('Texto de los captions', 'diadelasempresasdelbosque')
                        }
                    ]}
                />

                {/* Tipografía */}
                <PanelBody title={__('Tipografía', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <RangeControl
                        label={__('Tamaño del título (px)', 'diadelasempresasdelbosque')}
                        value={tituloFontSize}
                        onChange={(value) => setAttributes({ tituloFontSize: value })}
                        min={20}
                        max={80}
                    />

                    <RangeControl
                        label={__('Tamaño de la descripción (px)', 'diadelasempresasdelbosque')}
                        value={descripcionFontSize}
                        onChange={(value) => setAttributes({ descripcionFontSize: value })}
                        min={12}
                        max={32}
                    />

                    <SelectControl
                        label={__('Alineación del encabezado', 'diadelasempresasdelbosque')}
                        value={textAlign}
                        options={[
                            { label: 'Izquierda', value: 'left' },
                            { label: 'Centro', value: 'center' },
                            { label: 'Derecha', value: 'right' }
                        ]}
                        onChange={(value) => setAttributes({ textAlign: value })}
                    />
                </PanelBody>

                {/* Configuración del Carrusel */}
                <PanelBody title={__('Configuración del Carrusel', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <ToggleControl
                        label={__('Mostrar controles', 'diadelasempresasdelbosque')}
                        checked={showControls}
                        onChange={(value) => setAttributes({ showControls: value })}
                    />

                    <ToggleControl
                        label={__('Mostrar indicadores', 'diadelasempresasdelbosque')}
                        checked={showIndicators}
                        onChange={(value) => setAttributes({ showIndicators: value })}
                    />

                    <ToggleControl
                        label={__('Autoplay', 'diadelasempresasdelbosque')}
                        checked={autoplay}
                        onChange={(value) => setAttributes({ autoplay: value })}
                    />

                    {autoplay && (
                        <RangeControl
                            label={__('Intervalo (ms)', 'diadelasempresasdelbosque')}
                            value={interval}
                            onChange={(value) => setAttributes({ interval: value })}
                            min={2000}
                            max={10000}
                            step={500}
                        />
                    )}
                </PanelBody>

                {/* Imágenes */}
                <PanelBody title={__('Imágenes', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addImagen}
                        className="mb-3"
                    >
                        {__('Agregar Imagen', 'diadelasempresasdelbosque')}
                    </Button>

                    {imagenes.map((imagen, index) => (
                        <div key={index} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
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
                                    <div className="mb-3">
                                        {imagen.url ? (
                                            <div>
                                                <img src={imagen.url} alt={imagen.alt} style={{ width: '100%', marginBottom: '8px', borderRadius: '4px' }} />
                                                <div className="d-flex gap-2">
                                                    <Button onClick={open} variant="secondary" isSmall>Cambiar</Button>
                                                    <Button 
                                                        onClick={() => updateImagen(index, 'url', '')}
                                                        isDestructive
                                                        isSmall
                                                    >
                                                        Quitar
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button onClick={open} variant="primary">Seleccionar imagen</Button>
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
                                label={__('Caption (opcional)', 'diadelasempresasdelbosque')}
                                value={imagen.caption}
                                onChange={(value) => updateImagen(index, 'caption', value)}
                                placeholder="Descripción de la imagen"
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="text-center mb-5" style={{ textAlign: textAlign }}>
                        <RichText
                            tagName="h2"
                            className="section-title mb-3"
                            value={titulo}
                            onChange={(value) => setAttributes({ titulo: value })}
                            placeholder="Título"
                            style={{
                                color: tituloColor,
                                fontSize: `${tituloFontSize}px`
                            }}
                        />
                        <RichText
                            tagName="p"
                            className="section-description"
                            value={descripcion}
                            onChange={(value) => setAttributes({ descripcion: value })}
                            placeholder="Descripción"
                            style={{
                                color: descripcionColor,
                                fontSize: `${descripcionFontSize}px`
                            }}
                        />
                    </div>

                    <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
                        {showIndicators && imagenes.length > 1 && (
                            <div className="carousel-indicators">
                                {imagenes.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target={`#${carouselId}`}
                                        data-bs-slide-to={index}
                                        className={index === 0 ? 'active' : ''}
                                    ></button>
                                ))}
                            </div>
                        )}

                        <div className="carousel-inner">
                            {imagenes.map((imagen, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={imagen.url} className="d-block w-100" alt={imagen.alt} />
                                    {imagen.caption && (
                                        <div 
                                            className="carousel-caption"
                                            style={{
                                                background: captionBgColor,
                                                color: captionTextColor
                                            }}
                                        >
                                            <p>{imagen.caption}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {showControls && imagenes.length > 1 && (
                            <>
                                <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon"></span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                                    <span className="carousel-control-next-icon"></span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}