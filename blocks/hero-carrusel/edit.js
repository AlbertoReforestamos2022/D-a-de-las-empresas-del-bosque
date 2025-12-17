import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ToggleControl, RangeControl, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { slides, showControls, showIndicators, autoplay, interval } = attributes;

    const blockProps = useBlockProps();

    const updateSlide = (index, field, value) => {
        const newSlides = [...slides];
        newSlides[index][field] = value;
        setAttributes({ slides: newSlides });
    };

    const addSlide = () => {
        const newSlides = [...slides, {
            imagen: '',
            titulo: '',
            descripcion: '',
            showButton: true,
            buttonText: 'Conoce Más',
            buttonUrl: '#'
        }];
        setAttributes({ slides: newSlides });
    };

    const removeSlide = (index) => {
        const newSlides = slides.filter((_, i) => i !== index);
        setAttributes({ slides: newSlides });
    };

    const moveSlide = (index, direction) => {
        const newSlides = [...slides];
        const newIndex = index + direction;
        
        if (newIndex >= 0 && newIndex < newSlides.length) {
            [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
            setAttributes({ slides: newSlides });
        }
    };

    const carouselId = 'heroCarousel';

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Configuración del Carrusel', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <ToggleControl
                        label={__('Mostrar controles (flechas)', 'diadelasempresasdelbosque')}
                        checked={showControls}
                        onChange={(value) => setAttributes({ showControls: value })}
                    />

                    <ToggleControl
                        label={__('Mostrar indicadores', 'diadelasempresasdelbosque')}
                        checked={showIndicators}
                        onChange={(value) => setAttributes({ showIndicators: value })}
                    />

                    <ToggleControl
                        label={__('Autoplay', 'diadelasempresasdelbosque')}
                        checked={autoplay}
                        onChange={(value) => setAttributes({ autoplay: value })}
                    />

                    {autoplay && (
                        <RangeControl
                            label={__('Intervalo (milisegundos)', 'diadelasempresasdelbosque')}
                            value={interval}
                            onChange={(value) => setAttributes({ interval: value })}
                            min={2000}
                            max={10000}
                            step={500}
                            help={__('Tiempo entre cambios de slide', 'diadelasempresasdelbosque')}
                        />
                    )}
                </PanelBody>

                <PanelBody title={__('Slides', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addSlide}
                        className="mb-3"
                    >
                        {__('Agregar Slide', 'diadelasempresasdelbosque')}
                    </Button>

                    {slides.map((slide, index) => (
                        <div key={index} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <strong>Slide {index + 1}</strong>
                                <div className="d-flex gap-1">
                                    <Button
                                        isSmall
                                        onClick={() => moveSlide(index, -1)}
                                        disabled={index === 0}
                                    >
                                        ↑
                                    </Button>
                                    <Button
                                        isSmall
                                        onClick={() => moveSlide(index, 1)}
                                        disabled={index === slides.length - 1}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeSlide(index)}
                                        disabled={slides.length === 1}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            </div>

                            {/* Imagen */}
                            <MediaUpload
                                onSelect={(media) => updateSlide(index, 'imagen', media.url)}
                                allowedTypes={['image']}
                                value={slide.imagen}
                                render={({ open }) => (
                                    <div className="mb-3">
                                        <p><strong>{__('Imagen', 'diadelasempresasdelbosque')}</strong></p>
                                        {slide.imagen ? (
                                            <div>
                                                <img 
                                                    src={slide.imagen} 
                                                    alt="" 
                                                    style={{ width: '100%', marginBottom: '8px', borderRadius: '4px' }} 
                                                />
                                                <div className="d-flex gap-2">
                                                    <Button onClick={open} variant="secondary" isSmall>
                                                        Cambiar
                                                    </Button>
                                                    <Button 
                                                        onClick={() => updateSlide(index, 'imagen', '')}
                                                        isDestructive
                                                        isSmall
                                                    >
                                                        Quitar
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

                            {/* Título */}
                            <TextControl
                                label={__('Título', 'diadelasempresasdelbosque')}
                                value={slide.titulo}
                                onChange={(value) => updateSlide(index, 'titulo', value)}
                                placeholder="Título del slide"
                            />

                            {/* Descripción */}
                            <TextControl
                                label={__('Descripción', 'diadelasempresasdelbosque')}
                                value={slide.descripcion}
                                onChange={(value) => updateSlide(index, 'descripcion', value)}
                                placeholder="Descripción del slide"
                            />

                            {/* Botón */}
                            <ToggleControl
                                label={__('Mostrar botón', 'diadelasempresasdelbosque')}
                                checked={slide.showButton}
                                onChange={(value) => updateSlide(index, 'showButton', value)}
                            />

                            {slide.showButton && (
                                <>
                                    <TextControl
                                        label={__('Texto del botón', 'diadelasempresasdelbosque')}
                                        value={slide.buttonText}
                                        onChange={(value) => updateSlide(index, 'buttonText', value)}
                                    />
                                    <TextControl
                                        label={__('URL del botón', 'diadelasempresasdelbosque')}
                                        value={slide.buttonUrl}
                                        onChange={(value) => updateSlide(index, 'buttonUrl', value)}
                                        placeholder="#seccion"
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div id={carouselId} className="carousel slide hero-carousel" data-bs-ride="carousel">
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
                                {slide.imagen ? (
                                    <img src={slide.imagen} className="d-block w-100" alt={slide.titulo || ''} />
                                ) : (
                                    <div className="placeholder-image d-block w-100" style={{ 
                                        minHeight: '600px', 
                                        background: 'linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '1.2rem'
                                    }}>
                                        Selecciona una imagen
                                    </div>
                                )}
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
        </>
    );
}