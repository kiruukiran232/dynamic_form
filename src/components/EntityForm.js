import React, { useState } from 'react';
import axios from 'axios';
import './EntityForm.css'; // Import custom CSS file for styling

const EntityForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData);
      const res = await axios.post('http://localhost:5000/api/entity', formData);
      console.log('Response:', res.data);
      // Clear the form after successful submission
      setFormData({
        name: '',
        email: '',
        mobileNumber: '',
        dateOfBirth: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="entity-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="tel"
        name="mobileNumber"
        placeholder="Mobile Number"
        value={formData.mobileNumber}
        onChange={handleChange}
        className="form-input"
      />
      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        className="form-input"
      />
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default EntityForm;
