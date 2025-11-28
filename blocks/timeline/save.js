import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { titulo, descripcion, items } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5 bg-white',
        id: 'timeline'
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

                <div className="position-relative mt-5">
                    <div className="timeline-line"></div>

                    {items.map((item, index) => {
                        const isLeft = index % 2 === 0;

                        return (
                            <div key={index} className="row mb-5 position-relative">
                                {isLeft && (
                                    <>
                                        <div className="col-md-6 text-end pe-md-5">
                                            <div className="card card-custom shadow-sm">
                                                {item.image && (
                                                    <img 
                                                        src={item.image} 
                                                        className="card-img-top" 
                                                        alt=""
                                                        style={{ height: '200px', objectFit: 'cover' }}
                                                    />
                                                )}
                                                <div className="card-body">
                                                    <h3 className="h5 fw-bold text-primary-custom">{item.year}</h3>
                                                    <RichText.Content
                                                        tagName="p"
                                                        className="small mb-0"
                                                        value={item.text}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6"></div>
                                    </>
                                )}

                                <div className="timeline-badge">
                                    <span></span>
                                </div>

                                {!isLeft && (
                                    <>
                                        <div class="col-md-6"></div>

                                        <div className="col-md-6 ps-md-5">
                                            <div className="card card-custom shadow-sm">
                                                {item.image && (
                                                    <img 
                                                        src={item.image} 
                                                        className="card-img-top" 
                                                        alt=""
                                                        style={{ height: '200px', objectFit: 'cover' }}
                                                    />
                                                )}
                                                <div className="card-body">
                                                    <h3 className="h5 fw-bold text-primary-custom">{item.year}</h3>
                                                    <RichText.Content
                                                        tagName="p"
                                                        className="small mb-0"
                                                        value={item.text}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                )}

                                {isLeft && <div className="col-md-6"></div>}
                                {!isLeft && <div className="col-md-6"></div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}