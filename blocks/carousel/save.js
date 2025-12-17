import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion, 
        imagenes,
        showControls,
        showIndicators,
        autoplay,
        interval,
        backgroundColor,
        tituloColor,
        descripcionColor,
        captionBgColor,
        captionTextColor,
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

    const carouselId = `carousel-${Math.random().toString(36).substr(2, 9)}`;

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

                <div 
                    id={carouselId} 
                    className="carousel slide" 
                    data-bs-ride={autoplay ? 'carousel' : 'false'}
                    data-bs-interval={autoplay ? interval : 'false'}
                >
                    {showIndicators && imagenes.length > 1 && (
                        <div className="carousel-indicators">
                            {imagenes.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    data-bs-target={`#${carouselId}`}
                                    data-bs-slide-to={index}
                                    className={index === 0 ? 'active' : ''}
                                    aria-current={index === 0 ? 'true' : 'false'}
                                ></button>
                            ))}
                        </div>
                    )}

                    <div className="carousel-inner" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                        {imagenes.map((imagen, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img src={imagen.url} className="d-block w-100" alt={imagen.alt} style={{ maxHeight: '600px', objectFit: 'cover' }} />
                                {imagen.caption && (
                                    <div 
                                        className="carousel-caption d-none d-md-block"
                                        style={{
                                            background: captionBgColor,
                                            color: captionTextColor,
                                            padding: '1rem 2rem',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <p className="mb-0">{imagen.caption}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {showControls && imagenes.length > 1 && (
                        <>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Anterior</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Siguiente</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}