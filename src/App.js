import React, { useState, useEffect } from 'react';
import './App.css';
import ReviewTable from './components/ReviewTable';
import AddReviewModal from './components/AddReviewModal';
import EditReviewModal from './components/EditReviewModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { getAllReviews, createReview, updateReview, deleteReview } from './services/api';

function App() {
  const [reviews, setReviews] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  const fetchReviews = async () => {
    try {
      const res = await getAllReviews();
      setReviews(res.data);
    } catch (err) {
      showToast('Error fetching reviews!', 'error');
    }
  };

 // eslint-disable-next-line
useEffect(() => { fetchReviews(); }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const handleAdd = async (data) => {
    try {
      await createReview(data);
      fetchReviews();
      setShowAddModal(false);
      showToast('Review added successfully!', 'success');
    } catch (err) {
      showToast('Error adding review!', 'error');
    }
  };

  const handleEdit = (review) => {
    setShowEditModal(false);
    setSelectedReview(null);
    setTimeout(() => {
      setSelectedReview({...review});
      setShowEditModal(true);
    }, 50);
  };

  const handleUpdate = async (data) => {
    try {
      await updateReview(selectedReview.review_id, data);
      fetchReviews();
      setShowEditModal(false);
      setSelectedReview(null);
      showToast('Review updated successfully!', 'success');
    } catch (err) {
      showToast('Error updating review!', 'error');
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteReview(deleteId);
      fetchReviews();
      setShowDeleteModal(false);
      showToast('Review deleted successfully!', 'success');
    } catch (err) {
      showToast('Error deleting review!', 'error');
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <div>
          <h1>⭐ Product Review System</h1>
          <p>Manage and monitor customer product reviews</p>
        </div>
        <button className="btn-add" onClick={() => setShowAddModal(true)}>
          + Add New Review
        </button>
      </div>

      <ReviewTable
        reviews={reviews}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showAddModal && (
        <AddReviewModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAdd}
        />
      )}

      {showEditModal && selectedReview && (
        <EditReviewModal
          review={selectedReview}
          onClose={() => { setShowEditModal(false); setSelectedReview(null); }}
          onSubmit={handleUpdate}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
      />
    </div>
  );
}

export default App;