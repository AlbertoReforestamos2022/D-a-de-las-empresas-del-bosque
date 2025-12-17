import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, RangeControl, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
    const { 
        titulo, 
        descripcion, 
        iniciativas,
        columnas,
        backgroundColor,
        tituloColor,
        descripcionColor,
        cardBgColor,
        cardTextColor,
        buttonBgColor,
        buttonTextColor,
        modalHeaderBg,
        modalHeaderText,
        tituloFontSize,
        descripcionFontSize,
        textAlign
    } = attributes;

    const [modalAbierto, setModalAbierto] = useState(null);

    const blockProps = useBlockProps({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const updateIniciativa = (index, field, value) => {
        const newIniciativas = [...iniciativas];
        newIniciativas[index][field] = value;
        setAttributes({ iniciativas: newIniciativas });
    };

    const addIniciativa = () => {
        const newIniciativas = [...iniciativas, {
            imagen: '',
            tamanioImgCard: 50, 
            tituloCard: '',
            tituloModal: '',
            contenidoModal: '<p>Descripción completa de la iniciativa...</p>',
            textoBoton: 'Saber más',
            textoCerrar: 'Cerrar'
        }];
        setAttributes({ iniciativas: newIniciativas });
    };

    const removeIniciativa = (index) => {
        const newIniciativas = iniciativas.filter((_, i) => i !== index);
        setAttributes({ iniciativas: newIniciativas });
    };

    const moveIniciativa = (index, direction) => {
        const newIniciativas = [...iniciativas];
        const newIndex = index + direction;
        
        if (newIndex >= 0 && newIndex < newIniciativas.length) {
            [newIniciativas[index], newIniciativas[newIndex]] = [newIniciativas[newIndex], newIniciativas[index]];
            setAttributes({ iniciativas: newIniciativas });
        }
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
                            label: __('Color de fondo de sección', 'diadelasempresasdelbosque')
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
                            value: cardBgColor,
                            onChange: (color) => setAttributes({ cardBgColor: color }),
                            label: __('Fondo de cards', 'diadelasempresasdelbosque')
                        },
                        {
                            value: cardTextColor,
                            onChange: (color) => setAttributes({ cardTextColor: color }),
                            label: __('Texto de cards', 'diadelasempresasdelbosque')
                        },
                        {
                            value: buttonBgColor,
                            onChange: (color) => setAttributes({ buttonBgColor: color }),
                            label: __('Fondo de botones', 'diadelasempresasdelbosque')
                        },
                        {
                            value: buttonTextColor,
                            onChange: (color) => setAttributes({ buttonTextColor: color }),
                            label: __('Texto de botones', 'diadelasempresasdelbosque')
                        },
                        {
                            value: modalHeaderBg,
                            onChange: (color) => setAttributes({ modalHeaderBg: color }),
                            label: __('Fondo del header del modal', 'diadelasempresasdelbosque')
                        },
                        {
                            value: modalHeaderText,
                            onChange: (color) => setAttributes({ modalHeaderText: color }),
                            label: __('Texto del header del modal', 'diadelasempresasdelbosque')
                        }
                    ]}
                />

                {/* Tipografía y Layout */}
                <PanelBody title={__('Diseño', 'diadelasempresasdelbosque')} initialOpen={false}>
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

                    <RangeControl
                        label={__('Columnas', 'diadelasempresasdelbosque')}
                        value={columnas}
                        onChange={(value) => setAttributes({ columnas: value })}
                        min={1}
                        max={4}
                        help={__('Cantidad de cards por fila', 'diadelasempresasdelbosque')}
                    />
                </PanelBody>

                {/* Iniciativas */}
                <PanelBody title={__('Iniciativas', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addIniciativa}
                        className="mb-3"
                    >
                        {__('Agregar Iniciativa', 'diadelasempresasdelbosque')}
                    </Button>

                    {iniciativas.map((iniciativa, index) => (
                        <div key={index} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <strong>Iniciativa {index + 1}</strong>
                                <div className="d-flex gap-1">
                                    <Button
                                        isSmall
                                        onClick={() => moveIniciativa(index, -1)}
                                        disabled={index === 0}
                                    >
                                        ↑
                                    </Button>
                                    <Button
                                        isSmall
                                        onClick={() => moveIniciativa(index, 1)}
                                        disabled={index === iniciativas.length - 1}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeIniciativa(index)}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            </div>

                            {/* Imagen del Card */}
                            <MediaUpload
                                onSelect={(media) => updateIniciativa(index, 'imagen', media.url)}
                                allowedTypes={['image']}
                                value={iniciativa.imagen}
                                render={({ open }) => (
                                    <div className="mb-3">
                                        <p><strong>{__('Imagen del Card', 'diadelasempresasdelbosque')}</strong></p>
                                        {iniciativa.imagen ? (
                                            <div>
                                                <img 
                                                    src={iniciativa.imagen} 
                                                    alt="" 
                                                    style={{ width: '100%', marginBottom: '8px', borderRadius: '4px' }} 
                                                />
                                                <div className="d-flex gap-2">
                                                    <Button onClick={open} variant="secondary" isSmall>Cambiar</Button>
                                                    <Button 
                                                        onClick={() => updateIniciativa(index, 'imagen', '')}
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

                            {/* Tamaño del card */}
                            <RangeControl
                                label={__('Tamaño de la imagen', 'diadelasempresasdelbosque')}
                                value={iniciativa.tamanioImgCard}
                                onChange={(value) => updateIniciativa(index, 'tamanioImgCard', value)}
                                min={50}
                                max={500}
                            />

                            {/* Título del Card */}
                            <TextControl
                                label={__('Título del Card', 'diadelasempresasdelbosque')}
                                value={iniciativa.tituloCard}
                                onChange={(value) => updateIniciativa(index, 'tituloCard', value)}
                                placeholder="Nombre de la iniciativa"
                            />

                            {/* Título del Modal */}
                            <TextControl
                                label={__('Título del Modal', 'diadelasempresasdelbosque')}
                                value={iniciativa.tituloModal}
                                onChange={(value) => updateIniciativa(index, 'tituloModal', value)}
                                placeholder="Título que aparecerá en el modal"
                            />

                            {/* Botón para editar contenido del modal */}
                            <div className="mb-3">
                                <p><strong>{__('Contenido del Modal', 'diadelasempresasdelbosque')}</strong></p>
                                <Button 
                                    variant="secondary"
                                    onClick={() => setModalAbierto(index)}
                                >
                                    {__('Editar contenido del modal', 'diadelasempresasdelbosque')}
                                </Button>
                            </div>

                            {/* Texto del Botón */}
                            <TextControl
                                label={__('Texto del Botón', 'diadelasempresasdelbosque')}
                                value={iniciativa.textoBoton}
                                onChange={(value) => updateIniciativa(index, 'textoBoton', value)}
                            />

                            {/* Texto del Botón Cerrar */}
                            <TextControl
                                label={__('Texto del Botón Cerrar', 'diadelasempresasdelbosque')}
                                value={iniciativa.textoCerrar}
                                onChange={(value) => updateIniciativa(index, 'textoCerrar', value)}
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

                    <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                        {iniciativas.map((iniciativa, index) => (
                            <div key={index} className={`col-md-${12 / columnas}`}>
                                <div className="card h-100 d-grid align-items-end" style={{ backgroundColor: cardBgColor, color: cardTextColor, justifyItems: 'center' }}>
                                    {iniciativa.imagen && (
                                        <img src={iniciativa.imagen} className="card-img-top" style={{ width: iniciativa.tamanioImgCard }} alt={iniciativa.tituloCard} />
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title">{iniciativa.tituloCard}</h6>
                                        <button 
                                            type="button" 
                                            className="btn mt-auto"
                                            onClick={() => setModalAbierto(index)}
                                            style={{
                                                backgroundColor: buttonBgColor,
                                                color: buttonTextColor
                                            }}
                                        >
                                            {iniciativa.textoBoton}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal de edición de contenido */}
                    {modalAbierto !== null && (
                        <div 
                            className="modal-backdrop-editor"
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.7)',
                                zIndex: 999999,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onClick={() => setModalAbierto(null)}
                        >
                            <div 
                                className="modal-content-editor"
                                style={{
                                    background: 'white',
                                    borderRadius: '8px',
                                    width: '90%',
                                    maxWidth: '800px',
                                    maxHeight: '80vh',
                                    overflow: 'auto',
                                    position: 'relative'
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div 
                                    className="modal-header"
                                    style={{
                                        padding: '1.5rem',
                                        background: modalHeaderBg,
                                        color: modalHeaderText,
                                        borderRadius: '8px 8px 0 0'
                                    }}
                                >
                                    <h5>{iniciativas[modalAbierto].tituloModal}</h5>
                                    <button 
                                        onClick={() => setModalAbierto(null)}
                                        style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
                                            background: 'transparent',
                                            border: 'none',
                                            color: modalHeaderText,
                                            fontSize: '1.5rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="modal-body" style={{ padding: '2rem' }}>
                                    <p className="mb-3" style={{ fontSize: '0.9rem', color: '#666' }}>
                                        Puedes usar <strong>negritas</strong>, <em>cursivas</em>, enlaces, listas y más.
                                    </p>
                                    <RichText
                                        tagName="div"
                                        value={iniciativas[modalAbierto].contenidoModal}
                                        onChange={(value) => updateIniciativa(modalAbierto, 'contenidoModal', value)}
                                        placeholder="Escribe el contenido del modal aquí..."
                                        style={{
                                            minHeight: '200px',
                                            border: '1px solid #ddd',
                                            padding: '1rem',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                                <div className="modal-footer" style={{ padding: '1.5rem', borderTop: '1px solid #ddd' }}>
                                    <Button 
                                        variant="primary"
                                        onClick={() => setModalAbierto(null)}
                                    >
                                        Guardar y Cerrar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}