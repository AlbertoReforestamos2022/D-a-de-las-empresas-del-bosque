import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, RangeControl, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        titulo, 
        descripcion, 
        items,
        backgroundColor,
        tituloColor,
        descripcionColor,
        lineColor,
        badgeColor,
        cardTextColor,
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

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setAttributes({ items: newItems });
    };

    const addItem = () => {
        const newItems = [...items, { year: '', texto: '', imagen: '' }];
        setAttributes({ items: newItems });
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setAttributes({ items: newItems });
    };

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
                            label: __('Color del título principal', 'diadelasempresasdelbosque')
                        },
                        {
                            value: descripcionColor,
                            onChange: (color) => setAttributes({ descripcionColor: color }),
                            label: __('Color de la descripción', 'diadelasempresasdelbosque')
                        },
                        {
                            value: lineColor,
                            onChange: (color) => setAttributes({ lineColor: color }),
                            label: __('Color de la línea', 'diadelasempresasdelbosque')
                        },
                        {
                            value: badgeColor,
                            onChange: (color) => setAttributes({ badgeColor: color }),
                            label: __('Color de los badges', 'diadelasempresasdelbosque')
                        },
                        {
                            value: cardTextColor,
                            onChange: (color) => setAttributes({ cardTextColor: color }),
                            label: __('Color del texto de cards', 'diadelasempresasdelbosque')
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

                {/* Items del Timeline */}
                <PanelBody title={__('Items del Timeline', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addItem}
                        className="mb-3"
                    >
                        {__('Agregar Item', 'diadelasempresasdelbosque')}
                    </Button>

                    {items.map((item, index) => (
                        <div key={index} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Item {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeItem(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Año', 'diadelasempresasdelbosque')}
                                value={item.year}
                                onChange={(value) => updateItem(index, 'year', value)}
                            />

                            <TextControl
                                label={__('Texto', 'diadelasempresasdelbosque')}
                                value={item.texto}
                                onChange={(value) => updateItem(index, 'texto', value)}
                            />

                            <MediaUpload
                                onSelect={(media) => updateItem(index, 'imagen', media.url)}
                                allowedTypes={['image']}
                                value={item.imagen}
                                render={({ open }) => (
                                    <div>
                                        <p><strong>{__('Imagen (opcional)', 'diadelasempresasdelbosque')}</strong></p>
                                        {item.imagen ? (
                                            <div>
                                                <img src={item.imagen} alt="" style={{ width: '100%', marginBottom: '8px' }} />
                                                <Button onClick={open} variant="secondary" isSmall>Cambiar</Button>
                                                <Button onClick={() => updateItem(index, 'imagen', '')} isDestructive isSmall>Quitar</Button>
                                            </div>
                                        ) : (
                                            <Button onClick={open} variant="secondary">Seleccionar imagen</Button>
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

                    <div className="timeline" style={{ '--line-color': lineColor, '--badge-color': badgeColor }}>
                        {items.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-marker" style={{ background: badgeColor }}></div>
                                    <div className={`timeline-content ${isLeft ? '' : 'timeline-content-right'}`} style={{ color: cardTextColor }}>
                                        <div className="timeline-year" style={{ color: badgeColor }}>{item.year}</div>
                                        {item.imagen && <img src={item.imagen} alt="" className="timeline-img" />}
                                        <p>{item.texto}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}