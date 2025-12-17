import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, ToggleControl, RangeControl, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        titulo, 
        descripcion,
        tituloDireccion,
        direccion,
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

    const blockProps = useBlockProps({
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
        <>
            <InspectorControls>
                {/* Colores */}
                <PanelColorSettings
                    title={__('Colores', 'diadelasempresasdelbosque')}
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: __('Fondo de sección', 'diadelasempresasdelbosque')
                        },
                        {
                            value: tituloColor,
                            onChange: (color) => setAttributes({ tituloColor: color }),
                            label: __('Color del título', 'diadelasempresasdelbosque')
                        },
                        {
                            value: descripcionColor,
                            onChange: (color) => setAttributes({ descripcionColor: color }),
                            label: __('Color de la descripción', 'diadelasempresasdelbosque')
                        },
                        {
                            value: cardBgColor,
                            onChange: (color) => setAttributes({ cardBgColor: color }),
                            label: __('Fondo de la tarjeta de contacto', 'diadelasempresasdelbosque')
                        },
                        {
                            value: cardTextColor,
                            onChange: (color) => setAttributes({ cardTextColor: color }),
                            label: __('Texto de la tarjeta', 'diadelasempresasdelbosque')
                        },
                        {
                            value: iconColor,
                            onChange: (color) => setAttributes({ iconColor: color }),
                            label: __('Color de íconos', 'diadelasempresasdelbosque')
                        },
                        {
                            value: whatsappButtonBg,
                            onChange: (color) => setAttributes({ whatsappButtonBg: color }),
                            label: __('Fondo botón WhatsApp', 'diadelasempresasdelbosque')
                        },
                        {
                            value: whatsappButtonText,
                            onChange: (color) => setAttributes({ whatsappButtonText: color }),
                            label: __('Texto botón WhatsApp', 'diadelasempresasdelbosque')
                        }
                    ]}
                />

                {/* Tipografía */}
                <PanelBody title={__('Tipografía', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <RangeControl
                        label={__('Tamaño del título (px)', 'diadelasempresasdelbosque')}
                        value={tituloFontSize}
                        onChange={(value) => setAttributes({ tituloFontSize: value })}
                        min={20}
                        max={80}
                    />

                    <RangeControl
                        label={__('Tamaño de la descripción (px)', 'diadelasempresasdelbosque')}
                        value={descripcionFontSize}
                        onChange={(value) => setAttributes({ descripcionFontSize: value })}
                        min={12}
                        max={32}
                    />

                    <SelectControl
                        label={__('Alineación del encabezado', 'diadelasempresasdelbosque')}
                        value={textAlign}
                        options={[
                            { label: 'Izquierda', value: 'left' },
                            { label: 'Centro', value: 'center' },
                            { label: 'Derecha', value: 'right' }
                        ]}
                        onChange={(value) => setAttributes({ textAlign: value })}
                    />
                </PanelBody>

                {/* Configuración del Mapa */}
                <PanelBody title={__('Configuración del Mapa', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <TextareaControl
                        label={__('URL del Mapa (iframe de Google Maps)', 'diadelasempresasdelbosque')}
                        value={mapaUrl}
                        onChange={(value) => setAttributes({ mapaUrl: value })}
                        placeholder="Pega aquí el código embed de Google Maps"
                        rows={4}
                        help={__('Ve a Google Maps → Compartir → Insertar un mapa → Copia el código HTML', 'diadelasempresasdelbosque')}
                    />

                    <RangeControl
                        label={__('Altura del mapa (px)', 'diadelasempresasdelbosque')}
                        value={mapaAltura}
                        onChange={(value) => setAttributes({ mapaAltura: value })}
                        min={200}
                        max={600}
                    />

                    <SelectControl
                        label={__('Posición del mapa', 'diadelasempresasdelbosque')}
                        value={mapaPosicion}
                        options={[
                            { label: 'Izquierda', value: 'izquierda' },
                            { label: 'Derecha', value: 'derecha' }
                        ]}
                        onChange={(value) => setAttributes({ mapaPosicion: value })}
                    />
                </PanelBody>

                {/* Información de Contacto */}
                <PanelBody title={__('Información de Contacto', 'diadelasempresasdelbosque')} initialOpen={true}>

                    <ToggleControl
                        label={__('Mostrar titulo de la dirección', 'diadelasempresasdelbosque')}
                        checked={mostrarTituloDireccion}
                        onChange={(value) => setAttributes({ mostrarTituloDireccion: value })}
                    />
                    {mostrarTituloDireccion && (
                        <TextControl
                            label={__('Titulo dirección', 'diadelasempresasdelbosque')}
                            value={tituloDireccion}
                            onChange={(value) => setAttributes({ direccion: value })}
                            placeholder="Titulo"
                        />
                    )}

                    <ToggleControl
                        label={__('Mostrar dirección', 'diadelasempresasdelbosque')}
                        checked={mostrarDireccion}
                        onChange={(value) => setAttributes({ mostrarDireccion: value })}
                    />
                    {mostrarDireccion && (
                        <TextControl
                            label={__('Dirección', 'diadelasempresasdelbosque')}
                            value={direccion}
                            onChange={(value) => setAttributes({ direccion: value })}
                            placeholder="Calle Example 123, Ciudad, País"
                        />
                    )}

                    <ToggleControl
                        label={__('Mostrar teléfono', 'diadelasempresasdelbosque')}
                        checked={mostrarTelefono}
                        onChange={(value) => setAttributes({ mostrarTelefono: value })}
                    />
                    {mostrarTelefono && (
                        <TextControl
                            label={__('Teléfono', 'diadelasempresasdelbosque')}
                            value={telefono}
                            onChange={(value) => setAttributes({ telefono: value })}
                            placeholder="+52 123 456 7890"
                        />
                    )}

                    <ToggleControl
                        label={__('Mostrar email', 'diadelasempresasdelbosque')}
                        checked={mostrarEmail}
                        onChange={(value) => setAttributes({ mostrarEmail: value })}
                    />
                    {mostrarEmail && (
                        <TextControl
                            label={__('Email', 'diadelasempresasdelbosque')}
                            value={email}
                            onChange={(value) => setAttributes({ email: value })}
                            placeholder="contacto@ejemplo.com"
                            type="email"
                        />
                    )}

                    <ToggleControl
                        label={__('Mostrar WhatsApp', 'diadelasempresasdelbosque')}
                        checked={mostrarWhatsapp}
                        onChange={(value) => setAttributes({ mostrarWhatsapp: value })}
                    />
                    {mostrarWhatsapp && (
                        <>
                            <TextControl
                                label={__('Número de WhatsApp (con código de país)', 'diadelasempresasdelbosque')}
                                value={whatsapp}
                                onChange={(value) => setAttributes({ whatsapp: value })}
                                placeholder="+5212345678901"
                                help={__('Incluye el código de país sin espacios. Ej: +5212345678901', 'diadelasempresasdelbosque')}
                            />
                            <TextControl
                                label={__('Mensaje predeterminado de WhatsApp', 'diadelasempresasdelbosque')}
                                value={mensajeWhatsapp}
                                onChange={(value) => setAttributes({ mensajeWhatsapp: value })}
                                placeholder="Hola, me gustaría obtener más información"
                            />
                        </>
                    )}

                    <ToggleControl
                        label={__('Mostrar horario', 'diadelasempresasdelbosque')}
                        checked={mostrarHorario}
                        onChange={(value) => setAttributes({ mostrarHorario: value })}
                    />
                    {mostrarHorario && (
                        <TextareaControl
                            label={__('Horario de atención', 'diadelasempresasdelbosque')}
                            value={horario}
                            onChange={(value) => setAttributes({ horario: value })}
                            placeholder="Lunes a Viernes: 9:00 AM - 6:00 PM"
                            rows={3}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="text-center mb-5" style={{ textAlign: textAlign }}>
                        <RichText
                            tagName="h2"
                            className="section-title mb-3"
                            value={titulo}
                            onChange={(value) => setAttributes({ titulo: value })}
                            placeholder="Título"
                            style={{
                                color: tituloColor,
                                fontSize: `${tituloFontSize}px`
                            }}
                        />
                        <RichText
                            tagName="p"
                            className="section-description"
                            value={descripcion}
                            onChange={(value) => setAttributes({ descripcion: value })}
                            placeholder="Descripción"
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
                                {mapaUrl ? (
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: mapaUrl }}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <div 
                                        className="mapa-placeholder d-flex align-items-center justify-content-center"
                                        style={{ 
                                            width: '100%', 
                                            height: '100%',
                                            background: '#e9ecef',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <p className="text-muted">
                                            <i className="fas fa-map-marked-alt fa-3x mb-3"></i>
                                            <br />
                                            Agrega la URL del mapa en el Inspector
                                        </p>
                                    </div>
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
                                                color: whatsappButtonText
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
        </>
    );
}