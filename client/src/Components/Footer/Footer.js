import React from 'react';

const Footer = () => {
    return (
        <div className='footer'>
            <p className='copyright'>© 2023 Yummy</p>
            <div className='git-links'>
                
                <div className='links-without'>
                    <div className='made-by'><span>Made with ❤ by </span>
                    <a href="https://my-resume-indol.vercel.app/" target="_blank" rel="noreferrer" title='Olga'><img src="https://avatars.githubusercontent.com/u/105457134?s=400&u=f261f3c87fab924605f1a82806ca0822d7ea0c6b&v=4" alt="Resume" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;