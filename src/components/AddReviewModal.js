import React, { useState } from 'react';

const StarInput = ({ rating, onRate }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            fontSize: '36px',
            cursor: 'pointer',
            color: star <= (hovered || rating) ? '#f9a825' : '#ddd',
            transition: 'color 0.2s',
          }}
        >★</span>
      ))}
      {rating > 0 && (
        <span style={{
          alignSelf: 'center',
          fontSize: '14px',
          color: '#666',
          marginLeft: '8px'
        }}>
          {rating} / 5
        </span>
      )}
    </div>
  );
};

const AddReviewModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    user_id: '',
    username: '',
    rating: 0,
    review_text: '',
    status: 'Visible'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRate = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const handleSubmit = () => {
    if (!formData.product_id || !formData.user_id || !formData.username || !formData.rating) {
      alert('Please fill all required fields!');
      return;
    }
    if (formData.rating < 1 || formData.rating > 5) {
      alert('Please select a rating between 1 and 5!');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add New Review</h2>

        <label className="modal-label">Product ID *</label>
        <input
          name="product_id"
          placeholder="Enter product ID"
          type="number"
          value={formData.product_id}
          onChange={handleChange}
        />

        <label className="modal-label">User ID *</label>
        <input
          name="user_id"
          placeholder="Enter user ID"
          type="number"
          value={formData.user_id}
          onChange={handleChange}
        />

        <label className="modal-label">Username *</label>
        <input
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />

        <label className="modal-label">Rating *</label>
        <StarInput rating={formData.rating} onRate={handleRate} />

        <label className="modal-label">Review Text (Optional)</label>
        <textarea
          name="review_text"
          placeholder="Write your review here..."
          value={formData.review_text}
          onChange={handleChange}
        />

        <label className="modal-label">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Visible">Visible</option>
          <option value="Hidden">Hidden</option>
          <option value="Reported">Reported</option>
        </select>

        <div className="modal-footer">
          <button className="btn-submit" onClick={handleSubmit}>
            Submit Review
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;