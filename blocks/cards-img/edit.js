import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, RangeControl, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, descripcion, logos, columnas } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5'
    });

    const updateLogo = (index, field, value) => {
        const newLogos = [...logos];
        newLogos[index][field] = value;
        setAttributes({ logos: newLogos });
    };

    const addLogo = () => {
        const newLogos = [...logos, { url: '', alt: '', link: '' }];
        setAttributes({ logos: newLogos });
    };

    const removeLogo = (index) => {
        const newLogos = logos.filter((_, i) => i !== index);
        setAttributes({ logos: newLogos });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configuración', 'diadelasempresasdelbosque')}>
                    <RangeControl
                        label={__('Columnas por fila', 'diadelasempresasdelbosque')}
                        value={columnas}
                        onChange={(value) => setAttributes({ columnas: value })}
                        min={2}
                        max={6}
                        step={1}
                    />
                </PanelBody>

                <PanelBody title={__('Logos', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addLogo}
                        className="mb-3"
                    >
                        {__('Agregar Logo', 'diadelasempresasdelbosque')}
                    </Button>

                    {logos.map((logo, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Logo {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeLogo(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <MediaUpload
                                onSelect={(media) => {
                                    updateLogo(index, 'url', media.url);
                                    updateLogo(index, 'alt', media.alt || '');
                                }}
                                allowedTypes={['image']}
                                value={logo.url}
                                render={({ open }) => (
                                    <div>
                                        {logo.url ? (
                                            <div>
                                                <img 
                                                    src={logo.url} 
                                                    alt={logo.alt} 
                                                    style={{ width: '100%', marginBottom: '8px' }} 
                                                />
                                                <Button onClick={open} variant="secondary" className="mb-2">
                                                    Cambiar logo
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button onClick={open} variant="primary" className="mb-2">
                                                Seleccionar logo
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />

                            <TextControl
                                label={__('Nombre de la empresa', 'diadelasempresasdelbosque')}
                                value={logo.alt}
                                onChange={(value) => updateLogo(index, 'alt', value)}
                            />

                            <TextControl
                                label={__('Enlace (opcional)', 'diadelasempresasdelbosque')}
                                value={logo.link}
                                onChange={(value) => updateLogo(index, 'link', value)}
                                placeholder="https://..."
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
                            placeholder="Título de la sección"
                        />
                        <RichText
                            tagName="p"
                            className="lead text-muted"
                            value={descripcion}
                            onChange={(value) => setAttributes({ descripcion: value })}
                            placeholder="Descripción"
                        />
                    </div>

                    <div className={`row row-cols-2 row-cols-md-${columnas} g-4 align-items-center justify-content-center`}>
                        {logos.map((logo, index) => (
                            <div key={index} className="col">
                                <div className="card card-custom h-100 border-0 shadow-sm p-4 d-flex align-items-center justify-content-center">
                                    {logo.url ? (
                                        <img 
                                            src={logo.url} 
                                            alt={logo.alt} 
                                            className="img-fluid"
                                            style={{ maxHeight: '80px', objectFit: 'contain' }}
                                        />
                                    ) : (
                                        <div className="text-muted">Logo {index + 1}</div>
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