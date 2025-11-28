import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { imagenes, showControls, showIndicators, autoplay, interval } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5'
    });

    const carouselId = `carousel-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <section {...blockProps}>
            <div className="container">
                <div 
                    id={carouselId} 
                    className="carousel slide"
                    data-bs-ride={autoplay ? 'carousel' : 'false'}
                    data-bs-interval={autoplay ? interval : 'false'}
                >
                    {showIndicators && (
                        <div className="carousel-indicators">
                            {imagenes.map((_, index) => (
                                <button 
                                    key={index}
                                    type="button" 
                                    data-bs-target={`#${carouselId}`}
                                    data-bs-slide-to={index}
                                    className={index === 0 ? 'active' : ''}
                                    aria-current={index === 0 ? 'true' : 'false'}
                                    aria-label={`Slide ${index + 1}`}
                                ></button>
                            ))}
                        </div>
                    )}

                    <div className="carousel-inner">
                        {imagenes.map((imagen, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img 
                                    src={imagen.url} 
                                    className="d-block w-100" 
                                    alt={imagen.alt}
                                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                                />
                                {imagen.caption && (
                                    <div className="carousel-caption d-none d-md-block">
                                        <p>{imagen.caption}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {showControls && (
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