import React from 'react';
import Modal from 'react-modal';

const closeButton = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>

const AbstractModal = ({ modalId, className, modalIsOpen, onModalClose, children }) => {
    return (
        <div className='abstract-modal-container'>
        <Modal 
            style={{ 
                content: {
                    top: '0',
                    left: '0',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(100%, 50%)',
                    width: '37%', 
                    height: '18%', 
                    marginTop: '15rem', 
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '1rem',
                    boxShadow: '2px 5px 5px rgb(0,0,128)',
                    backgroung: 'white',
                    opacity: '1',
                    letterSpacing: '5px',
                    fontWeight: '700',
                }, 
                overlay: { 
                    opacity: '1',
                } 
            }}
            id={ modalId } 
            className={ className }
            shouldCloseOnOverlayClick={ false }
            shouldCloseOnEsc={ true }
            isOpen={ modalIsOpen }
            appElement={document.getElementById('root') || undefined}
        >
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginBottom: '1rem',
                }}
            >
                <button 
                    type="button" 
                    onClick={() => onModalClose(false)} 
                    style={{ background: '#8A9B65', padding: '0'}}>{closeButton}</button>
            </div>
            { children }
        </Modal>
        </div>
    );
};

export default AbstractModal;