const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder storage ada
const uploadDir = path.join(__dirname, '../../storage/putusan');
const tempDir = path.join(__dirname, '../../storage/temp');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Storage configuration untuk putusan
const putsanStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Nama file: {id_putusan}_{timestamp}.{ext}
    const ext = path.extname(file.originalname);
    const name = `putusan_${Date.now()}${ext}`;
    cb(null, name);
  }
});

// Filter hanya file PDF dan DOC
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file PDF dan DOC yang diperbolehkan'), false);
  }
};

const uploadPutusan = multer({
  storage: putsanStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});

module.exports = {
  uploadPutusan,
  uploadDir,
  tempDir
};
