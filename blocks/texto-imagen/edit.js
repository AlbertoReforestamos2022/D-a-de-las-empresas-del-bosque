import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, SelectControl, RangeControl, ToggleControl, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        titulo, 
        contenido, 
        imagen,
        imagenAlt,
        imagenPosicion,
        showButton,
        buttonText,
        buttonUrl,
        backgroundColor,
        tituloColor,
        contenidoColor,
        buttonBgColor,
        buttonTextColor,
        tituloFontSize,
        contenidoFontSize,
        tituloFontWeight,
        contenidoFontWeight,
        textAlign
    } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const textoClasses = imagenPosicion === 'left' ? 'col-lg-6 mb-4 mb-lg-0 order-lg-2' : 'col-lg-6 mb-4 mb-lg-0';
    const imagenClasses = imagenPosicion === 'left' ? 'col-lg-6 order-lg-1' : 'col-lg-6';

    const fontWeightOptions = [
        { label: 'Delgada (300)', value: '300' },
        { label: 'Normal (400)', value: '400' },
        { label: 'Media (500)', value: '500' },
        { label: 'Semi-negrita (600)', value: '600' },
        { label: 'Negrita (700)', value: '700' },
        { label: 'Extra-negrita (800)', value: '800' }
    ];

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
                            value: contenidoColor,
                            onChange: (color) => setAttributes({ contenidoColor: color }),
                            label: __('Color del contenido', 'diadelasempresasdelbosque')
                        },
                        {
                            value: buttonBgColor,
                            onChange: (color) => setAttributes({ buttonBgColor: color }),
                            label: __('Color de fondo del botón', 'diadelasempresasdelbosque')
                        },
                        {
                            value: buttonTextColor,
                            onChange: (color) => setAttributes({ buttonTextColor: color }),
                            label: __('Color del texto del botón', 'diadelasempresasdelbosque')
                        }
                    ]}
                />

                {/* Tipografía del Título */}
                <PanelBody title={__('Tipografía del Título', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <RangeControl
                        label={__('Tamaño de fuente (px)', 'diadelasempresasdelbosque')}
                        value={tituloFontSize}
                        onChange={(value) => setAttributes({ tituloFontSize: value })}
                        min={20}
                        max={72}
                    />

                    <SelectControl
                        label={__('Peso de fuente', 'diadelasempresasdelbosque')}
                        value={tituloFontWeight}
                        options={fontWeightOptions}
                        onChange={(value) => setAttributes({ tituloFontWeight: value })}
                    />
                </PanelBody>

                {/* Tipografía del Contenido */}
                <PanelBody title={__('Tipografía del Contenido', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <RangeControl
                        label={__('Tamaño de fuente (px)', 'diadelasempresasdelbosque')}
                        value={contenidoFontSize}
                        onChange={(value) => setAttributes({ contenidoFontSize: value })}
                        min={12}
                        max={28}
                    />

                    <SelectControl
                        label={__('Peso de fuente', 'diadelasempresasdelbosque')}
                        value={contenidoFontWeight}
                        options={fontWeightOptions}
                        onChange={(value) => setAttributes({ contenidoFontWeight: value })}
                    />

                    <SelectControl
                        label={__('Alineación del texto', 'diadelasempresasdelbosque')}
                        value={textAlign}
                        options={[
                            { label: 'Izquierda', value: 'left' },
                            { label: 'Centro', value: 'center' },
                            { label: 'Derecha', value: 'right' },
                            { label: 'Justificado', value: 'justify' }
                        ]}
                        onChange={(value) => setAttributes({ textAlign: value })}
                    />
                </PanelBody>

                {/* Layout */}
                <PanelBody title={__('Layout', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <SelectControl
                        label={__('Posición de la imagen', 'diadelasempresasdelbosque')}
                        value={imagenPosicion}
                        options={[
                            { label: 'Derecha', value: 'right' },
                            { label: 'Izquierda', value: 'left' }
                        ]}
                        onChange={(value) => setAttributes({ imagenPosicion: value })}
                    />
                </PanelBody>

                {/* Imagen */}
                <PanelBody title={__('Imagen', 'diadelasempresasdelbosque')} initialOpen={true}>
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
                                            style={{ width: '100%', marginBottom: '8px', borderRadius: '8px' }} 
                                        />
                                        <div className="d-flex gap-2">
                                            <Button onClick={open} variant="secondary">
                                                Cambiar imagen
                                            </Button>
                                            <Button 
                                                onClick={() => setAttributes({ imagen: '' })}
                                                isDestructive
                                            >
                                                Quitar imagen
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Button onClick={open} variant="primary">
                                        Seleccionar imagen
                                    </Button>
                                )}
                            </div>
                        )}
                    />

                    <TextControl
                        label={__('Texto alternativo', 'diadelasempresasdelbosque')}
                        value={imagenAlt}
                        onChange={(value) => setAttributes({ imagenAlt: value })}
                        className="mt-3"
                    />
                </PanelBody>

                {/* Botón */}
                <PanelBody title={__('Botón CTA', 'diadelasempresasdelbosque')} initialOpen={false}>
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
                                placeholder="https://ejemplo.com"
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className={textoClasses}>
                            <RichText
                                tagName="h2"
                                className="mb-4"
                                value={titulo}
                                onChange={(value) => setAttributes({ titulo: value })}
                                placeholder="Título de la sección"
                                style={{
                                    color: tituloColor,
                                    fontSize: `${tituloFontSize}px`,
                                    fontWeight: tituloFontWeight,
                                    textAlign: textAlign
                                }}
                            />
                            
                            <RichText
                                tagName="div"
                                className="contenido mb-4"
                                value={contenido}
                                onChange={(value) => setAttributes({ contenido: value })}
                                placeholder="Escribe el contenido aquí..."
                                style={{
                                    color: contenidoColor,
                                    fontSize: `${contenidoFontSize}px`,
                                    fontWeight: contenidoFontWeight,
                                    textAlign: textAlign
                                }}
                            />

                            {showButton && (
                                <a 
                                    href={buttonUrl} 
                                    className="btn btn-custom"
                                    style={{
                                        backgroundColor: buttonBgColor,
                                        color: buttonTextColor
                                    }}
                                >
                                    {buttonText}
                                </a>
                            )}
                        </div>
                        
                        <div className={imagenClasses}>
                            {imagen ? (
                                <img src={imagen} alt={imagenAlt} className="img-fluid rounded shadow-lg" />
                            ) : (
                                <div 
                                    className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                    style={{ height: '400px' }}
                                >
                                    <span className="text-white">Selecciona una imagen</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}