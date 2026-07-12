const VALID_STATUS = [
  "GOOD_LEAD_FOLLOW_UP",
  "DID_NOT_CONNECT",
  "BAD_LEAD",
  "SALE_DONE",
];

function validateCRMRecord(record) {
  const errors = [];

  // Email validation
  if (record.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(record.email)) {
      errors.push("Invalid Email");
    }
  }

  // Phone validation
  if (record.mobile_without_country_code) {
    const phone = String(record.mobile_without_country_code).replace(/\D/g, "");

    if (phone.length < 7 || phone.length > 15) {
      errors.push("Invalid Mobile");
    }
  }

  // Status validation
  if (
    record.crm_status &&
    !VALID_STATUS.includes(record.crm_status)
  ) {
    errors.push("Invalid CRM Status");
  }

  // Date validation
  if (record.created_at) {
    if (isNaN(new Date(record.created_at).getTime())) {
      errors.push("Invalid Date");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = validateCRMRecord;