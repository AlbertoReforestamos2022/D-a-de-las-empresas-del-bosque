import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion, 
        documentos,
        videos,
        capacitaciones,
        backgroundColor,
        tituloColor,
        descripcionColor,
        cardBgColor,
        btnBgColor,
        btnTextColor,
        cardTextColor,
        tituloFontSize,
        descripcionFontSize,
        textAlign
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const carouselId = `docsCarousel-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <section {...blockProps}>
            <div className="container">
                <div className="text-center mb-5" style={{ textAlign: textAlign }}>
                    <RichText.Content
                        tagName="h2"
                        className="section-title mb-3"
                        value={titulo}
                        style={{
                            color: tituloColor,
                            fontSize: `${tituloFontSize}px`
                        }}
                    />
                    <RichText.Content
                        tagName="p"
                        className="section-description"
                        value={descripcion}
                        style={{
                            color: descripcionColor,
                            fontSize: `${descripcionFontSize}px`
                        }}
                    />
                </div>

                <div className="row g-4">
                    {/* Carrusel de PDFs */}
                    {documentos.length > 0 && (
                        <div className="col-lg-6">
                            <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {documentos.map((doc, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <div className="document-card p-4 text-center" style={{ background: cardBgColor, color: cardTextColor, borderRadius: '15px' }}>
                                                <i className="fas fa-file-pdf fa-3x mb-3"></i>
                                                <h5>{doc.titulo}</h5>
                                                <a href={doc.url} className="btn btn-light mt-3" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: btnBgColor, color:btnTextColor }}>
                                                    <i className="fas fa-download me-2"></i>Ver documento
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {documentos.length > 1 && (
                                    <>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                                            <span class="p-2 rounded-3" aria-hidden="true" style={{ backgroundColor: btnBgColor }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                                </svg>
                                            </span>
                                            <span className="visually-hidden">Anterior</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                                            
                                            <span className="p-2 rounded-3" aria-hidden="true" style={{ backgroundColor: btnBgColor }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                                </svg>                                                
                                            </span>
                                            <span className="visually-hidden">Siguiente</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Videos */}
                    <div className="col-lg-3" style={{ backgroundColor:  cardBgColor,  color: cardTextColor}}>
                        <h4 className="mb-3">Videos</h4>
                        {videos.map((video, index) => (
                            <a key={index} href={video.url} className="document-card mb-3 p-3 d-block text-center text-decoration-none" style={{ background: btnBgColor, color:btnTextColor, borderRadius: '10px' }}>
                                <i className="fas fa-play-circle fa-2x mb-2"></i>
                                <p className="mb-0">{video.titulo}</p>
                            </a>
                        ))}
                    </div>

                    {/* Capacitaciones */}
                    <div className="col-lg-3" style={{ backgroundColor:  cardBgColor,  color: cardTextColor}}>
                        <h4 className="mb-3">Capacitaciones</h4>
                        {capacitaciones.map((cap, index) => (
                            <a key={index} href={cap.url} className="document-card mb-3 p-3 d-block text-center text-decoration-none" style={{ background: btnBgColor, color:btnTextColor, borderRadius: '10px' }}>
                                <i className="fas fa-graduation-cap fa-2x mb-2"></i>
                                <p className="mb-0">{cap.titulo}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}