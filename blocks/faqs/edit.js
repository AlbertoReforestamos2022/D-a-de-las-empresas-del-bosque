import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, descripcion, preguntas } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5'
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
                <PanelBody title={__('Preguntas', 'diadelasempresasdelbosque')}>
                    <Button 
                        variant="primary" 
                        onClick={addPregunta}
                        className="mb-3"
                    >
                        {__('Agregar Pregunta', 'diadelasempresasdelbosque')}
                    </Button>

                    {preguntas.map((item, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
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
                                placeholder="¿Cuál es tu pregunta?"
                            />
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="text-center mb-5">
                        <RichText
                            tagName="h2"
                            className="display-5 fw-bold"
                            value={titulo}
                            onChange={(value) => setAttributes({ titulo: value })}
                            placeholder="Título de FAQ"
                        />
                        <RichText
                            tagName="p"
                            className="lead text-muted"
                            value={descripcion}
                            onChange={(value) => setAttributes({ descripcion: value })}
                            placeholder="Descripción"
                        />
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {preguntas.map((item, index) => (
                                <div key={index} className="card card-custom mb-3 border">
                                    <div className="card-body">
                                        <div className="d-flex align-items-start justify-content-between gap-3">
                                            <div className="flex-grow-1">
                                                <RichText
                                                    tagName="div"
                                                    className="fw-bold mb-2"
                                                    value={item.pregunta}
                                                    onChange={(value) => updatePregunta(index, 'pregunta', value)}
                                                    placeholder="¿Pregunta?"
                                                />
                                                <RichText
                                                    tagName="div"
                                                    value={item.respuesta}
                                                    onChange={(value) => updatePregunta(index, 'respuesta', value)}
                                                    placeholder="Respuesta..."
                                                />
                                            </div>
                                            <span className="material-symbols-outlined text-muted">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}