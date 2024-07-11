import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './popup.css';

const PopupDone = ({ message, show, onClose }) => {
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="popup"
      unmountOnExit
    >
      <div className="fixed top-16 right-0 mt-4 mr-4 p-4 bg-green-500 text-white rounded-lg shadow-lg z-50 popup-enter-done">
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button onClick={onClose} className="ml-4 text-lg font-bold">
            &times;
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PopupDone;
