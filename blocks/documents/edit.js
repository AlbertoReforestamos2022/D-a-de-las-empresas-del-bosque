import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, descripcion, documentos, videosTexto, videosLink, capacitacionesTexto, capacitacionesLink } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5'
    });

    const updateDocumento = (index, field, value) => {
        const newDocs = [...documentos];
        newDocs[index][field] = value;
        setAttributes({ documentos: newDocs });
    };

    const addDocumento = () => {
        const newDocs = [...documentos, { url: '', titulo: '', tipo: 'pdf' }];
        setAttributes({ documentos: newDocs });
    };

    const removeDocumento = (index) => {
        const newDocs = documentos.filter((_, i) => i !== index);
        setAttributes({ documentos: newDocs });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Documentos', 'diadelasempresasdelbosque')}>
                    <Button 
                        variant="primary" 
                        onClick={addDocumento}
                        className="mb-3"
                    >
                        {__('Agregar Documento', 'diadelasempresasdelbosque')}
                    </Button>

                    {documentos.map((doc, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Documento {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeDocumento(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Título del documento', 'diadelasempresasdelbosque')}
                                value={doc.titulo}
                                onChange={(value) => updateDocumento(index, 'titulo', value)}
                            />

                            <MediaUpload
                                onSelect={(media) => updateDocumento(index, 'url', media.url)}
                                allowedTypes={['application/pdf']}
                                value={doc.url}
                                render={({ open }) => (
                                    <div>
                                        {doc.url ? (
                                            <div>
                                                <p className="small text-muted mb-2">📄 {doc.url.split('/').pop()}</p>
                                                <Button onClick={open} variant="secondary">
                                                    Cambiar PDF
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button onClick={open} variant="primary">
                                                Seleccionar PDF
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    ))}
                </PanelBody>

                <PanelBody title={__('Enlaces', 'diadelasempresasdelbosque')}>
                    <TextControl
                        label={__('Enlace de Videos', 'diadelasempresasdelbosque')}
                        value={videosLink}
                        onChange={(value) => setAttributes({ videosLink: value })}
                        placeholder="https://..."
                    />

                    <TextControl
                        label={__('Enlace de Capacitaciones', 'diadelasempresasdelbosque')}
                        value={capacitacionesLink}
                        onChange={(value) => setAttributes({ capacitacionesLink: value })}
                        placeholder="https://..."
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="title-content mb-4">
                        <RichText
                            tagName="h2"
                            className="text-center display-5 fw-bold"
                            value={titulo}
                            onChange={(value) => setAttributes({ titulo: value })}
                            placeholder="Título de la sección"
                        />

                        <div className="row row-cols-1 row-cols-md-2 justify-content-center">
                            <div className="col">
                                <RichText
                                    tagName="p"
                                    className="subtitle-text text-black-50 text-center"
                                    value={descripcion}
                                    onChange={(value) => setAttributes({ descripcion: value })}
                                    placeholder="Descripción de la sección"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-lg-2 g-4 p-3 justify-content-center align-items-stretch">
                        {/* Carrusel de Documentos */}
                        <div className="col d-flex align-items-stretch">
                            <div className="card w-100 h-100 bg-transparent border-0 shadow-sm p-2">
                                <div className="card-header bg-transparent border-0">
                                    <h6>Materiales de interés</h6>
                                </div>

                                <div className="card-body border-0">
                                    <div className="carousel slide">
                                        <div className="carousel-inner">
                                            {documentos.map((doc, index) => (
                                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                    <div className="ratio ratio-16x9 border rounded shadow-sm bg-light d-flex align-items-center justify-content-center">
                                                        {doc.url ? (
                                                            <iframe src={doc.url} title={doc.titulo}></iframe>
                                                        ) : (
                                                            <span className="text-muted">Sin documento</span>
                                                        )}
                                                    </div>
                                                    <div className="text-center mt-2">
                                                        <small className="text-muted">{doc.titulo || `Documento ${index + 1}`}</small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Videos y Capacitaciones */}
                        <div className="col d-flex align-items-stretch">
                            <div className="row row-cols-1 gap-3 w-100">
                                {/* Videos */}
                                <div className="col d-flex align-items-stretch">
                                    <div className="card w-100 h-100 bg-transparent border-0 shadow-sm p-2">
                                        <div className="card-header bg-transparent border-0">
                                            <h6>Videos</h6>
                                        </div>
                                        <div className="card-body border-0">
                                            <RichText
                                                tagName="p"
                                                className="videos-text text-black-50"
                                                value={videosTexto}
                                                onChange={(value) => setAttributes({ videosTexto: value })}
                                                placeholder="Descripción de videos"
                                            />
                                        </div>
                                        <div className="card-footer border-0 bg-transparent">
                                            <a href={videosLink} className="btn btn-primary-custom">Saber más</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Capacitaciones */}
                                <div className="col d-flex align-items-stretch">
                                    <div className="card w-100 h-100 bg-transparent border-0 shadow-sm p-2">
                                        <div className="card-header bg-transparent border-0">
                                            <h6>Capacitaciones</h6>
                                        </div>
                                        <div className="card-body border-0">
                                            <RichText
                                                tagName="p"
                                                className="capacitaciones-text text-black-50"
                                                value={capacitacionesTexto}
                                                onChange={(value) => setAttributes({ capacitacionesTexto: value })}
                                                placeholder="Descripción de capacitaciones"
                                            />
                                        </div>
                                        <div className="card-footer border-0 bg-transparent">
                                            <a href={capacitacionesLink} className="btn btn-primary-custom">Saber más</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}