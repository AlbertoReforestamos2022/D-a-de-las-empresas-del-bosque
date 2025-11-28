import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, IconButton } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { titulo, descripcion, items } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5 bg-white'
    });

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setAttributes({ items: newItems });
    };

    const addItem = () => {
        const newItems = [...items, { year: "", text: "", image: "" }];
        setAttributes({ items: newItems });
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setAttributes({ items: newItems });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Items de Timeline', 'diadelasempresasdelbosque')}>
                    <Button 
                        variant="primary" 
                        onClick={addItem}
                        className="mb-3"
                    >
                        {__('Agregar Item', 'diadelasempresasdelbosque')}
                    </Button>
                    
                    {items.map((item, index) => (
                        <div key={index} className="border-bottom mb-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Item {index + 1}</strong>
                                <Button
                                    isDestructive
                                    isSmall
                                    onClick={() => removeItem(index)}
                                >
                                    Eliminar
                                </Button>
                            </div>
                            
                            <TextControl
                                label={__('Año', 'diadelasempresasdelbosque')}
                                value={item.year}
                                onChange={(value) => updateItem(index, 'year', value)}
                            />

                            <MediaUpload
                                onSelect={(media) => updateItem(index, 'image', media.url)}
                                allowedTypes={['image']}
                                value={item.image}
                                render={({ open }) => (
                                    <div className="mb-2">
                                        {item.image ? (
                                            <div>
                                                <img src={item.image} alt="" style={{ width: '100%', marginBottom: '8px' }} />
                                                <Button onClick={open} variant="secondary" className="me-2">
                                                    Cambiar imagen
                                                </Button>
                                                <Button 
                                                    isDestructive 
                                                    onClick={() => updateItem(index, 'image', '')}
                                                >
                                                    Eliminar imagen
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button onClick={open} variant="secondary">
                                                Agregar imagen (opcional)
                                            </Button>
                                        )}
                                    </div>
                                )}
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
                            placeholder="Título de la línea del tiempo"
                        />
                        <RichText
                            tagName="p"
                            className="lead text-muted"
                            value={descripcion}
                            onChange={(value) => setAttributes({ descripcion: value })}
                            placeholder="Descripción"
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
                                                        <h3 className="h5 fw-bold text-primary-custom">
                                                            {item.year || `Año ${index + 1}`}
                                                        </h3>
                                                        <RichText
                                                            tagName="p"
                                                            className="small mb-0"
                                                            value={item.text}
                                                            onChange={(value) => updateItem(index, 'text', value)}
                                                            placeholder="Descripción del evento"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6"></div>
                                        </>

                                    )}

                                    <div className="timeline-badge">
                                        <span></span>
                                    </div>

                                    {!isLeft && (
                                        <>
                                            <div className="col-md-6"></div>

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
                                                        <h3 className="h5 fw-bold text-primary-custom">
                                                            {item.year || `Año ${index + 1}`}
                                                        </h3>
                                                        <RichText
                                                            tagName="p"
                                                            className="small mb-0"
                                                            value={item.text}
                                                            onChange={(value) => updateItem(index, 'text', value)}
                                                            placeholder="Descripción del evento"
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
        </>
    );
}