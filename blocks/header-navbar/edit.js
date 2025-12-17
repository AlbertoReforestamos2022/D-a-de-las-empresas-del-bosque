import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToggleControl, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { siteName, menuItems, showButton, buttonText, buttonUrl, logoUno, logoDos, logoTres, tamanioLogoUno, tamanioLogoDos, tamanioLogoTres } = attributes;

    const blockProps = useBlockProps({
        className: ''
    });

    const updateMenuItem = (index, field, value) => {
        const newItems = [...menuItems];
        newItems[index][field] = value;
        setAttributes({ menuItems: newItems });
    };

    const addMenuItem = () => {
        const newItems = [...menuItems, { label: 'Nuevo Item', url: '#' }];
        setAttributes({ menuItems: newItems });
    };

    const removeMenuItem = (index) => {
        const newItems = menuItems.filter((_, i) => i !== index);
        setAttributes({ menuItems: newItems });
    };

    const moveMenuItem = (index, direction) => {
        const newItems = [...menuItems];
        const item = newItems[index];
        newItems.splice(index, 1);
        newItems.splice(index + direction, 0, item);
        setAttributes({ menuItems: newItems });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configuración del Navbar', 'diadelasempresasdelbosque')}>
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
                            onChange={(value) => setAttributes({ tamanioLogoUno: value })}
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
                            onChange={(value) => setAttributes({ tamanioLogoDos: value })}
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
                            onChange={(value) => setAttributes({ tamanioLogoTres: value })}
                            min={10}
                            max={500}
                        />                        
                    </PanelBody>  

                    <TextControl
                        label={__('Nombre del sitio', 'diadelasempresasdelbosque')}
                        value={siteName}
                        onChange={(value) => setAttributes({ siteName: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Items del Menú', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addMenuItem}
                        className="mb-3"
                    >
                        {__('Agregar Item', 'diadelasempresasdelbosque')}
                    </Button>

                    {menuItems.map((item, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Item {index + 1}</strong>
                                <div className="d-flex gap-2">
                                    {index > 0 && (
                                        <Button
                                            isSmall
                                            onClick={() => moveMenuItem(index, -1)}
                                        >
                                            ↑
                                        </Button>
                                    )}
                                    {index < menuItems.length - 1 && (
                                        <Button
                                            isSmall
                                            onClick={() => moveMenuItem(index, 1)}
                                        >
                                            ↓
                                        </Button>
                                    )}
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeMenuItem(index)}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </div>

                            <TextControl
                                label={__('Texto', 'diadelasempresasdelbosque')}
                                value={item.label}
                                onChange={(value) => updateMenuItem(index, 'label', value)}
                            />

                            <TextControl
                                label={__('Enlace', 'diadelasempresasdelbosque')}
                                value={item.url}
                                onChange={(value) => updateMenuItem(index, 'url', value)}
                                placeholder="#section"
                            />
                        </div>
                    ))}
                </PanelBody>

                <PanelBody title={__('Botón CTA (opcional)', 'diadelasempresasdelbosque')}>
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
                                placeholder="https://..."
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <nav className="navbar navbar-expand-lg navbar-light sticky-top navbar-custom border-bottom">
                    <div className="container-xl">
                        <a className="navbar-brand d-flex align-items-center gap-3" href="#">
                            { logoUno ? (
                                <img src={logoUno} style={{ width: tamanioLogoUno}} className='img-fluid' />
                            ) : (
                                    <div 
                                        className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                        style={{ height: '400px' }}
                                    >
                                        <span className="text-white">Selecciona una imagen</span>
                                    </div>
                            )}
                            <h2 className="mb-0 fs-5 fw-bold">{siteName}</h2>
                        </a>

                        <a className="navbar-brand d-flex align-items-center gap-3" href="/">
                            { logoDos ? (
                                <img src={logoDos} style={{ width: tamanioLogoDos }} className='img-fluid' />
                            ) : (
                                    <div 
                                        className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                        style={{ height: '400px' }}
                                    >
                                        <span className="text-white">Selecciona una imagen</span>
                                    </div>
                            )}

                        </a> 
                        
                        <button className="navbar-toggler" type="button">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="navbar-collapse">
                            <ul className="navbar-nav ms-auto me-3">
                                {menuItems.map((item, index) => (
                                    <li key={index} className="nav-item">
                                        <a className="nav-link" href={item.url}>
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
    
                            <a className="navbar-brand d-flex align-items-center gap-3" href="/">
                                { logoTres ? (
                                    <img src={logoTres} style={{ width: tamanioLogoTres}} className='img-fluid' />
                                ) : (
                                        <div 
                                            className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                            style={{ height: '400px' }}
                                        >
                                            <span className="text-white">Selecciona una imagen</span>
                                        </div>
                                )}

                            </a>                                                        

                            {showButton && (
                                <a href={buttonUrl} className="btn btn-primary-custom">
                                    {buttonText}
                                </a>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}