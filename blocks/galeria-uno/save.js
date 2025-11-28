import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, descripcion, imagenes, velocidad } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5 bg-white overflow-hidden',
        id: 'events'
    });

    return (
        <section {...blockProps}>
            <div className="container">
                <div className="text-center mb-5">
                    <RichText.Content
                        tagName="h2"
                        className="display-5 fw-bold"
                        value={titulo}
                    />
                    <RichText.Content
                        tagName="p"
                        className="lead text-muted"
                        value={descripcion}
                    />
                </div>

                <div className="marquee-container">
                    <div className="marquee-content" style={{ animationDuration: `${velocidad}s` }}>
                        {/* Imágenes originales */}
                        {imagenes.map((imagen, index) => (
                            <div key={index} className="card card-custom shadow-sm mx-3" style={{ minWidth: '320px' }}>
                                <img 
                                    src={imagen.url} 
                                    className="card-img-top" 
                                    style={{ height: '200px', objectFit: 'cover' }}
                                    alt={imagen.alt}
                                />
                            </div>
                        ))}
                        {/* Imágenes duplicadas para efecto infinito */}
                        {imagenes.map((imagen, index) => (
                            <div key={`duplicate-${index}`} className="card card-custom shadow-sm mx-3" style={{ minWidth: '320px' }}>
                                <img 
                                    src={imagen.url} 
                                    className="card-img-top" 
                                    style={{ height: '200px', objectFit: 'cover' }}
                                    alt={imagen.alt}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}