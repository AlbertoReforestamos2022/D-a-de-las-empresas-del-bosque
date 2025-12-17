import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion, 
        iniciativas,
        columnas,
        backgroundColor,
        tituloColor,
        descripcionColor,
        cardBgColor,
        cardTextColor,
        buttonBgColor,
        buttonTextColor,
        modalHeaderBg,
        modalHeaderText,
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

                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                    {iniciativas.map((iniciativa, index) => {
                        const modalId = `modal-iniciativa-${index}`;
                        
                        return (
                            <div key={index} className={`col-md-${12 / columnas}`}>
                                {/* Card */}
                                <div className="card h-100 iniciativa-card d-grid align-items-end" style={{ backgroundColor: cardBgColor, color: cardTextColor, justifyItems: 'center' }}>
                                    {iniciativa.imagen && (
                                        <img src={iniciativa.imagen} className="card-img-top" style={{ width: iniciativa.tamanioImgCard }} alt={iniciativa.tituloCard} />
                                    )}
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <h6 className="card-title">{iniciativa.tituloCard}</h6>
                                        <button 
                                            type="button" 
                                            className="btn mt-auto"
                                            data-bs-toggle="modal" 
                                            data-bs-target={`#${modalId}`}
                                            style={{
                                                backgroundColor: buttonBgColor,
                                                color: buttonTextColor,
                                                border: 'none'
                                            }}
                                        >
                                            {iniciativa.textoBoton}
                                        </button>
                                    </div>
                                </div>

                                {/* Modal */}
                                <div 
                                    className="modal fade" 
                                    id={modalId} 
                                    tabIndex="-1" 
                                    aria-labelledby={`${modalId}Label`}
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog modal-dialog-centered modal-lg">
                                        <div className="modal-content">
                                            <div 
                                                className="modal-header" 
                                                style={{ 
                                                    backgroundColor: modalHeaderBg, 
                                                    color: modalHeaderText 
                                                }}
                                            >
                                                <h5 className="modal-title" id={`${modalId}Label`}>
                                                    {iniciativa.tituloModal}
                                                </h5>
                                                <button 
                                                    type="button" 
                                                    className="btn-close btn-close-white" 
                                                    data-bs-dismiss="modal" 
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                            <div className="modal-body">
                                                <RichText.Content
                                                    tagName="div"
                                                    value={iniciativa.contenidoModal}
                                                    className="modal-content-text"
                                                />
                                            </div>
                                            <div className="modal-footer">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-secondary" 
                                                    data-bs-dismiss="modal"
                                                >
                                                    {iniciativa.textoCerrar}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}