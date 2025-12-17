import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, RangeControl, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        titulo, 
        descripcion, 
        documentos,
        videos,
        capacitaciones,
        backgroundColor,
        tituloColor,
        descripcionColor,
        cardBgColor,
        cardTextColor,
        btnBgColor,
        btnTextColor,
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

    // Funciones para documentos
    const updateDocumento = (index, field, value) => {
        const newDocs = [...documentos];
        newDocs[index][field] = value;
        setAttributes({ documentos: newDocs });
    };

    const addDocumento = () => {
        setAttributes({ documentos: [...documentos, { url: '', titulo: '', tipo: 'PDF' }] });
    };

    const removeDocumento = (index) => {
        const newDocs = documentos.filter((_, i) => i !== index);
        setAttributes({ documentos: newDocs });
    };

    // Funciones para videos
    const updateVideo = (index, field, value) => {
        const newVideos = [...videos];
        newVideos[index][field] = value;
        setAttributes({ videos: newVideos });
    };

    const addVideo = () => {
        setAttributes({ videos: [...videos, { titulo: '', url: '#' }] });
    };

    const removeVideo = (index) => {
        const newVideos = videos.filter((_, i) => i !== index);
        setAttributes({ videos: newVideos });
    };

    // Funciones para capacitaciones
    const updateCapacitacion = (index, field, value) => {
        const newCaps = [...capacitaciones];
        newCaps[index][field] = value;
        setAttributes({ capacitaciones: newCaps });
    };

    const addCapacitacion = () => {
        setAttributes({ capacitaciones: [...capacitaciones, { titulo: '', url: '#' }] });
    };

    const removeCapacitacion = (index) => {
        const newCaps = capacitaciones.filter((_, i) => i !== index);
        setAttributes({ capacitaciones: newCaps });
    };

    const carouselId = `docsCarousel-${Math.random().toString(36).substr(2, 9)}`;

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
                            label: __('Color de fondo', 'diadelasempresasdelbosque')
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
                            label: __('Color de fondo de cards', 'diadelasempresasdelbosque')
                        },
                        {
                            value: cardTextColor,
                            onChange: (color) => setAttributes({ cardTextColor: color }),
                            label: __('Color de texto de cards', 'diadelasempresasdelbosque')
                        },
                        {
                            value: btnBgColor,
                            onChange: (color) => setAttributes({btnBgColor: color}),
                            label: __('Fondo botones cards', 'diadelasempresasdelbosque')
                        }, 
                        {
                            value: btnTextColor,
                            onChange: (color)=> setAttributes({ btnTextColor: color }),
                            label: __('Color del texto de los botones de los cards', 'diadelasempresasdelbosque')
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

                {/* Documentos PDFs */}
                <PanelBody title={__('Documentos (PDFs)', 'diadelasempresasdelbosque')}>
                    <Button variant="primary" onClick={addDocumento} className="mb-3">
                        {__('Agregar Documento', 'diadelasempresasdelbosque')}
                    </Button>

                    {documentos.map((doc, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between mb-2">
                                <strong>Documento {index + 1}</strong>
                                <Button isDestructive isSmall onClick={() => removeDocumento(index)}>Eliminar</Button>
                            </div>

                            <TextControl
                                label="Título"
                                value={doc.titulo}
                                onChange={(value) => updateDocumento(index, 'titulo', value)}
                            />

                            <MediaUpload
                                onSelect={(media) => updateDocumento(index, 'url', media.url)}
                                allowedTypes={['application/pdf']}
                                value={doc.url}
                                render={({ open }) => (
                                    <Button onClick={open} variant="secondary">
                                        {doc.url ? 'Cambiar PDF' : 'Seleccionar PDF'}
                                    </Button>
                                )}
                            />
                        </div>
                    ))}
                </PanelBody>

                {/* Videos */}
                <PanelBody title={__('Videos', 'diadelasempresasdelbosque')}>
                    <Button variant="primary" onClick={addVideo} className="mb-3">
                        {__('Agregar Video', 'diadelasempresasdelbosque')}
                    </Button>

                    {videos.map((video, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between mb-2">
                                <strong>Video {index + 1}</strong>
                                <Button isDestructive isSmall onClick={() => removeVideo(index)}>Eliminar</Button>
                            </div>

                            <TextControl
                                label="Título"
                                value={video.titulo}
                                onChange={(value) => updateVideo(index, 'titulo', value)}
                            />

                            <TextControl
                                label="URL"
                                value={video.url}
                                onChange={(value) => updateVideo(index, 'url', value)}
                            />
                        </div>
                    ))}
                </PanelBody>

                {/* Capacitaciones */}
                <PanelBody title={__('Capacitaciones', 'diadelasempresasdelbosque')}>
                    <Button variant="primary" onClick={addCapacitacion} className="mb-3">
                        {__('Agregar Capacitación', 'diadelasempresasdelbosque')}
                    </Button>

                    {capacitaciones.map((cap, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between mb-2">
                                <strong>Capacitación {index + 1}</strong>
                                <Button isDestructive isSmall onClick={() => removeCapacitacion(index)}>Eliminar</Button>
                            </div>

                            <TextControl
                                label="Título"
                                value={cap.titulo}
                                onChange={(value) => updateCapacitacion(index, 'titulo', value)}
                            />

                            <TextControl
                                label="URL"
                                value={cap.url}
                                onChange={(value) => updateCapacitacion(index, 'url', value)}
                            />
                        </div>
                    ))}
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

                    <div className="row g-4">
                        {/* Carrusel de PDFs */}
                        {documentos.length > 0 && (
                            <div className="col-lg-6">
                                <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {documentos.map((doc, index) => (
                                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                <div className="document-card p-4" style={{ background: cardBgColor, color: cardTextColor }}>
                                                    <i className="fas fa-file-pdf fa-3x mb-3"></i>
                                                    <h5>{doc.titulo}</h5>
                                                    <a href={doc.url} className="btn mt-3" style={{ backgroundColor: btnBgColor, color: btnTextColor }}>Ver documento</a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {documentos.length > 1 && (
                                        <>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                                            <span class="p-2 rounded-3" aria-hidden="true" style={{ backgroundColor: btnBgColor }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                                </svg>
                                            </span>
                                            <span className="visually-hidden">Anterior</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                                            <span className="p-2 rounded-3" aria-hidden="true" style={{ backgroundColor: btnBgColor }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                                </svg>                                                
                                            </span>
                                            <span className="visually-hidden">Siguiente</span>
                                        </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Videos */}
                        <div className="col-lg-3" style={{ backgroundColor:  cardBgColor,  color: cardTextColor}}>
                            <h4 className="mb-3">Videos</h4>
                            {videos.map((video, index) => (
                                <div key={index} className="document-card mb-3 p-3" style={{ background: btnBgColor, color: btnTextColor, borderRadius: '10px' }}>
                                    <i className="fas fa-play-circle fa-2x mb-2"></i>
                                    <p className="mb-0">{video.titulo}</p>
                                </div>
                            ))}
                        </div>

                        {/* Capacitaciones */}
                        <div className="col-lg-3" style={{ backgroundColor:  cardBgColor,  color: cardTextColor}}>
                            <h4 className="mb-3">Capacitaciones</h4>
                            {capacitaciones.map((cap, index) => (
                                <div key={index} className="document-card mb-3 p-3" style={{ background: btnBgColor, color: btnTextColor, borderRadius: '10px' }}>
                                    <i className="fas fa-graduation-cap fa-2x mb-2"></i>
                                    <p className="mb-0">{cap.titulo}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}