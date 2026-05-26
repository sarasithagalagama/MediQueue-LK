const formatReceiptNo = (date, sequence) => {
  const day = date.toISOString().slice(0, 10).replace(/-/g, "");
  return `REC-${day}-${String(sequence).padStart(4, "0")}`;
};

const formatCertificateNo = (date, sequence) => {
  const day = date.toISOString().slice(0, 10).replace(/-/g, "");
  return `CERT-${day}-${String(sequence).padStart(4, "0")}`;
};

module.exports = { formatReceiptNo, formatCertificateNo };
