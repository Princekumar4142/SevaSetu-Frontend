// Mirrors backend/validators/auth.validator.js so obviously invalid input
// (e.g. letters typed into the phone field) gets an immediate, specific
// error instead of a round trip to the server for something this cheap to
// catch client-side. The backend still re-validates everything — this is a
// UX improvement, not a replacement for server-side validation.

export function validatePhone(phone) {
  if (!/^[6-9]\d{9}$/.test(phone || "")) {
    return "Enter a valid 10-digit Indian phone number (starts with 6-9)";
  }
  return null;
}

export function validateEmail(email) {
  if (!/^\S+@\S+\.\S+$/.test(email || "")) {
    return "Enter a valid email address";
  }
  return null;
}

export function validatePassword(password) {
  if (!password || password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Za-z]/.test(password)) return "Password must contain a letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  return null;
}

export function validateCustomerForm(form) {
  const errors = {};
  if (!form.name?.trim()) errors.name = "Full name is required";
  const phoneErr = validatePhone(form.phone);
  if (phoneErr) errors.phone = phoneErr;
  const emailErr = validateEmail(form.email);
  if (emailErr) errors.email = emailErr;
  const passErr = validatePassword(form.password);
  if (passErr) errors.password = passErr;
  if (form.confirmPassword !== form.password) errors.confirmPassword = "Passwords do not match";
  if (!form.address?.trim()) errors.address = "Address / House / Street is required";
  if (!form.city?.trim()) errors.city = "City is required";
  if (!/^\d{6}$/.test(form.pincode || "")) errors.pincode = "Enter a valid 6-digit pincode";
  return errors;
}

export function validateAadhar(aadhar) {
  const clean = (aadhar || "").replace(/\s+/g, "");
  if (!/^\d{12}$/.test(clean)) {
    return "Enter a valid 12-digit Aadhaar number";
  }
  return null;
}

export function validateWorkerForm(form) {
  const errors = validateCustomerForm(form);
  if (!form.address?.trim()) errors.address = "Address is required";
  if (!form.city?.trim()) errors.city = "City is required";
  if (!form.state?.trim()) errors.state = "State is required";
  if (!/^\d{6}$/.test(form.pincode || "")) errors.pincode = "Enter a valid 6-digit pincode";
  if (!form.skills || form.skills.length === 0) errors.skills = "Select at least one skill";
  
  const aadharErr = validateAadhar(form.aadharNumber);
  if (aadharErr) errors.aadharNumber = aadharErr;

  return errors;
}
