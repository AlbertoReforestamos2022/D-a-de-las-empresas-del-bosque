import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, descripcion, documentos, videosTexto, videosLink, capacitacionesTexto, capacitacionesLink } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        id: 'documents'
    });

    return (
        <section {...blockProps}>
            <div className="container">
                <div className="title-content mb-4">
                    <RichText.Content
                        tagName="h2"
                        className="text-center display-5 fw-bold"
                        value={titulo}
                    />

                    <div className="row row-cols-1 row-cols-md-2 justify-content-center">
                        <div className="col">
                            <RichText.Content
                                tagName="p"
                                className="subtitle-text text-black-50 text-center"
                                value={descripcion}
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
                                <div id="carruselDocs" className="carousel slide carousel-fade">
                                    <div className="carousel-inner">
                                        {documentos.map((doc, index) => (
                                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                <div className="ratio ratio-16x9 border rounded shadow-sm iframe-documento">
                                                    <iframe src={doc.url} frameBorder="0" allowFullScreen title={doc.titulo}></iframe>
                                                </div>
                                                <div className="text-center mt-2">
                                                    <small className="text-muted">{doc.titulo || `Documento ${index + 1}`}</small>
                                                </div>
                                                <div className="carousel-caption carrusel-docs-caption">
                                                    <div className="btn-content">
                                                        <a href={doc.url} className="btn btn-primary btn-primary-custom" style={{ fontSize: '.7rem' }} target="_blank" rel="noopener noreferrer">
                                                            Leer documento
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="carousel-control-prev" type="button" data-bs-target="#carruselDocs" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Anterior</span>
                                    </button>

                                    <button className="carousel-control-next" type="button" data-bs-target="#carruselDocs" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Siguiente</span>
                                    </button>
                                </div>



                                <div className="carousel-indicators carrusel-docs-indicators mt-3">
                                    {documentos.map((_, index) => (
                                        <button 
                                            key={index}
                                            type="button" 
                                            data-bs-target="#carruselDocs" 
                                            data-bs-slide-to={index} 
                                            className={index === 0 ? 'active' : ''}
                                            aria-label={`Slide ${index + 1}`}
                                        ></button>
                                    ))}
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
                                        <RichText.Content
                                            tagName="p"
                                            className="videos-text text-black-50"
                                            value={videosTexto}
                                        />
                                    </div>

                                    <div className="card-footer border-0 bg-transparent">
                                        <div className="btn-content">
                                            <a href={videosLink} className="btn btn-primary-custom">Saber más</a>
                                        </div>
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
                                        <RichText.Content
                                            tagName="p"
                                            className="capacitaciones-text text-black-50"
                                            value={capacitacionesTexto}
                                        />
                                    </div>
                                    <div className="card-footer border-0 bg-transparent">
                                        <div className="btn-content">
                                            <a href={capacitacionesLink} className="btn btn-primary-custom">Saber más</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}