import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        titulo, 
        descripcion, 
        documentos,
        layoutEstilo,
        usarVerMas,
        documentosIniciales,
        documentosPorPagina,
        textoVerMas,
        textoVerMenos,
        verMasButtonBg,
        verMasButtonText,
        backgroundColor,
        tituloColor,
        descripcionColor,
        documentoBgColor,
        documentoTextColor,
        buttonBgColor,
        buttonTextColor,
        iconColor,
        tituloFontSize,
        descripcionFontSize,
        documentoTitleFontSize,
        textAlign,
        abrirEnNuevaVentana,
        mostrarFecha,
        mostrarTamano,
        mostrarDescripcion
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const getIconoTipo = (tipo) => {
        const iconos = {
            'pdf': 'fa-file-pdf',
            'word': 'fa-file-word',
            'excel': 'fa-file-excel',
            'powerpoint': 'fa-file-powerpoint',
            'image': 'fa-file-image',
            'video': 'fa-file-video',
            'audio': 'fa-file-audio',
            'zip': 'fa-file-archive',
            'texto': 'fa-file-alt',
            'otro': 'fa-file'
        };
        return iconos[tipo] || 'fa-file';
    };

    // Generar ID único para este bloque
    const blockId = `documentos-${Math.random().toString(36).substr(2, 9)}`;

    // Renderizar documento individual
    const renderDocumento = (doc, index) => {
        const itemClass = usarVerMas && index >= documentosIniciales ? 'documento-oculto' : '';
        
        return (
            <div 
                key={index} 
                className={`documento-item ${itemClass}`}
                data-index={index}
                style={{
                    backgroundColor: documentoBgColor,
                    color: documentoTextColor
                }}
            >
                {doc.mostrarIcono && (
                    <div className="documento-icon" style={{ color: iconColor }}>
                        <i className={`fas ${getIconoTipo(doc.tipoArchivo)} fa-2x`}></i>
                    </div>
                )}
                <div className="documento-info">
                    <h5 style={{ fontSize: `${documentoTitleFontSize}px` }}>{doc.nombre}</h5>
                    {mostrarDescripcion && doc.descripcion && (
                        <p className="documento-descripcion">{doc.descripcion}</p>
                    )}
                    <div className="documento-meta">
                        {mostrarFecha && doc.fecha && (
                            <span>
                                <i className="far fa-calendar me-1"></i> {doc.fecha}
                            </span>
                        )}
                        {mostrarTamano && doc.tamano && (
                            <span>
                                <i className="far fa-file me-1"></i> {doc.tamano}
                            </span>
                        )}
                    </div>
                </div>
                <div className="documento-action">
                    <a 
                        href={doc.archivo} 
                        className="btn"
                        style={{
                            backgroundColor: buttonBgColor,
                            color: buttonTextColor,
                            textDecoration: 'none'
                        }}
                        target={abrirEnNuevaVentana ? '_blank' : '_self'}
                        rel={abrirEnNuevaVentana ? 'noopener noreferrer' : ''}
                    >
                        {doc.textoBoton}
                    </a>
                </div>
            </div>
        );
    };

    return (
        <>
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

                    {layoutEstilo === 'tabla' ? (
                        // Vista de TABLA
                        <div className="table-responsive">
                            <table className="table documentos-tabla">
                                <thead>
                                    <tr>
                                        <th>Documento</th>
                                        {mostrarFecha && <th>Fecha</th>}
                                        {mostrarTamano && <th>Tamaño</th>}
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody id={blockId}>
                                    {documentos.map((doc, index) => {
                                        const rowClass = usarVerMas && index >= documentosIniciales ? 'documento-oculto' : '';
                                        return (
                                            <tr key={index} className={rowClass} data-index={index}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        {doc.mostrarIcono && (
                                                            <i 
                                                                className={`fas ${getIconoTipo(doc.tipoArchivo)} fa-2x me-3`}
                                                                style={{ color: iconColor }}
                                                            ></i>
                                                        )}
                                                        <div>
                                                            <strong style={{ fontSize: `${documentoTitleFontSize}px` }}>
                                                                {doc.nombre}
                                                            </strong>
                                                            {mostrarDescripcion && doc.descripcion && (
                                                                <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                                                                    {doc.descripcion}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                {mostrarFecha && <td>{doc.fecha}</td>}
                                                {mostrarTamano && <td>{doc.tamano}</td>}
                                                <td>
                                                    <a 
                                                        href={doc.archivo} 
                                                        className="btn btn-sm"
                                                        style={{
                                                            backgroundColor: buttonBgColor,
                                                            color: buttonTextColor
                                                        }}
                                                        target={abrirEnNuevaVentana ? '_blank' : '_self'}
                                                        rel={abrirEnNuevaVentana ? 'noopener noreferrer' : ''}
                                                    >
                                                        {doc.textoBoton}
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            
                            {usarVerMas && documentos.length > documentosIniciales && (
                                <div className="text-center mt-4">
                                    <button 
                                        className="btn btn-ver-mas"
                                        data-block-id={blockId}
                                        data-inicial={documentosIniciales}
                                        data-por-pagina={documentosPorPagina}
                                        data-total={documentos.length}
                                        data-texto-mas={textoVerMas}
                                        data-texto-menos={textoVerMenos}
                                        style={{
                                            backgroundColor: verMasButtonBg,
                                            color: verMasButtonText
                                        }}
                                    >
                                        {textoVerMas} <i className="fas fa-chevron-down ms-2"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : layoutEstilo === 'cards' ? (
                        // Vista de CARDS
                        <>
                            <div className="row g-4" id={blockId}>
                                {documentos.map((doc, index) => {
                                    const cardClass = usarVerMas && index >= documentosIniciales ? 'documento-oculto' : '';
                                    return (
                                        <div key={index} className={`col-md-6 col-lg-4 ${cardClass}`} data-index={index}>
                                            <div 
                                                className="documento-card h-100"
                                                style={{
                                                    backgroundColor: documentoBgColor,
                                                    color: documentoTextColor
                                                }}
                                            >
                                                {doc.mostrarIcono && (
                                                    <div className="documento-card-icon" style={{ color: iconColor }}>
                                                        <i className={`fas ${getIconoTipo(doc.tipoArchivo)} fa-3x`}></i>
                                                    </div>
                                                )}
                                                <h5 style={{ fontSize: `${documentoTitleFontSize}px` }}>{doc.nombre}</h5>
                                                {mostrarDescripcion && doc.descripcion && (
                                                    <p className="documento-descripcion">{doc.descripcion}</p>
                                                )}
                                                <div className="documento-meta mb-3">
                                                    {mostrarFecha && doc.fecha && (
                                                        <span className="me-3">
                                                            <i className="far fa-calendar me-1"></i> {doc.fecha}
                                                        </span>
                                                    )}
                                                    {mostrarTamano && doc.tamano && (
                                                        <span>
                                                            <i className="far fa-file me-1"></i> {doc.tamano}
                                                        </span>
                                                    )}
                                                </div>
                                                <a 
                                                    href={doc.archivo} 
                                                    className="btn w-100"
                                                    style={{
                                                        backgroundColor: buttonBgColor,
                                                        color: buttonTextColor
                                                    }}
                                                    target={abrirEnNuevaVentana ? '_blank' : '_self'}
                                                    rel={abrirEnNuevaVentana ? 'noopener noreferrer' : ''}
                                                >
                                                    {doc.textoBoton}
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            {usarVerMas && documentos.length > documentosIniciales && (
                                <div className="text-center mt-4">
                                    <button 
                                        className="btn btn-ver-mas"
                                        data-block-id={blockId}
                                        data-inicial={documentosIniciales}
                                        data-por-pagina={documentosPorPagina}
                                        data-total={documentos.length}
                                        data-texto-mas={textoVerMas}
                                        data-texto-menos={textoVerMenos}
                                        style={{
                                            backgroundColor: verMasButtonBg,
                                            color: verMasButtonText
                                        }}
                                    >
                                        {textoVerMas} <i className="fas fa-chevron-down ms-2"></i>
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        // Vista de LISTA (default)
                        <>
                            <div className="documentos-lista" id={blockId}>
                                {documentos.map((doc, index) => renderDocumento(doc, index))}
                            </div>
                            
                            {usarVerMas && documentos.length > documentosIniciales && (
                                <div className="text-center mt-4">
                                    <button 
                                        className="btn btn-ver-mas"
                                        data-block-id={blockId}
                                        data-inicial={documentosIniciales}
                                        data-por-pagina={documentosPorPagina}
                                        data-total={documentos.length}
                                        data-texto-mas={textoVerMas}
                                        data-texto-menos={textoVerMenos}
                                        style={{
                                            backgroundColor: verMasButtonBg,
                                            color: verMasButtonText
                                        }}
                                    >
                                        {textoVerMas} <i className="fas fa-chevron-down ms-2"></i>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}