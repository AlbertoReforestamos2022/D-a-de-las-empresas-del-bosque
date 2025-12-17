import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion,
        direccion,
        tituloDireccion,
        mapaUrl,
        telefono,
        email,
        whatsapp,
        mensajeWhatsapp,
        horario,
        mostrarTituloDireccion,
        mostrarDireccion,
        mostrarTelefono,
        mostrarEmail,
        mostrarWhatsapp,
        mostrarHorario,
        mapaAltura,
        mapaPosicion,
        backgroundColor,
        tituloColor,
        descripcionColor,
        cardBgColor,
        cardTextColor,
        iconColor,
        whatsappButtonBg,
        whatsappButtonText,
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

    const generateWhatsappLink = () => {
        if (!whatsapp) return '#';
        const numero = whatsapp.replace(/\D/g, ''); // Solo números
        const mensaje = encodeURIComponent(mensajeWhatsapp);
        return `https://wa.me/${numero}?text=${mensaje}`;
    };

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

                <div className="row g-4 align-items-center">
                    {/* Mapa */}
                    <div className={`col-lg-6 ${mapaPosicion === 'derecha' ? 'order-lg-2' : ''}`}>
                        <div className="mapa-container" style={{ height: `${mapaAltura}px` }}>
                            {mapaUrl && (
                                <div 
                                    dangerouslySetInnerHTML={{ __html: mapaUrl }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Información de Contacto */}
                    <div className={`col-lg-6 ${mapaPosicion === 'derecha' ? 'order-lg-1' : ''}`}>
                        <div 
                            className="contacto-card p-4"
                            style={{
                                backgroundColor: cardBgColor,
                                color: cardTextColor
                            }}
                        >
                            {mostrarTituloDireccion && tituloDireccion && (
                                <h3 className="mb-4">{tituloDireccion}</h3>
                            )}

                            {mostrarDireccion && direccion && (
                                <div className="contacto-item mb-3">
                                    <i className="fas fa-map-marker-alt fa-lg me-3" style={{ color: iconColor }}></i>
                                    <span>{direccion}</span>
                                </div>
                            )}

                            {mostrarTelefono && telefono && (
                                <div className="contacto-item mb-3">
                                    <i className="fas fa-phone fa-lg me-3" style={{ color: iconColor }}></i>
                                    <a href={`tel:${telefono.replace(/\s/g, '')}`}>{telefono}</a>
                                </div>
                            )}

                            {mostrarEmail && email && (
                                <div className="contacto-item mb-3">
                                    <i className="fas fa-envelope fa-lg me-3" style={{ color: iconColor }}></i>
                                    <a href={`mailto:${email}`}>{email}</a>
                                </div>
                            )}

                            {mostrarHorario && horario && (
                                <div className="contacto-item mb-3">
                                    <i className="fas fa-clock fa-lg me-3" style={{ color: iconColor }}></i>
                                    <span style={{ whiteSpace: 'pre-line' }}>{horario}</span>
                                </div>
                            )}

                            {mostrarWhatsapp && whatsapp && (
                                <div className="mt-4">
                                    <a 
                                        href={generateWhatsappLink()}
                                        className="btn btn-whatsapp w-100"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            backgroundColor: whatsappButtonBg,
                                            color: whatsappButtonText,
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <i className="fab fa-whatsapp me-2"></i>
                                        Contáctanos por WhatsApp
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}