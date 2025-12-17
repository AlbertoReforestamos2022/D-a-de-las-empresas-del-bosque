import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        siteName, 
        showLogo, 
        copyrightText, 
        footerLinks,
        logoUno, 
        tamanioLogoUno, 
        logoDos, 
        tamanioLogoDos, 
        logoTres, 
        tamanioLogoTres 
     } = attributes;

    const blockProps = useBlockProps.save();

    // Reemplazar {year} con el año actual
    const currentYear = new Date().getFullYear();
    const displayCopyright = copyrightText.replace('{year}', currentYear);

    return (
        <div {...blockProps}>
            <footer className="bg-white border-top py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <div className="d-flex align-items-center gap-3">
                                    <a className="navbar-brand d-flex align-items-center gap-3" href="/">
                                        { logoDos ? (
                                            <img src={logoDos} width={tamanioLogoDos} className='img-fluid' />
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
                                        { logoTres ? (
                                            <img src={logoTres} width={tamanioLogoTres} className='img-fluid' />
                                        ) : (
                                                <div 
                                                    className="bg-secondary rounded d-flex align-items-center justify-content-center" 
                                                    style={{ height: '400px' }}
                                                >
                                                    <span className="text-white">Selecciona una imagen</span>
                                                </div>
                                        )}

                                    </a> 
                                <h2 className="mb-0 fs-5 fw-bold">{siteName}</h2>
                            </div>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <p className="small mb-2">{displayCopyright}</p>
                            <div className="d-flex justify-content-md-end gap-3">
                                {footerLinks.map((link, index) => (
                                    <a key={index} href={link.url} className="text-decoration-none text-muted">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}