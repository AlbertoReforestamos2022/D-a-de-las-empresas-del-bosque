import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion, 
        categorias,
        backgroundColor,
        tituloColor,
        descripcionColor,
        tabActiveColor,
        tabInactiveColor,
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

    const tabsId = `galeria-${Math.random().toString(36).substr(2, 9)}`;

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

                {categorias.length > 0 && (
                    <>
                        {/* Tabs */}
                        <ul className="nav nav-tabs mb-4 justify-content-center border-0" id={`${tabsId}-tabs`} role="tablist">
                            {categorias.map((cat, index) => (
                                <li key={index} className="nav-item" role="presentation">
                                    <button 
                                        className={`nav-link ${index === 0 ? 'active' : ''}`}
                                        id={`${tabsId}-tab-${index}`}
                                        data-bs-toggle="tab"
                                        data-bs-target={`#${tabsId}-panel-${index}`}
                                        type="button"
                                        role="tab"
                                        style={{
                                            '--tab-active-bg': tabActiveColor,
                                            '--tab-inactive-color': tabInactiveColor,
                                            borderRadius: '50px'
                                        }}
                                    >
                                        {cat.nombre}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Tab Content */}
                        <div className="tab-content" id={`${tabsId}-content`}>
                            {categorias.map((cat, catIndex) => (
                                <div 
                                    key={catIndex}
                                    className={`tab-pane fade ${catIndex === 0 ? 'show active' : ''}`}
                                    id={`${tabsId}-panel-${catIndex}`}
                                    role="tabpanel"
                                >
                                    <div className="row g-3">
                                        {cat.imagenes && cat.imagenes.map((img, imgIndex) => (
                                            <div key={imgIndex} className="col-md-4 col-6">
                                                <div className="galeria-item">
                                                    <img 
                                                        src={img.url} 
                                                        alt={img.alt} 
                                                        className="img-fluid rounded"
                                                        style={{ objectFit: 'cover', height: '250px', width: '100%' }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}