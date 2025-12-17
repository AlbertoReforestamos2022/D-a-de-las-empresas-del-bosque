import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { slides, showControls, showIndicators, autoplay, interval } = attributes;

    const blockProps = useBlockProps.save();

    const carouselId = `heroCarousel-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div {...blockProps}>
            <div 
                id={carouselId} 
                className="carousel slide hero-carousel" 
                data-bs-ride={autoplay ? 'carousel' : 'false'}
                data-bs-interval={autoplay ? interval : 'false'}
            >
                {/* Indicadores */}
                {showIndicators && slides.length > 1 && (
                    <div className="carousel-indicators">
                        {slides.map((_, index) => (
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

                {/* Slides */}
                <div className="carousel-inner">
                    {slides.map((slide, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={slide.imagen} className="d-block w-100" alt={slide.titulo || ''} />
                            <div className="carousel-caption d-none d-md-block">
                                {slide.titulo && <h5>{slide.titulo}</h5>}
                                {slide.descripcion && <p>{slide.descripcion}</p>}
                                {slide.showButton && slide.buttonText && (
                                    <a href={slide.buttonUrl} className="btn btn-primary btn-lg mt-3">
                                        {slide.buttonText}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controles */}
                {showControls && slides.length > 1 && (
                    <>
                        <button 
                            className="carousel-control-prev" 
                            type="button" 
                            data-bs-target={`#${carouselId}`}
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Anterior</span>
                        </button>
                        <button 
                            className="carousel-control-next" 
                            type="button" 
                            data-bs-target={`#${carouselId}`}
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Siguiente</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}