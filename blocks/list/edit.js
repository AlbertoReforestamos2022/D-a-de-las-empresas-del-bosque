import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, SelectControl, RangeControl, ToggleControl, TextareaControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
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
        documentoHoverBg,
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

    const blockProps = useBlockProps({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const updateDocumento = (index, field, value) => {
        const newDocumentos = [...documentos];
        newDocumentos[index][field] = value;
        setAttributes({ documentos: newDocumentos });
    };

    const addDocumento = () => {
        const newDocumentos = [...documentos, {
            nombre: '',
            descripcion: '',
            archivo: '',
            tipoArchivo: 'pdf',
            fecha: '',
            tamano: '',
            mostrarIcono: true,
            textoBoton: 'Ver documento'
        }];
        setAttributes({ documentos: newDocumentos });
    };

    const removeDocumento = (index) => {
        const newDocumentos = documentos.filter((_, i) => i !== index);
        setAttributes({ documentos: newDocumentos });
    };

    const moveDocumento = (index, direction) => {
        const newDocumentos = [...documentos];
        const newIndex = index + direction;
        
        if (newIndex >= 0 && newIndex < newDocumentos.length) {
            [newDocumentos[index], newDocumentos[newIndex]] = [newDocumentos[newIndex], newDocumentos[index]];
            setAttributes({ documentos: newDocumentos });
        }
    };

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
                            value: documentoBgColor,
                            onChange: (color) => setAttributes({ documentoBgColor: color }),
                            label: __('Fondo de documentos', 'diadelasempresasdelbosque')
                        },
                        {
                            value: documentoHoverBg,
                            onChange: (color) => setAttributes({ documentoHoverBg: color }),
                            label: __('Fondo hover de documentos', 'diadelasempresasdelbosque')
                        },
                        {
                            value: documentoTextColor,
                            onChange: (color) => setAttributes({ documentoTextColor: color }),
                            label: __('Texto de documentos', 'diadelasempresasdelbosque')
                        },
                        {
                            value: iconColor,
                            onChange: (color) => setAttributes({ iconColor: color }),
                            label: __('Color de íconos', 'diadelasempresasdelbosque')
                        },
                        {
                            value: buttonBgColor,
                            onChange: (color) => setAttributes({ buttonBgColor: color }),
                            label: __('Fondo de botones', 'diadelasempresasdelbosque')
                        },
                        {
                            value: buttonTextColor,
                            onChange: (color) => setAttributes({ buttonTextColor: color }),
                            label: __('Texto de botones', 'diadelasempresasdelbosque')
                        }
                    ]}
                />

                {/* Diseño */}
                <PanelBody title={__('Diseño', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <SelectControl
                        label={__('Estilo de layout', 'diadelasempresasdelbosque')}
                        value={layoutEstilo}
                        options={[
                            { label: 'Lista', value: 'lista' },
                            { label: 'Tabla', value: 'tabla' },
                            { label: 'Cards', value: 'cards' }
                        ]}
                        onChange={(value) => setAttributes({ layoutEstilo: value })}
                    />

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

                    <RangeControl
                        label={__('Tamaño del nombre del documento (px)', 'diadelasempresasdelbosque')}
                        value={documentoTitleFontSize}
                        onChange={(value) => setAttributes({ documentoTitleFontSize: value })}
                        min={14}
                        max={28}
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

                {/* NUEVO: Panel de Ver Más */}
                <PanelBody title={__('Configuración "Ver Más"', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <ToggleControl
                        label={__('Activar "Ver más"', 'diadelasempresasdelbosque')}
                        checked={usarVerMas}
                        onChange={(value) => setAttributes({ usarVerMas: value })}
                        help={__('Muestra documentos de forma progresiva', 'diadelasempresasdelbosque')}
                    />

                    {usarVerMas && (
                        <>
                            <RangeControl
                                label={__('Documentos iniciales', 'diadelasempresasdelbosque')}
                                value={documentosIniciales}
                                onChange={(value) => setAttributes({ documentosIniciales: value })}
                                min={1}
                                max={10}
                                help={__('Cantidad de documentos a mostrar inicialmente', 'diadelasempresasdelbosque')}
                            />

                            <RangeControl
                                label={__('Documentos por carga', 'diadelasempresasdelbosque')}
                                value={documentosPorPagina}
                                onChange={(value) => setAttributes({ documentosPorPagina: value })}
                                min={1}
                                max={10}
                                help={__('Cantidad de documentos adicionales al hacer clic en "Ver más"', 'diadelasempresasdelbosque')}
                            />

                            <TextControl
                                label={__('Texto "Ver más"', 'diadelasempresasdelbosque')}
                                value={textoVerMas}
                                onChange={(value) => setAttributes({ textoVerMas: value })}
                            />

                            <TextControl
                                label={__('Texto "Ver menos"', 'diadelasempresasdelbosque')}
                                value={textoVerMenos}
                                onChange={(value) => setAttributes({ textoVerMenos: value })}
                            />

                            <p><strong>{__('Colores del botón "Ver más"', 'diadelasempresasdelbosque')}</strong></p>
                            <PanelColorSettings
                                title={__('Botón Ver Más', 'diadelasempresasdelbosque')}
                                colorSettings={[
                                    {
                                        value: verMasButtonBg,
                                        onChange: (color) => setAttributes({ verMasButtonBg: color }),
                                        label: __('Color de fondo', 'diadelasempresasdelbosque')
                                    },
                                    {
                                        value: verMasButtonText,
                                        onChange: (color) => setAttributes({ verMasButtonText: color }),
                                        label: __('Color del texto', 'diadelasempresasdelbosque')
                                    }
                                ]}
                            />
                        </>
                    )}
                </PanelBody>                

                {/* Opciones de visualización */}
                <PanelBody title={__('Opciones de visualización', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <ToggleControl
                        label={__('Mostrar descripción', 'diadelasempresasdelbosque')}
                        checked={mostrarDescripcion}
                        onChange={(value) => setAttributes({ mostrarDescripcion: value })}
                    />

                    <ToggleControl
                        label={__('Mostrar fecha', 'diadelasempresasdelbosque')}
                        checked={mostrarFecha}
                        onChange={(value) => setAttributes({ mostrarFecha: value })}
                    />

                    <ToggleControl
                        label={__('Mostrar tamaño', 'diadelasempresasdelbosque')}
                        checked={mostrarTamano}
                        onChange={(value) => setAttributes({ mostrarTamano: value })}
                    />

                    <ToggleControl
                        label={__('Abrir en nueva ventana', 'diadelasempresasdelbosque')}
                        checked={abrirEnNuevaVentana}
                        onChange={(value) => setAttributes({ abrirEnNuevaVentana: value })}
                    />
                </PanelBody>

                {/* Documentos */}
                <PanelBody title={__('Documentos', 'diadelasempresasdelbosque')} initialOpen={true}>
                    <Button 
                        variant="primary" 
                        onClick={addDocumento}
                        className="mb-3"
                    >
                        {__('Agregar Documento', 'diadelasempresasdelbosque')}
                    </Button>

                    {documentos.map((doc, index) => (
                        <div key={index} className="border p-3 mb-3" style={{ background: '#f5f5f5', borderRadius: '4px' }}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <strong>Documento {index + 1}</strong>
                                <div className="d-flex gap-1">
                                    <Button
                                        isSmall
                                        onClick={() => moveDocumento(index, -1)}
                                        disabled={index === 0}
                                    >
                                        ↑
                                    </Button>
                                    <Button
                                        isSmall
                                        onClick={() => moveDocumento(index, 1)}
                                        disabled={index === documentos.length - 1}
                                    >
                                        ↓
                                    </Button>
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeDocumento(index)}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            </div>

                            {/* Nombre */}
                            <TextControl
                                label={__('Nombre del documento', 'diadelasempresasdelbosque')}
                                value={doc.nombre}
                                onChange={(value) => updateDocumento(index, 'nombre', value)}
                                placeholder="Ej: Manual de Usuario 2024"
                            />

                            {/* Descripción */}
                            <TextareaControl
                                label={__('Descripción', 'diadelasempresasdelbosque')}
                                value={doc.descripcion}
                                onChange={(value) => updateDocumento(index, 'descripcion', value)}
                                placeholder="Descripción breve del documento"
                                rows={2}
                            />

                            {/* Archivo */}
                            <MediaUpload
                                onSelect={(media) => {
                                    updateDocumento(index, 'archivo', media.url);
                                    // Auto-detectar tipo de archivo
                                    const ext = media.url.split('.').pop().toLowerCase();
                                    const tipoMap = {
                                        'pdf': 'pdf',
                                        'doc': 'word', 'docx': 'word',
                                        'xls': 'excel', 'xlsx': 'excel',
                                        'ppt': 'powerpoint', 'pptx': 'powerpoint',
                                        'jpg': 'image', 'jpeg': 'image', 'png': 'image', 'gif': 'image',
                                        'mp4': 'video', 'avi': 'video', 'mov': 'video',
                                        'mp3': 'audio', 'wav': 'audio',
                                        'zip': 'zip', 'rar': 'zip',
                                        'txt': 'texto'
                                    };
                                    updateDocumento(index, 'tipoArchivo', tipoMap[ext] || 'otro');
                                }}
                                value={doc.archivo}
                                render={({ open }) => (
                                    <div className="mb-3">
                                        <p><strong>{__('Archivo', 'diadelasempresasdelbosque')}</strong></p>
                                        {doc.archivo ? (
                                            <div>
                                                <p style={{ fontSize: '0.9rem', color: '#666', wordBreak: 'break-all' }}>
                                                    {doc.archivo}
                                                </p>
                                                <div className="d-flex gap-2">
                                                    <Button onClick={open} variant="secondary" isSmall>Cambiar</Button>
                                                    <Button 
                                                        onClick={() => updateDocumento(index, 'archivo', '')}
                                                        isDestructive
                                                        isSmall
                                                    >
                                                        Quitar
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button onClick={open} variant="primary">Seleccionar archivo</Button>
                                        )}
                                    </div>
                                )}
                            />

                            {/* Tipo de archivo */}
                            <SelectControl
                                label={__('Tipo de archivo', 'diadelasempresasdelbosque')}
                                value={doc.tipoArchivo}
                                options={[
                                    { label: 'PDF', value: 'pdf' },
                                    { label: 'Word', value: 'word' },
                                    { label: 'Excel', value: 'excel' },
                                    { label: 'PowerPoint', value: 'powerpoint' },
                                    { label: 'Imagen', value: 'image' },
                                    { label: 'Video', value: 'video' },
                                    { label: 'Audio', value: 'audio' },
                                    { label: 'ZIP/RAR', value: 'zip' },
                                    { label: 'Texto', value: 'texto' },
                                    { label: 'Otro', value: 'otro' }
                                ]}
                                onChange={(value) => updateDocumento(index, 'tipoArchivo', value)}
                            />

                            {/* Fecha */}
                            <TextControl
                                label={__('Fecha (opcional)', 'diadelasempresasdelbosque')}
                                value={doc.fecha}
                                onChange={(value) => updateDocumento(index, 'fecha', value)}
                                placeholder="Ej: Enero 2024"
                            />

                            {/* Tamaño */}
                            <TextControl
                                label={__('Tamaño (opcional)', 'diadelasempresasdelbosque')}
                                value={doc.tamano}
                                onChange={(value) => updateDocumento(index, 'tamano', value)}
                                placeholder="Ej: 2.5 MB"
                            />

                            {/* Texto del botón */}
                            <TextControl
                                label={__('Texto del botón', 'diadelasempresasdelbosque')}
                                value={doc.textoBoton}
                                onChange={(value) => updateDocumento(index, 'textoBoton', value)}
                            />

                            {/* Mostrar ícono */}
                            <ToggleControl
                                label={__('Mostrar ícono', 'diadelasempresasdelbosque')}
                                checked={doc.mostrarIcono}
                                onChange={(value) => updateDocumento(index, 'mostrarIcono', value)}
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

                    {/* Vista previa de documentos */}
                    <div className={`documentos-${layoutEstilo}`}>
                        {documentos.map((doc, index) => (
                            <div 
                                key={index} 
                                className="documento-item"
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
                                    <h5 style={{ fontSize: `${documentoTitleFontSize}px` }}>{doc.nombre || 'Nombre del documento'}</h5>
                                    {mostrarDescripcion && doc.descripcion && (
                                        <p className="documento-descripcion">{doc.descripcion}</p>
                                    )}
                                    <div className="documento-meta">
                                        {mostrarFecha && doc.fecha && <span><i className="far fa-calendar"></i> {doc.fecha}</span>}
                                        {mostrarTamano && doc.tamano && <span><i className="far fa-file"></i> {doc.tamano}</span>}
                                    </div>
                                </div>
                                <div className="documento-action">
                                    <a 
                                        href={doc.archivo || '#'} 
                                        className="btn"
                                        style={{
                                            backgroundColor: buttonBgColor,
                                            color: buttonTextColor
                                        }}
                                    >
                                        {doc.textoBoton}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}