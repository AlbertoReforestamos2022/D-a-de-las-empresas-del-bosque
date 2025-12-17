import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion, 
        logos,
        columnas,
        backgroundColor,
        tituloColor,
        descripcionColor,
        cardBgColor,
        tituloFontSize,
        descripcionFontSize,
        textAlign,
        logoMaxHeight,
        logoMaxWidth,
        logoObjectFit
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

                <div className="row g-4 justify-content-center">
                    {logos.map((logo, index) => (
                        <div key={index} className={`col-lg-${12/columnas} col-md-4 col-6`}>
                            <div className="logo-card" style={{ backgroundColor: cardBgColor }}>
                                {logo.link ? (
                                    <a href={logo.link} target="_blank" rel="noopener noreferrer">
                                        <img 
                                            src={logo.url} 
                                            alt={logo.alt}
                                            style={{ 
                                                maxHeight: `${logo.maxHeight || logoMaxHeight}px`,
                                                maxWidth: `${logo.maxWidth || logoMaxWidth}px`,
                                                objectFit: logo.objectFit || logoObjectFit
                                            }}
                                        />
                                    </a>
                                ) : (
                                    <img 
                                        src={logo.url} 
                                        alt={logo.alt}
                                        style={{ 
                                            maxHeight: `${logo.maxHeight || logoMaxHeight}px`,
                                            maxWidth: `${logo.maxWidth || logoMaxWidth}px`,
                                            objectFit: logo.objectFit || logoObjectFit
                                        }}
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