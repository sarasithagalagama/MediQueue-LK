const buildWhatsAppLink = (phone, message) => {
  const normalizedPhone = String(phone || "").replace(/[^0-9]/g, "");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
};

module.exports = { buildWhatsAppLink };
