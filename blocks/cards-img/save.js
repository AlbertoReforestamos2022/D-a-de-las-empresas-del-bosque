import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, descripcion, logos, columnas } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5'
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

                <div className={`row row-cols-2 row-cols-md-${columnas} g-4 align-items-center justify-content-center`}>
                    {logos.map((logo, index) => (
                        <div key={index} className="col">
                            <div className="card card-custom h-100 border-0 shadow-sm p-4 d-flex align-items-center justify-content-center">
                                {logo.link ? (
                                    <a href={logo.link} target="_blank" rel="noopener noreferrer">
                                        <img 
                                            src={logo.url} 
                                            alt={logo.alt} 
                                            className="img-fluid"
                                            style={{ maxHeight: '80px', objectFit: 'contain' }}
                                        />
                                    </a>
                                ) : (
                                    <img 
                                        src={logo.url} 
                                        alt={logo.alt} 
                                        className="img-fluid"
                                        style={{ maxHeight: '80px', objectFit: 'contain' }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}