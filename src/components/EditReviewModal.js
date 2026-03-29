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

const EditReviewModal = ({ review, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: review ? review.username : '',
    rating: review ? Number(review.rating) : 0,
    review_text: review ? review.review_text || '' : '',
    status: review ? review.status : 'Visible'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRate = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.rating) {
      alert('Please fill all required fields!');
      return;
    }
    onSubmit(formData);
  };

  if (!review) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Edit Review</h2>

        <label className="modal-label">Username *</label>
        <input
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />

        <label className="modal-label">Rating *</label>
        <StarInput rating={Number(formData.rating)} onRate={handleRate} />

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
            Update Review
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;