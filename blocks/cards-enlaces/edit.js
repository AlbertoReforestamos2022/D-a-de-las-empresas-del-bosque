import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, RangeControl, SelectControl, ToggleControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        titulo, 
        descripcion, 
        cards,
        columnas,
        backgroundColor,
        tituloColor,
        descripcionColor,
        cardBgColor,
        cardTextColor,
        cardDescripcionoColor,
        buttonBgColor,
        buttonTextColor,
        tituloFontSize,
        descripcionFontSize,
        cardTitleFontSize,
        textAlign,
        imageHeight,
        abrirEnNuevaVentana,
        cardDescripcionFontSize,
        cardWidth,
        cardHeight
    } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const updateCard = (index, field, value) => {
        const newCards = [...cards];
        newCards[index][field] = value;
        setAttributes({ cards: newCards });
    };

    const addCard = () => {
        const newCards = [...cards, {
            imagen: '',
            tituloCard: '',
            descripcionCard: '',
            showDescripcion: true,
            textoBoton: 'Saber más',
            enlace: '#',
            showButton: true // ← AGREGADO
        }];
        setAttributes({ cards: newCards });
    };

    const removeCard = (index) => {
        const newCards = cards.filter((_, i) => i !== index);
        setAttributes({ cards: newCards });
    };

    const moveCard = (index, direction) => {
        const newCards = [...cards];
        const newIndex = index + direction;
        
        if (newIndex >= 0 && newIndex < newCards.length) {
            [newCards[index], newCards[newIndex]] = [newCards[newIndex], newCards[index]];
            setAttributes({ cards: newCards });
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
                            value: cardDescripcionoColor,
                            onChange: (color) => setAttributes({ cardDescripcionoColor: color }), 
                            label: __('Texto descripción cards', 'diadelasempresasdelbosque')
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
                        }
                    ]}
                />

                {/* Tipografía y Layout */}
                <PanelBody title={__('Diseño', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <RangeControl
                        label={__('Tamaño del título principal (px)', 'diadelasempresasdelbosque')}
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

                    <RangeControl
                        label={__('Tamaño del título de cards (px)', 'diadelasempresasdelbosque')}
                        value={cardTitleFontSize}
                        onChange={(value) => setAttributes({ cardTitleFontSize: value })}
                        min={14}
                        max={32}
                    />

                    <RangeControl
                        label={__('Tamaño de la descripción de los cards (px)', 'diadelasempresasdelbosque')}
                        value={cardDescripcionFontSize}
                        onChange={(value) => setAttributes({ cardDescripcionFontSize: value })}
                        min={14}
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

                    <RangeControl
                        label={__('Ancho del card', 'diadelasempresasdelbosque')}
                        value={cardWidth}
                        onChange={(value) => setAttributes({ cardWidth: value })}
                        min={100}
                        max={1000}
                        help={__('Ancho de los cards', 'diadelasempresasdelbosque')}
                    />

                    <RangeControl
                        label={__('Alto del card', 'diadelasempresasdelbosque')}
                        value={cardHeight}
                        onChange={(value) => setAttributes({ cardHeight: value })}
                        min={100}
                        max={1000}
                        help={__('Alto de los cards', 'diadelasempresasdelbosque')}
                    />

                    <RangeControl
                        label={__('Altura de imágenes (px)', 'diadelasempresasdelbosque')}
                        value={imageHeight}
                        onChange={(value) => setAttributes({ imageHeight: value })}
                        min={100}
                        max={400}
                    />

                    <ToggleControl
                        label={__('Abrir enlaces en nueva ventana', 'diadelasempresasdelbosque')}
                        checked={abrirEnNuevaVentana}
                        onChange={(value) => setAttributes({ abrirEnNuevaVentana: value })}
                    />
                </PanelBody>

                {/* Cards */}
                <PanelBody title={__('Cards', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addCard}
                        className="mb-3"
                    >
                        {__('Agregar Card', 'diadelasempresasdelbosque')}
                    </Button>

                    {cards.map((card, index) => (
                        <div key={index} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <strong>Card {index + 1}</strong>
                                <div className="d-flex gap-1">
                                    <Button
                                        isSmall
                                        onClick={() => moveCard(index, -1)}
                                        disabled={index === 0}
                                    >
                                        ↑
                                    </Button>
                                    <Button
                                        isSmall
                                        onClick={() => moveCard(index, 1)}
                                        disabled={index === cards.length - 1}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeCard(index)}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            </div>

                            {/* Imagen */}
                            <MediaUpload
                                onSelect={(media) => updateCard(index, 'imagen', media.url)}
                                allowedTypes={['image']}
                                value={card.imagen}
                                render={({ open }) => (
                                    <div className="mb-3">
                                        <p><strong>{__('Imagen', 'diadelasempresasdelbosque')}</strong></p>
                                        {card.imagen ? (
                                            <div>
                                                <img 
                                                    src={card.imagen} 
                                                    alt="" 
                                                    style={{ width: '100%', marginBottom: '8px', borderRadius: '4px' }} 
                                                />
                                                <div className="d-flex gap-2">
                                                    <Button onClick={open} variant="secondary" isSmall>Cambiar</Button>
                                                    <Button 
                                                        onClick={() => updateCard(index, 'imagen', '')}
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

                            {/* Título */}
                            <TextControl
                                label={__('Título del Card', 'diadelasempresasdelbosque')}
                                value={card.tituloCard}
                                onChange={(value) => updateCard(index, 'tituloCard', value)}
                                placeholder="Título del card"
                            />

                            {/* NUEVO: Toggle para mostrar la descripción del card */}
                            <ToggleControl
                                label={__('Mostrar descripción', 'diadelasempresasdelbosque')}
                                checked={card.showDescripcion !== undefined ? card.showDescripcion : true}
                                onChange={(value) => updateCard(index, 'showDescripcion', value)}
                                help={__('Activa para mostrar el campo de la descripción', 'diadelasempresasdelbosque')}
                            />                         

                            {/* Mostrar campos de la descriçión del card solo si showButton está activo */}
                            {(card.showDescripcion !== undefined ? card.showDescripcion : true) && (
                                <>
                                    {/* Enlace */}
                                    <TextControl
                                        label={__('Mostrar descripción del card', 'diadelasempresasdelbosque')}
                                        value={card.descripcionCard}
                                        onChange={(value) => updateCard(index, 'descripcionCard', value)}
                                        placeholder="Descripción"
                                    />
                                </>
                            )}                            

                            {/* NUEVO: Toggle para mostrar botón */}
                            <ToggleControl
                                label={__('Mostrar botón', 'diadelasempresasdelbosque')}
                                checked={card.showButton !== undefined ? card.showButton : true}
                                onChange={(value) => updateCard(index, 'showButton', value)}
                                help={__('Activa para mostrar el botón de enlace', 'diadelasempresasdelbosque')}
                            />                         

                            {/* Mostrar campos del botón solo si showButton está activo */}
                            {(card.showButton !== undefined ? card.showButton : true) && (
                                <>
                                    {/* Enlace */}
                                    <TextControl
                                        label={__('Enlace (URL)', 'diadelasempresasdelbosque')}
                                        value={card.enlace}
                                        onChange={(value) => updateCard(index, 'enlace', value)}
                                        placeholder="https://ejemplo.com"
                                    />

                                    {/* Texto del Botón */}
                                    <TextControl
                                        label={__('Texto del Botón', 'diadelasempresasdelbosque')}
                                        value={card.textoBoton}
                                        onChange={(value) => updateCard(index, 'textoBoton', value)}
                                    />
                                </>
                            )}
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
                        {cards.map((card, index) => (
                            <div key={index} className={`col-md-${12 / columnas} d-flex justify-content-center`}>
                                <div 
                                    className="card card-enlace d-grid align-items-center" 

                                    style={{ 
                                        backgroundColor: cardBgColor, 
                                        width: cardWidth, 
                                        height: cardHeight 
                                    }}>

                                    {card.imagen && (
                                        <img 
                                            src={card.imagen} 
                                            className="card-img-top" 
                                            alt={card.tituloCard}
                                            style={{ height: `${imageHeight}px`, objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h5 
                                            className="card-title"
                                            style={{ fontSize: `${cardTitleFontSize}px`, color: cardTextColor }}
                                        >
                                            {card.tituloCard}
                                        </h5>
                                        {/* Renderizar la descripción en caso de que sea True */}
                                        {(card.showDescripcion !== undefined ? card.showDescripcion : true) && (
                                            <p 
                                                className="text-center"
                                                style={{
                                                    fontSize: `${cardDescripcionFontSize}px`,
                                                    color: cardDescripcionoColor
                                                }}
                                            >
                                                {card.descripcionCard}
                                            </p>
                                        )}

                                        {/* Renderizar botón solo si showButton es true */}
                                        {(card.showButton !== undefined ? card.showButton : true) && (
                                            <a 
                                                href={card.enlace} 
                                                className="btn mt-auto"
                                                style={{
                                                    backgroundColor: buttonBgColor,
                                                    color: buttonTextColor
                                                }}
                                            >
                                                {card.textoBoton}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}