import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload  } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToggleControl, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        siteName, 
        showLogo, 
        copyrightText, 
        footerLinks, 
        logoUno, 
        tamanioLogoUno, 
        logoDos, 
        tamanioLogoDos, 
        logoTres, 
        tamanioLogoTres 
    } = attributes;

    const blockProps = useBlockProps({
        className: ''
    });

    const updateFooterLink = (index, field, value) => {
        const newLinks = [...footerLinks];
        newLinks[index][field] = value;
        setAttributes({ footerLinks: newLinks });
    };

    const addFooterLink = () => {
        const newLinks = [...footerLinks, { label: 'Nuevo enlace', url: '#' }];
        setAttributes({ footerLinks: newLinks });
    };

    const removeFooterLink = (index) => {
        const newLinks = footerLinks.filter((_, i) => i !== index);
        setAttributes({ footerLinks: newLinks });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configuración del Footer', 'diadelasempresasdelbosque')}>
                    {/* Logo 1  */}
                    <PanelBody title={__('Logo principal', 'diadelasempresasdelbosque')} initialOpen={true}>
                        <MediaUpload
                            onSelect={(media) => {
                                setAttributes({ 
                                    logoUno: media.url
                                });
                            }}
                            allowedTypes={['image']}
                            value={logoUno}
                            render={({ open }) => (
                                <div>
                                    {logoUno ? (
                                        <div>
                                            <img 
                                                src={logoUno} 
                                                style={{ width: '100%', marginBottom: '8px', borderRadius: '8px' }} 
                                            />
                                            <div className="d-flex gap-2">
                                                <Button onClick={open} variant="secondary">
                                                    Cambiar imagen
                                                </Button>
                                                <Button 
                                                    onClick={() => setAttributes({ logoUno: '' })}
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

                        <RangeControl
                            label={__('Tamaño logo principal (px)', 'diadelasempresasdelbosque')}
                            value={tamanioLogoUno}
                            onChange={(value) => setAttributes({ tituloFontSize: value })}
                            min={10}
                            max={500}
                        />
                    </PanelBody>   

                    {/* Logo 2  */}
                    <PanelBody title={__('Logo 2', 'diadelasempresasdelbosque')} initialOpen={true}>
                        <MediaUpload
                            onSelect={(media) => {
                                setAttributes({ 
                                    logoDos: media.url
                                });
                            }}
                            allowedTypes={['image']}
                            value={logoDos}
                            render={({ open }) => (
                                <div>
                                    {logoDos ? (
                                        <div>
                                            <img 
                                                src={logoDos} 
                                                style={{ width: '100%', marginBottom: '8px', borderRadius: '8px' }} 
                                            />
                                            <div className="d-flex gap-2">
                                                <Button onClick={open} variant="secondary">
                                                    Cambiar imagen
                                                </Button>
                                                <Button 
                                                    onClick={() => setAttributes({ logoDos: '' })}
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
                        <RangeControl
                            label={__('Tamaño logo dos (px)', 'diadelasempresasdelbosque')}
                            value={tamanioLogoDos}
                            onChange={(value) => setAttributes({ tituloFontSize: value })}
                            min={10}
                            max={500}
                        />
                    </PanelBody>  
                   
                    {/* Logo 3  */}
                    <PanelBody title={__('Logo 3', 'diadelasempresasdelbosque')} initialOpen={true}>
                        <MediaUpload
                            onSelect={(media) => {
                                setAttributes({ 
                                    logoTres: media.url
                                });
                            }}
                            allowedTypes={['image']}
                            value={logoTres}
                            render={({ open }) => (
                                <div>
                                    {logoTres ? (
                                        <div>
                                            <img 
                                                src={logoTres} 
                                                style={{ width: '100%', marginBottom: '8px', borderRadius: '8px' }} 
                                            />
                                            <div className="d-flex gap-2">
                                                <Button onClick={open} variant="secondary">
                                                    Cambiar imagen
                                                </Button>
                                                <Button 
                                                    onClick={() => setAttributes({ logoTres: '' })}
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
                        <RangeControl
                            label={__('Tamaño logo dos (px)', 'diadelasempresasdelbosque')}
                            value={tamanioLogoTres}
                            onChange={(value) => setAttributes({ tituloFontSize: value })}
                            min={10}
                            max={500}
                        />                        
                    </PanelBody>  

                    <TextControl
                        label={__('Nombre del sitio', 'diadelasempresasdelbosque')}
                        value={siteName}
                        onChange={(value) => setAttributes({ siteName: value })}
                    />

                    <TextControl
                        label={__('Texto de copyright', 'diadelasempresasdelbosque')}
                        value={copyrightText}
                        onChange={(value) => setAttributes({ copyrightText: value })}
                        help={__('Usa {year} para el año actual', 'diadelasempresasdelbosque')}
                    />
                </PanelBody>

                <PanelBody title={__('Enlaces del Footer', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addFooterLink}
                        className="mb-3"
                    >
                        {__('Agregar Enlace', 'diadelasempresasdelbosque')}
                    </Button>

                    {footerLinks.map((link, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Enlace {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeFooterLink(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Texto', 'diadelasempresasdelbosque')}
                                value={link.label}
                                onChange={(value) => updateFooterLink(index, 'label', value)}
                            />

                            <TextControl
                                label={__('URL', 'diadelasempresasdelbosque')}
                                value={link.url}
                                onChange={(value) => updateFooterLink(index, 'url', value)}
                                placeholder="https://..."
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <footer className="bg-white border-top py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <div className="d-flex align-items-center gap-3">
                                    <a className="navbar-brand d-flex align-items-center gap-3" href="/">
                                        { logoDos ? (
                                            <img src={logoDos} width={tamanioLogoDos} className='img-fluid' />
                                        ) : (
                                                <div 
                                                    className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                                    style={{ height: '400px' }}
                                                >
                                                    <span className="text-white">Selecciona una imagen</span>
                                                </div>
                                        )}

                                    </a>

                                    <a className="navbar-brand d-flex align-items-center gap-3" href="/">
                                        { logoTres ? (
                                            <img src={logoTres} width={tamanioLogoTres} className='img-fluid' />
                                        ) : (
                                                <div 
                                                    className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                                    style={{ height: '400px' }}
                                                >
                                                    <span className="text-white">Selecciona una imagen</span>
                                                </div>
                                        )}

                                    </a>  
                                    <h2 className="mb-0 fs-5 fw-bold">{siteName}</h2>
                                </div>
                            </div>
                            <div className="col-md-6 text-md-end">
                                <p className="small mb-2">{copyrightText.replace('{year}', new Date().getFullYear())}</p>
                                <div className="d-flex justify-content-md-end gap-3">
                                    {footerLinks.map((link, index) => (
                                        <a key={index} href={link.url} className="text-decoration-none text-muted">
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}