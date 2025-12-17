import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { 
        titulo, 
        contenido, 
        backgroundColor, 
        tituloColor, 
        contenidoColor,
        tituloFontFamily,
        contenidoFontFamily,
        tituloFontSize,
        contenidoFontSize,
        tituloFontWeight,
        contenidoFontWeight,
        textAlign,
        altoSeccion
    } = attributes;

    const blockProps = useBlockProps({
        className: 'py-5',
        style: {
            backgroundColor: backgroundColor,
            textAlign: textAlign,
            height: altoSeccion,
            display: 'grid',
            alignItems: 'center'
        }
    });

    // Opciones de fuentes
    const fontFamilyOptions = [
        { label: 'Por defecto', value: 'inherit' },
        { label: 'Arial', value: 'Arial, sans-serif' },
        { label: 'Georgia', value: 'Georgia, serif' },
        { label: 'Times New Roman', value: '"Times New Roman", serif' },
        { label: 'Courier New', value: '"Courier New", monospace' },
        { label: 'Verdana', value: 'Verdana, sans-serif' },
        { label: 'Helvetica', value: 'Helvetica, sans-serif' },
        { label: 'Segoe UI', value: '"Segoe UI", sans-serif' },
        { label: 'Roboto', value: 'Roboto, sans-serif' },
        { label: 'Open Sans', value: '"Open Sans", sans-serif' },
        { label: 'Lato', value: 'Lato, sans-serif' },
        { label: 'Montserrat', value: 'Montserrat, sans-serif' }
    ];

    // Opciones de peso de fuente
    const fontWeightOptions = [
        { label: 'Delgada (300)', value: '300' },
        { label: 'Normal (400)', value: '400' },
        { label: 'Media (500)', value: '500' },
        { label: 'Semi-negrita (600)', value: '600' },
        { label: 'Negrita (700)', value: '700' },
        { label: 'Extra-negrita (800)', value: '800' },
        { label: 'Ultra-negrita (900)', value: '900' }
    ];

    return (
        <>
            <InspectorControls>
                {/* Panel de Colores */}
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
                            value: contenidoColor,
                            onChange: (color) => setAttributes({ contenidoColor: color }),
                            label: __('Color del contenido', 'diadelasempresasdelbosque')
                        }
                    ]}
                />

                {/* Panel de Tipografía del Título */}
                <PanelBody title={__('Tipografía del Título', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <SelectControl
                        label={__('Familia de fuente', 'diadelasempresasdelbosque')}
                        value={tituloFontFamily}
                        options={fontFamilyOptions}
                        onChange={(value) => setAttributes({ tituloFontFamily: value })}
                    />

                    <RangeControl
                        label={__('Tamaño de fuente (px)', 'diadelasempresasdelbosque')}
                        value={tituloFontSize}
                        onChange={(value) => setAttributes({ tituloFontSize: value })}
                        min={16}
                        max={100}
                    />

                    <SelectControl
                        label={__('Peso de fuente', 'diadelasempresasdelbosque')}
                        value={tituloFontWeight}
                        options={fontWeightOptions}
                        onChange={(value) => setAttributes({ tituloFontWeight: value })}
                    />
                </PanelBody>

                {/** Panel del Tamaño de la sección */}
                <PanelBody title={__('Tamaño de la sección', 'diadelasempresasdelbosque')} initialOpen={false} >
                    <RangeControl
                        label={ __('Alto de la sección', 'diadelasempresasdelbosque') }
                        value={altoSeccion}
                        onChange={(value)=> setAttributes({ altoSeccion: value })}
                        min={200}
                        max={1000}
                    />

                </PanelBody>

                {/* Panel de Tipografía del Contenido */}
                <PanelBody title={__('Tipografía del Contenido', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <SelectControl
                        label={__('Familia de fuente', 'diadelasempresasdelbosque')}
                        value={contenidoFontFamily}
                        options={fontFamilyOptions}
                        onChange={(value) => setAttributes({ contenidoFontFamily: value })}
                    />

                    <RangeControl
                        label={__('Tamaño de fuente (px)', 'diadelasempresasdelbosque')}
                        value={contenidoFontSize}
                        onChange={(value) => setAttributes({ contenidoFontSize: value })}
                        min={12}
                        max={32}
                    />

                    <SelectControl
                        label={__('Peso de fuente', 'diadelasempresasdelbosque')}
                        value={contenidoFontWeight}
                        options={fontWeightOptions}
                        onChange={(value) => setAttributes({ contenidoFontWeight: value })}
                    />
                </PanelBody>

                {/* Panel de Alineación */}
                <PanelBody title={__('Alineación', 'diadelasempresasdelbosque')} initialOpen={false}>
                    <SelectControl
                        label={__('Alineación del texto', 'diadelasempresasdelbosque')}
                        value={textAlign}
                        options={[
                            { label: 'Izquierda', value: 'left' },
                            { label: 'Centro', value: 'center' },
                            { label: 'Derecha', value: 'right' },
                            { label: 'Justificado', value: 'justify' }
                        ]}
                        onChange={(value) => setAttributes({ textAlign: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <RichText
                                tagName="h2"
                                className="mb-4"
                                value={titulo}
                                onChange={(value) => setAttributes({ titulo: value })}
                                placeholder="Escribe un título"
                                style={{
                                    color: tituloColor,
                                    fontFamily: tituloFontFamily,
                                    fontSize: `${tituloFontSize}px`,
                                    fontWeight: tituloFontWeight
                                }}
                            />

                            <RichText
                                tagName="div"
                                className="contenido"
                                value={contenido}
                                onChange={(value) => setAttributes({ contenido: value })}
                                placeholder="Escribe el contenido aquí (puedes usar negritas, cursivas, enlaces, listas...)"
                                style={{
                                    color: contenidoColor,
                                    fontFamily: contenidoFontFamily,
                                    fontSize: `${contenidoFontSize}px`,
                                    fontWeight: contenidoFontWeight
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}