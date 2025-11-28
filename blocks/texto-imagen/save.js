import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, contenido, imagen, imagenAlt, imagenPosicion, showButton, buttonText, buttonUrl } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5'
    });

    const isImageRight = imagenPosicion === 'right';

    return (
        <section {...blockProps}>
            <div className="container">
                <div className="row align-items-center g-4">
                    {/* Columna de texto */}
                    <div className={`col-lg-6 ${!isImageRight ? 'order-lg-2' : ''}`}>
                        <RichText.Content
                            tagName="h2"
                            className="display-5 fw-bold mb-4"
                            value={titulo}
                        />

                        <RichText.Content
                            tagName="div"
                            className="contenido-texto mb-4"
                            value={contenido}
                        />

                        {showButton && (
                            <a href={buttonUrl} className="btn btn-primary-custom">
                                {buttonText}
                            </a>
                        )}
                    </div>

                    {/* Columna de imagen */}
                    <div className={`col-lg-6 ${!isImageRight ? 'order-lg-1' : ''}`}>
                        <img 
                            src={imagen} 
                            alt={imagenAlt} 
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}