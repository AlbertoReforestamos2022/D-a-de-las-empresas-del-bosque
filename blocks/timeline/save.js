import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion, 
        items,
        backgroundColor,
        tituloColor,
        descripcionColor,
        lineColor,
        badgeColor,
        cardTextColor,
        tituloFontSize,
        descripcionFontSize,
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

                <div className="timeline" style={{ '--line-color': lineColor, '--badge-color': badgeColor }}>
                    {items.map((item, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker" style={{ background: badgeColor }}></div>
                                <div className={`timeline-content ${isLeft ? '' : 'timeline-content-right'}`} style={{ color: cardTextColor }}>
                                    <div className="timeline-year" style={{ color: badgeColor }}>{item.year}</div>
                                    {item.imagen && <img src={item.imagen} alt="" className="timeline-img" />}
                                    <p>{item.texto}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}