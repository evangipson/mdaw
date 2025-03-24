import './footer.css';

const Footer = () => {
    return (
        <footer className='mdaw__footer'>
            <div className='mdaw__footer-content'>
                <p>©{new Date().getFullYear()} MDAW</p>
            </div>
        </footer>
    );
};

export default Footer;