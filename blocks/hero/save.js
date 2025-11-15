import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { titulo, descripcion, imagenFondo } = attributes;

  const blockProps = useBlockProps.save({
    className: 'hero-section d-flex align-items-center justify-content-center text-center',
    style: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${imagenFondo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '80vh'
    }
  });

  return (
    <section { ...blockProps }>
      <div className="container">
        <RichText.Content
          tagName="h1"
          className="display-3 fw-black text-white mb-4"
          value={titulo}
        />
        <RichText.Content
          tagName="p"
          className="lead text-white mb-4"
          value={descripcion}
        />
      </div>
    </section>
  );
}
