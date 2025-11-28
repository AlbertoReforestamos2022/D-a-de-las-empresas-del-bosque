import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { siteName, menuItems, showButton, buttonText, buttonUrl } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <nav {...blockProps} className="navbar navbar-expand-lg navbar-light sticky-top navbar-custom border-bottom">
            <div className="container-xl">
                <a className="navbar-brand d-flex align-items-center gap-3" href="/">
                    <h2 className="mb-0 fs-5 fw-bold">{siteName}</h2>
                </a>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto me-3">
                        {menuItems.map((item, index) => (
                            <li key={index} className="nav-item">
                                <a className="nav-link" href={item.url}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    {showButton && (
                        <a href={buttonUrl} className="btn btn-primary-custom">
                            {buttonText}
                        </a>
                    )}
                </div>
            </div>
        </nav>

    );
}