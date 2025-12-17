import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        contenido, 
        imagen,
        imagenAlt,
        imagenPosicion,
        showButton,
        buttonText,
        buttonUrl,
        backgroundColor,
        tituloColor,
        contenidoColor,
        buttonBgColor,
        buttonTextColor,
        tituloFontSize,
        contenidoFontSize,
        tituloFontWeight,
        contenidoFontWeight,
        textAlign
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const textoClasses = imagenPosicion === 'left' ? 'col-lg-6 mb-4 mb-lg-0 order-lg-2' : 'col-lg-6 mb-4 mb-lg-0';
    const imagenClasses = imagenPosicion === 'left' ? 'col-lg-6 order-lg-1' : 'col-lg-6';

    return (
        <section {...blockProps}>
            <div className="container">
                <div className="row align-items-center">
                    <div className={textoClasses}>
                        <RichText.Content
                            tagName="h2"
                            className="mb-4"
                            value={titulo}
                            style={{
                                color: tituloColor,
                                fontSize: `${tituloFontSize}px`,
                                fontWeight: tituloFontWeight,
                                textAlign: textAlign
                            }}
                        />
                        
                        <RichText.Content
                            tagName="div"
                            className="contenido mb-4"
                            value={contenido}
                            style={{
                                color: contenidoColor,
                                fontSize: `${contenidoFontSize}px`,
                                fontWeight: contenidoFontWeight,
                                textAlign: textAlign
                            }}
                        />

                        {showButton && (
                            <a 
                                href={buttonUrl} 
                                className="btn btn-custom"
                                style={{
                                    backgroundColor: buttonBgColor,
                                    color: buttonTextColor
                                }}
                            >
                                {buttonText}
                            </a>
                        )}
                    </div>
                    
                    <div className={imagenClasses}>
                        <img src={imagen} alt={imagenAlt} className="img-fluid rounded shadow-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}