import React from 'react';
import StarRating from './StarRating';

const ReviewTable = ({ reviews, onEdit, onDelete }) => {
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div>
      {/* STATS CARD */}
      <div className="stats-card">
        <div>
          <h3>Overall Average Rating</h3>
          <div className="avg-number">{avgRating} / 5</div>
          <div className="total">{reviews.length} Total Reviews</div>
        </div>
        <StarRating rating={Math.round(avgRating)} />
      </div>

      {/* TABLE */}
      <div className="table-container">
        {reviews.length === 0 ? (
          <div className="empty-state">
            <h3>No Reviews Found</h3>
            <p>Click "Add New Review" to get started!</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product ID</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.review_id}>
                  <td>#{review.review_id}</td>
                  <td>{review.product_id}</td>
                  <td>{review.user_id}</td>
                  <td>
                    <strong>{review.username}</strong>
                  </td>
                  <td>
                    <StarRating rating={review.rating} />
                  </td>
                  <td style={{ maxWidth: '200px' }}>
                    {review.review_text || (
                      <span style={{ color: '#bbb', fontStyle: 'italic' }}>
                        No review text
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`badge badge-${review.status.toLowerCase()}`}>
                      {review.status}
                    </span>
                  </td>
                  <td style={{ color: '#888', fontSize: '13px' }}>
                    {review.review_date}
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(review.review_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReviewTable;