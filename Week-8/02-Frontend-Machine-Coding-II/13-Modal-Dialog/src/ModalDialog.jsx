import { createPortal } from 'react-dom';
import './App.css';

export default function ModalDialog({
  children,
  open = false,
  title,
  onClose,
}) {
  if (!open) {
    return null;
  }

  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h1 className="modal-title">{title}</h1>
        <div>{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,
  );
}
