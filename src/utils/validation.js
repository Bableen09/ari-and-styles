/**
 * Frontend Form and Data Validation Utilities
 */

export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  // Clean phone string (remove spaces, hyphens, +91)
  const cleaned = phone.replace(/[\s\-+]/g, '');
  // Match standard 10 digit Indian mobile numbers (starts with 6, 7, 8, or 9)
  const indianMobileRegex = /^(91)?[6-9]\d{9}$/;
  return indianMobileRegex.test(cleaned);
};

export const validatePinCode = (pincode) => {
  if (!pincode || typeof pincode !== 'string') return false;
  // 6 digit Indian postal PIN code (cannot start with 0)
  const pinRegex = /^[1-9][0-9]{5}$/;
  return pinRegex.test(pincode.trim());
};

export const validateCheckoutForm = (formData) => {
  const errors = {};

  // Contact info
  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Please provide a valid email address for order confirmation';
  }
  if (!formData.phone || !validatePhone(formData.phone)) {
    errors.phone = 'Please provide a valid 10-digit mobile number';
  }

  // Delivery Address
  if (!formData.fullName || formData.fullName.trim().length < 3) {
    errors.fullName = 'Please enter your full recipient name';
  }
  if (!formData.address || formData.address.trim().length < 6) {
    errors.address = 'Please enter a complete street address';
  }
  if (!formData.city || formData.city.trim().length < 2) {
    errors.city = 'Please enter your city';
  }
  if (!formData.state || formData.state.trim().length < 2) {
    errors.state = 'Please select or enter your state';
  }
  if (!formData.pincode || !validatePinCode(formData.pincode)) {
    errors.pincode = 'Please enter a valid 6-digit Indian PIN code';
  }

  // Payment
  if (!formData.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateContactForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Please enter your name';
  }
  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Please provide a valid email address';
  }
  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = 'Please enter a subject';
  }
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Please provide a message with at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
