import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToggleControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { siteName, showLogo, copyrightText, footerLinks } = attributes;

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
                    <ToggleControl
                        label={__('Mostrar logo', 'diadelasempresasdelbosque')}
                        checked={showLogo}
                        onChange={(value) => setAttributes({ showLogo: value })}
                    />

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
                                    {showLogo && (
                                        <div className="text-primary-custom">
                                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"></path>
                                                <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    )}
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