import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, RangeControl, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        titulo, 
        descripcion, 
        logos,
        columnas,
        backgroundColor,
        tituloColor,
        descripcionColor,
        cardBgColor,
        tituloFontSize,
        descripcionFontSize,
        textAlign,
        logoMaxHeight,
        logoMaxWidth,
        logoObjectFit
    } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const updateLogo = (index, field, value) => {
        const newLogos = [...logos];
        newLogos[index][field] = value;
        setAttributes({ logos: newLogos });
    };

    const addLogo = () => {
        const newLogos = [...logos, { 
            url: '', 
            alt: '', 
            link: '',
            maxHeight: logoMaxHeight, // Usa el valor global como default
            maxWidth: logoMaxWidth,   // Usa el valor global como default
            objectFit: logoObjectFit  // Usa el valor global como default
        }];
        setAttributes({ logos: newLogos });
    };

    const removeLogo = (index) => {
        const newLogos = logos.filter((_, i) => i !== index);
        setAttributes({ logos: newLogos });
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
                            label: __('Color de fondo de cards', 'diadelasempresasdelbosque')
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
                        min={2}
                        max={6}
                        help={__('Cantidad de logos por fila', 'diadelasempresasdelbosque')}
                    />
                </PanelBody>

                {/* Tamaño predeterminado de Logos */}
                <PanelBody title={__('Tamaño Predeterminado de Logos', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                        Estos valores se aplicarán a los nuevos logos que agregues:
                    </p>
                    
                    <RangeControl
                        label={__('Altura máxima predeterminada (px)', 'diadelasempresasdelbosque')}
                        value={logoMaxHeight}
                        onChange={(value) => setAttributes({ logoMaxHeight: value })}
                        min={40}
                        max={300}
                    />

                    <RangeControl
                        label={__('Ancho máximo predeterminado (px)', 'diadelasempresasdelbosque')}
                        value={logoMaxWidth}
                        onChange={(value) => setAttributes({ logoMaxWidth: value })}
                        min={80}
                        max={400}
                    />

                    <SelectControl
                        label={__('Ajuste de imagen predeterminado', 'diadelasempresasdelbosque')}
                        value={logoObjectFit}
                        options={[
                            { label: 'Contener (recomendado)', value: 'contain' },
                            { label: 'Cubrir', value: 'cover' },
                            { label: 'Llenar', value: 'fill' },
                            { label: 'Escalar hacia abajo', value: 'scale-down' }
                        ]}
                        onChange={(value) => setAttributes({ logoObjectFit: value })}
                    />
                </PanelBody>

                {/* Logos - CON CONTROLES INDIVIDUALES */}
                <PanelBody title={__('Logos', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addLogo}
                        className="mb-3"
                    >
                        {__('Agregar Logo', 'diadelasempresasdelbosque')}
                    </Button>

                    {logos.map((logo, index) => (
                        <div key={index} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <strong>Logo {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeLogo(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            {/* Imagen */}
                            <MediaUpload
                                onSelect={(media) => {
                                    updateLogo(index, 'url', media.url);
                                    updateLogo(index, 'alt', media.alt || '');
                                }}
                                allowedTypes={['image']}
                                value={logo.url}
                                render={({ open }) => (
                                    <div className="mb-3">
                                        {logo.url ? (
                                            <div>
                                                <img 
                                                    src={logo.url} 
                                                    alt={logo.alt} 
                                                    style={{ 
                                                        width: '100%', 
                                                        maxHeight: `${logo.maxHeight || logoMaxHeight}px`,
                                                        maxWidth: `${logo.maxWidth || logoMaxWidth}px`,
                                                        objectFit: logo.objectFit || logoObjectFit,
                                                        marginBottom: '8px',
                                                        background: cardBgColor,
                                                        padding: '10px',
                                                        borderRadius: '8px'
                                                    }} 
                                                />
                                                <div className="d-flex gap-2">
                                                    <Button onClick={open} variant="secondary" isSmall>Cambiar</Button>
                                                    <Button 
                                                        onClick={() => updateLogo(index, 'url', '')}
                                                        isDestructive
                                                        isSmall
                                                    >
                                                        Quitar
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button onClick={open} variant="primary">Seleccionar logo</Button>
                                        )}
                                    </div>
                                )}
                            />

                            {/* Texto alternativo */}
                            <TextControl
                                label={__('Texto alternativo', 'diadelasempresasdelbosque')}
                                value={logo.alt}
                                onChange={(value) => updateLogo(index, 'alt', value)}
                                placeholder="Nombre de la empresa"
                            />

                            {/* Enlace */}
                            <TextControl
                                label={__('Enlace (opcional)', 'diadelasempresasdelbosque')}
                                value={logo.link}
                                onChange={(value) => updateLogo(index, 'link', value)}
                                placeholder="https://ejemplo.com"
                            />

                            <hr style={{ margin: '1rem 0', borderColor: '#ddd' }} />

                            {/* CONTROLES INDIVIDUALES DE TAMAÑO */}
                            <p><strong style={{ color: '#2271b1' }}>⚙️ Tamaño de este logo:</strong></p>
                            
                            <RangeControl
                                label={__('Altura máxima (px)', 'diadelasempresasdelbosque')}
                                value={logo.maxHeight || logoMaxHeight}
                                onChange={(value) => updateLogo(index, 'maxHeight', value)}
                                min={40}
                                max={300}
                            />

                            <RangeControl
                                label={__('Ancho máximo (px)', 'diadelasempresasdelbosque')}
                                value={logo.maxWidth || logoMaxWidth}
                                onChange={(value) => updateLogo(index, 'maxWidth', value)}
                                min={80}
                                max={400}
                            />

                            <SelectControl
                                label={__('Ajuste de imagen', 'diadelasempresasdelbosque')}
                                value={logo.objectFit || logoObjectFit}
                                options={[
                                    { label: 'Contener (recomendado)', value: 'contain' },
                                    { label: 'Cubrir', value: 'cover' },
                                    { label: 'Llenar', value: 'fill' },
                                    { label: 'Escalar hacia abajo', value: 'scale-down' }
                                ]}
                                onChange={(value) => updateLogo(index, 'objectFit', value)}
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

                    <div className="row g-4 justify-content-center">
                        {logos.map((logo, index) => (
                            <div key={index} className={`col-${12/columnas}`}>
                                <div className="logo-card" style={{ backgroundColor: cardBgColor }}>
                                    {logo.link ? (
                                        <a href={logo.link} target="_blank" rel="noopener noreferrer">
                                            <img 
                                                src={logo.url} 
                                                alt={logo.alt}
                                                style={{ 
                                                    maxHeight: `${logo.maxHeight || logoMaxHeight}px`,
                                                    maxWidth: `${logo.maxWidth || logoMaxWidth}px`,
                                                    objectFit: logo.objectFit || logoObjectFit
                                                }}
                                            />
                                        </a>
                                    ) : (
                                        <img 
                                            src={logo.url} 
                                            alt={logo.alt}
                                            style={{ 
                                                maxHeight: `${logo.maxHeight || logoMaxHeight}px`,
                                                maxWidth: `${logo.maxWidth || logoMaxWidth}px`,
                                                objectFit: logo.objectFit || logoObjectFit
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}