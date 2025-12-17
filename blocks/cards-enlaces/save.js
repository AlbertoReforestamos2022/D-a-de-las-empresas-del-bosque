import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion, 
        cards,
        columnas,
        backgroundColor,
        tituloColor,
        descripcionColor,
        cardBgColor,
        cardTextColor,
        cardDescripcionoColor,
        buttonBgColor,
        buttonTextColor,
        tituloFontSize,
        descripcionFontSize,
        cardTitleFontSize,
        textAlign,
        imageHeight,
        abrirEnNuevaVentana,
        cardDescripcionFontSize,
        cardWidth,
        cardHeight        
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

                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                    {cards.map((card, index) => (
                        <div key={index} className={`col-md-${12 / columnas} d-flex justify-content-center`}>
                            <div 
                                className="card card-enlace d-grid align-items-center" 

                                style={{ 
                                    backgroundColor: cardBgColor, 
                                    width: cardWidth, 
                                    height: cardHeight 
                                }}>

                                {card.imagen && (
                                    <img 
                                        src={card.imagen} 
                                        className="card-img-top" 
                                        alt={card.tituloCard}
                                        style={{ height: `${imageHeight}px`, objectFit: 'contain' }}
                                    />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 
                                        className="card-title text-center"
                                        style={{ fontSize: `${cardTitleFontSize}px`, color: cardTextColor }}
                                    >
                                        {card.tituloCard}
                                    </h5>

                                        {/* Renderizar la descripción en caso de que sea True */}
                                        {(card.showDescripcion !== undefined ? card.showDescripcion : true) && (
                                            <p 
                                                className="text-center"
                                                style={{
                                                    fontSize: `${cardDescripcionFontSize}px`,
                                                    color: cardDescripcionoColor
                                                }}
                                            >
                                                {card.descripcionCard}
                                            </p>
                                        )}  

                                    {/* Renderizar botón solo si showButton es true */}
                                    {(card.showButton !== undefined ? card.showButton : true) && (
                                        <a 
                                            href={card.enlace} 
                                            className="btn mt-auto"
                                            style={{
                                                backgroundColor: buttonBgColor,
                                                color: buttonTextColor,
                                                textDecoration: 'none'
                                            }}
                                            target={abrirEnNuevaVentana ? '_blank' : '_self'}
                                            rel={abrirEnNuevaVentana ? 'noopener noreferrer' : ''}
                                        >
                                            {card.textoBoton}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}