import React from 'react';

const DeleteConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <div className="delete-modal-icon">🗑️</div>

        <h2 style={{ textAlign: 'center' }}>Delete Review</h2>

        <p className="delete-modal-text">
          Are you sure you want to delete this review?
          <br />
          <strong>This action cannot be undone.</strong>
        </p>

        <div className="modal-footer">
          <button className="btn-confirm-delete" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;