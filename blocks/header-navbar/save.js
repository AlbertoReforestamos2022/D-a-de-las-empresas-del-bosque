import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { siteName, menuItems, showButton, buttonText, buttonUrl, logoUno, logoDos, logoTres, tamanioLogoUno, tamanioLogoDos, tamanioLogoTres } = attributes;

    const blockProps = useBlockProps.save();

    return (
        <nav {...blockProps} className="navbar navbar-expand-lg navbar-light sticky-top navbar-custom border-bottom">
            <div className="container-xl">
                <a className="navbar-brand d-flex align-items-center gap-3" href="/">
                    { logoUno ? (
                        <img src={logoUno} style={{ width: tamanioLogoUno}} className='img-fluid' />
                    ) : (
                            <div 
                                className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                style={{ height: '400px' }}
                            >
                                <span className="text-white">Selecciona una imagen</span>
                            </div>
                    )}

                </a>
                <a className="navbar-brand d-flex align-items-center gap-3" href="/">
                    { logoDos ? (
                        <img src={logoDos} style={{ width: tamanioLogoDos}} className='img-fluid' />
                    ) : (
                            <div 
                                className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                style={{ height: '400px' }}
                            >
                                <span className="text-white">Selecciona una imagen</span>
                            </div>
                    )}

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

                    <a className="navbar-brand d-flex align-items-center gap-3" href="/">
                        { logoTres ? (
                            <img src={logoTres} style={{ width: tamanioLogoTres }} className='img-fluid' />
                        ) : (
                                <div 
                                    className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                    style={{ height: '400px' }}
                                >
                                    <span className="text-white">Selecciona una imagen</span>
                                </div>
                        )}

                    </a>  
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