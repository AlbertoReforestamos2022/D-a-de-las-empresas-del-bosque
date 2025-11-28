import { RichText, useBlockProps } from '@wordpress/block-editor'; 

export default function save( {  attributes} ) {
    const { titulo, descripcion, bg__color, text_color } = attributes;

    const blockProps = useBlockProps.save({
        className: 'py-5',
        id: 'about',
        style: {
            backgroundColor: bg__color,
            color: text_color,
        }
    }); 


    return(
        <section {...blockProps}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <RichText.Content
                            tagName="h2"
                            className="display-5 fw-bold mb-4"
                            value={titulo}
                        />

                        <RichText.Content
                            tagName="p"
                            className="mb-3"
                            value={descripcion}
                        />
                    </div>
                </div>
            </div>
        </section>

    )
}