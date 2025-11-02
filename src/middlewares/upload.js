const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

// File filter for only CSV, XLS, XLSX
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];

  const extname = path.extname(file.originalname).toLowerCase();

  if (
    allowedTypes.includes(file.mimetype) ||
    [".csv", ".xls", ".xlsx"].includes(extname)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV, XLS, and XLSX files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // the max limit I have allowed is 5mb
});

module.exports = upload;
