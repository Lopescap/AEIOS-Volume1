import React, { useState, useEffect, useRef } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Notification {
  message: string;
  type: 'success' | 'error';
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear notification after 4 seconds
  useEffect(() => {
    if (notification) {
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [notification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(formData.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Success
    console.log('Form submitted:', formData);
    showNotification('Thank you! Your message has been sent.', 'success');

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const hasValue = (fieldName: keyof FormData) => formData[fieldName].trim() !== '';

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field half">
              <input
                type="text"
                id="contact-name"
                name="name"
                className={`input-field ${hasValue('name') ? 'has-value' : ''}`}
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
              />
              <label
                htmlFor="contact-name"
                className={`input-label ${focusedField === 'name' || hasValue('name') ? 'active' : ''}`}
              >
                Name
              </label>
              <span className={`input-line ${focusedField === 'name' ? 'active' : ''}`}></span>
            </div>
            <div className="form-field half">
              <input
                type="email"
                id="contact-email"
                name="email"
                className={`input-field ${hasValue('email') ? 'has-value' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
              />
              <label
                htmlFor="contact-email"
                className={`input-label ${focusedField === 'email' || hasValue('email') ? 'active' : ''}`}
              >
                E-mail
              </label>
              <span className={`input-line ${focusedField === 'email' ? 'active' : ''}`}></span>
            </div>
          </div>

          <div className="form-field full">
            <input
              type="text"
              id="contact-message"
              name="message"
              className={`input-field ${hasValue('message') ? 'has-value' : ''}`}
              value={formData.message}
              onChange={handleInputChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              required
            />
            <label
              htmlFor="contact-message"
              className={`input-label ${focusedField === 'message' || hasValue('message') ? 'active' : ''}`}
            >
              Message
            </label>
            <span className={`input-line ${focusedField === 'message' ? 'active' : ''}`}></span>
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`form-notification ${notification.type}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
            color: '#ffffff',
            fontFamily: "'Raleway', sans-serif",
            fontSize: '14px',
            borderRadius: '4px',
            zIndex: 1000,
            animation: 'slideIn 0.3s ease'
          }}
        >
          {notification.message}
        </div>
      )}
    </section>
  );
};

export default ContactSection;
