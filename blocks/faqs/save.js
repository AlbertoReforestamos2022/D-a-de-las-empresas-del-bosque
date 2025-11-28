import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, descripcion, preguntas } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        id: 'faq'
    });

    return (
        <section {...blockProps}>
            <div className="container">
                <div className="text-center mb-5">
                    <RichText.Content
                        tagName="h2"
                        className="display-5 fw-bold"
                        value={titulo}
                    />
                    <RichText.Content
                        tagName="p"
                        className="lead text-muted"
                        value={descripcion}
                    />
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {preguntas.map((item, index) => (
                            <details key={index} className="card card-custom mb-3 border">
                                <summary className="card-body d-flex align-items-center justify-content-between fw-bold">
                                    <RichText.Content
                                        tagName="span"
                                        value={item.pregunta}
                                    />
                                    <span className="material-symbols-outlined">expand_more</span>
                                </summary>
                                <div className="card-body pt-0">
                                    <RichText.Content
                                        tagName="p"
                                        className="mb-0"
                                        value={item.respuesta}
                                    />
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}