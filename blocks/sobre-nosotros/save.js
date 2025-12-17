import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        contenido, 
        backgroundColor, 
        tituloColor, 
        contenidoColor,
        tituloFontFamily,
        contenidoFontFamily,
        tituloFontSize,
        contenidoFontSize,
        tituloFontWeight,
        contenidoFontWeight,
        textAlign,
        altoSeccion
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor,
            textAlign: textAlign,
            height: altoSeccion,
            display: 'grid',
            alignItems: 'center'
        }
    });

    return (
        <section {...blockProps}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <RichText.Content
                            tagName="h2"
                            className="mb-4"
                            value={titulo}
                            style={{
                                color: tituloColor,
                                fontFamily: tituloFontFamily,
                                fontSize: `${tituloFontSize}px`,
                                fontWeight: tituloFontWeight
                            }}
                        />

                        <RichText.Content
                            tagName="div"
                            className="contenido"
                            value={contenido}
                            style={{
                                color: contenidoColor,
                                fontFamily: contenidoFontFamily,
                                fontSize: `${contenidoFontSize}px`,
                                fontWeight: contenidoFontWeight
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}