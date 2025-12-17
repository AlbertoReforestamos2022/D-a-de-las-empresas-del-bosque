import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion, 
        preguntas,
        backgroundColor,
        tituloColor,
        descripcionColor,
        preguntaColor,
        respuestaColor,
        cardBgColor,
        tituloFontSize,
        descripcionFontSize,
        preguntaFontSize,
        respuestaFontSize,
        textAlign
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
    });

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

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {preguntas.map((item, index) => (
                            <details key={index} className="faq-item mb-3" style={{ backgroundColor: cardBgColor, borderRadius: '10px', overflow: 'hidden' }}>
                                <summary 
                                    className="faq-pregunta p-3"
                                    style={{
                                        color: preguntaColor,
                                        fontSize: `${preguntaFontSize}px`,
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        listStyle: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span>{item.pregunta}</span>
                                    
                                    <span style={{ transition: 'transform 0.3s' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                                        </svg>
                                    </span>
                                
                                </summary>
                                <div 
                                    className="faq-respuesta p-3 pt-0"
                                    style={{
                                        color: respuestaColor,
                                        fontSize: `${respuestaFontSize}px`
                                    }}
                                >
                                    {item.respuesta}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}