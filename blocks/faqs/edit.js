import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, RangeControl, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
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

    const blockProps = useBlockProps({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const updatePregunta = (index, field, value) => {
        const newPreguntas = [...preguntas];
        newPreguntas[index][field] = value;
        setAttributes({ preguntas: newPreguntas });
    };

    const addPregunta = () => {
        const newPreguntas = [...preguntas, { pregunta: '', respuesta: '' }];
        setAttributes({ preguntas: newPreguntas });
    };

    const removePregunta = (index) => {
        const newPreguntas = preguntas.filter((_, i) => i !== index);
        setAttributes({ preguntas: newPreguntas });
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
                            label: __('Color de fondo de la sección', 'diadelasempresasdelbosque')
                        },
                        {
                            value: tituloColor,
                            onChange: (color) => setAttributes({ tituloColor: color }),
                            label: __('Color del título principal', 'diadelasempresasdelbosque')
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
                            value: preguntaColor,
                            onChange: (color) => setAttributes({ preguntaColor: color }),
                            label: __('Color de las preguntas', 'diadelasempresasdelbosque')
                        },
                        {
                            value: respuestaColor,
                            onChange: (color) => setAttributes({ respuestaColor: color }),
                            label: __('Color de las respuestas', 'diadelasempresasdelbosque')
                        }
                    ]}
                />

                {/* Tipografía */}
                <PanelBody title={__('Tipografía', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <RangeControl
                        label={__('Tamaño del título principal (px)', 'diadelasempresasdelbosque')}
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

                    <RangeControl
                        label={__('Tamaño de las preguntas (px)', 'diadelasempresasdelbosque')}
                        value={preguntaFontSize}
                        onChange={(value) => setAttributes({ preguntaFontSize: value })}
                        min={14}
                        max={28}
                    />

                    <RangeControl
                        label={__('Tamaño de las respuestas (px)', 'diadelasempresasdelbosque')}
                        value={respuestaFontSize}
                        onChange={(value) => setAttributes({ respuestaFontSize: value })}
                        min={12}
                        max={24}
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

                {/* Preguntas */}
                <PanelBody title={__('Preguntas y Respuestas', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addPregunta}
                        className="mb-3"
                    >
                        {__('Agregar Pregunta', 'diadelasempresasdelbosque')}
                    </Button>

                    {preguntas.map((item, index) => (
                        <div key={index} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Pregunta {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removePregunta(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                            <TextControl
                                label={__('Pregunta', 'diadelasempresasdelbosque')}
                                value={item.pregunta}
                                onChange={(value) => updatePregunta(index, 'pregunta', value)}
                            />

                            <TextControl
                                label={__('Respuesta', 'diadelasempresasdelbosque')}
                                value={item.respuesta}
                                onChange={(value) => updatePregunta(index, 'respuesta', value)}
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

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {preguntas.map((item, index) => (
                                <details key={index} className="faq-item mb-3" style={{ backgroundColor: cardBgColor }}>
                                    <summary 
                                        className="faq-pregunta p-3"
                                        style={{
                                            color: preguntaColor,
                                            fontSize: `${preguntaFontSize}px`
                                        }}
                                    >
                                        {item.pregunta}
                                        <span style={{ transition: 'transform 0.3s' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                                            </svg>
                                        </span>
                                    </summary>
                                    <div 
                                        className="faq-respuesta p-3"
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
        </>
    );
}