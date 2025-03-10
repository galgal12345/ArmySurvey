import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';
import '../styles/TicketForm.css';

function TicketForm({ previousResponses, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    unit: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Submitting ticket data:', formData);
      
      const combinedData = {
        type: 'printer_issue',
        path: [
          ...(previousResponses || []),
          {
            question: 'פרטי פנייה',
            answer: {
              name: formData.name,
              phone: formData.phone,
              unit: formData.unit,
              description: formData.description
            },
            timestamp: new Date().toISOString()
          }
        ],
        final_status: 'ticket_opened'
      };

      console.log('Sending combined data:', combinedData);
      
      const response = await fetch(`${API_BASE_URL}/api/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData)
      });

      const responseData = await response.text();
      console.log('Response:', response.status, responseData);

      if (!response.ok) {
        throw new Error(`Failed to submit ticket: ${responseData}`);
      }

      console.log('Ticket submitted successfully');
      onBack();
      
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('שגיאה בשליחת הטופס. אנא נסה שוב.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="page-content">
      <div className="form-container">
        <h2 className="form-title">פתיחת קריאת שירות</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">שם מלא:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">מספר טלפון:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="unit">יחידה:</label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">תיאור התקלה:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-button">
              שלח טופס
            </button>
            <button type="button" className="back-button" onClick={onBack}>
              חזרה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketForm; 