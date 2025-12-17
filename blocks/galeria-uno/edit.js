import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, RangeControl, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        titulo, 
        descripcion, 
        categorias,
        backgroundColor,
        tituloColor,
        descripcionColor,
        tabActiveColor,
        tabInactiveColor,
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

    const updateCategoria = (index, field, value) => {
        const newCategorias = [...categorias];
        newCategorias[index][field] = value;
        setAttributes({ categorias: newCategorias });
    };

    const updateImagen = (catIndex, imgIndex, field, value) => {
        const newCategorias = [...categorias];
        newCategorias[catIndex].imagenes[imgIndex][field] = value;
        setAttributes({ categorias: newCategorias });
    };

    const addCategoria = () => {
        const newCategorias = [...categorias, {
            nombre: '',
            imagenes: []
        }];
        setAttributes({ categorias: newCategorias });
    };

    const removeCategoria = (index) => {
        const newCategorias = categorias.filter((_, i) => i !== index);
        setAttributes({ categorias: newCategorias });
    };

    const addImagen = (catIndex) => {
        const newCategorias = [...categorias];
        newCategorias[catIndex].imagenes.push({ url: '', alt: '' });
        setAttributes({ categorias: newCategorias });
    };

    const removeImagen = (catIndex, imgIndex) => {
        const newCategorias = [...categorias];
        newCategorias[catIndex].imagenes = newCategorias[catIndex].imagenes.filter((_, i) => i !== imgIndex);
        setAttributes({ categorias: newCategorias });
    };

    return (
        <>
            <InspectorControls>
                {/* COLORES */}
                <PanelColorSettings
                    title={__('Colores', 'diadelasempresasdelbosque')}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Color de fondo de la sección', 'diadelasempresasdelbosque')
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
                            value: tabActiveColor,
                            onChange: (color) => setAttributes({ tabActiveColor: color }),
                            label: __('Color de tab activo', 'diadelasempresasdelbosque')
                        },
                        {
                            value: tabInactiveColor,
                            onChange: (color) => setAttributes({ tabInactiveColor: color }),
                            label: __('Color de tab inactivo', 'diadelasempresasdelbosque')
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

                {/* Categorías */}
                <PanelBody title={__('Categorías', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addCategoria}
                        className="mb-3"
                    >
                        {__('Agregar Categoría', 'diadelasempresasdelbosque')}
                    </Button>

                    {categorias.map((cat, catIndex) => (
                        <div key={catIndex} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Categoría {catIndex + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeCategoria(catIndex)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Nombre de la categoría', 'diadelasempresasdelbosque')}
                                value={cat.nombre}
                                onChange={(value) => updateCategoria(catIndex, 'nombre', value)}
                                placeholder="Ej: Eventos, Proyectos, etc."
                            />

                            <hr />

                            <p><strong>{__('Imágenes', 'diadelasempresasdelbosque')}</strong></p>
                            <Button 
                                variant="secondary" 
                                onClick={() => addImagen(catIndex)}
                                className="mb-2"
                                isSmall
                            >
                                {__('Agregar Imagen', 'diadelasempresasdelbosque')}
                            </Button>

                            {cat.imagenes && cat.imagenes.map((img, imgIndex) => (
                                <div key={imgIndex} className="border p-2 mb-2" style={{ background: 'white', borderRadius: '4px' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <small><strong>Imagen {imgIndex + 1}</strong></small>
                                        <Button
                                            isDestructive
                                            isSmall
                                            onClick={() => removeImagen(catIndex, imgIndex)}
                                        >
                                            ✕
                                        </Button>
                                    </div>

                                    <MediaUpload
                                        onSelect={(media) => {
                                            updateImagen(catIndex, imgIndex, 'url', media.url);
                                            updateImagen(catIndex, imgIndex, 'alt', media.alt || '');
                                        }}
                                        allowedTypes={['image']}
                                        value={img.url}
                                        render={({ open }) => (
                                            <div>
                                                {img.url ? (
                                                    <div>
                                                        <img src={img.url} alt={img.alt} style={{ width: '100%', marginBottom: '8px', borderRadius: '4px' }} />
                                                        <div className="d-flex gap-2">
                                                            <Button onClick={open} variant="secondary" isSmall>Cambiar</Button>
                                                            <Button 
                                                                onClick={() => updateImagen(catIndex, imgIndex, 'url', '')}
                                                                isDestructive
                                                                isSmall
                                                            >
                                                                Quitar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Button onClick={open} variant="primary" isSmall>Seleccionar</Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>
                            ))}
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
                            placeholder="Título de la galería"
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
                            placeholder="Descripción de la galería"
                            style={{
                                color: descripcionColor,
                                fontSize: `${descripcionFontSize}px`
                            }}
                        />
                    </div>

                    {/* Preview de tabs */}
                    {categorias.length > 0 && (
                        <div className="galeria-tabs-preview">
                            <ul className="nav nav-tabs mb-4 justify-content-center border-0">
                                {categorias.map((cat, index) => (
                                    <li key={index} className="nav-item">
                                        <button 
                                            className={`nav-link ${index === 0 ? 'active' : ''}`}
                                            style={{
                                                backgroundColor: index === 0 ? tabActiveColor : 'transparent',
                                                color: index === 0 ? '#ffffff' : tabInactiveColor,
                                                borderColor: index === 0 ? tabActiveColor : tabInactiveColor,
                                                borderRadius: '50px'
                                            }}
                                        >
                                            {cat.nombre || `Categoría ${index + 1}`}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Preview de imágenes de la primera categoría */}
                            {categorias[0] && categorias[0].imagenes && categorias[0].imagenes.length > 0 && (
                                <div className="row g-3">
                                    {categorias[0].imagenes.slice(0, 6).map((img, index) => (
                                        <div key={index} className="col-md-4 col-6">
                                            <img 
                                                src={img.url} 
                                                alt={img.alt} 
                                                className="img-fluid rounded"
                                                style={{ objectFit: 'cover', height: '200px', width: '100%' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}