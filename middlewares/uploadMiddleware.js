const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subjectFolder = req.body.subject;

    // تحقق من أن subject موجود
    if (!subjectFolder || typeof subjectFolder !== 'string') {
      return cb(new Error('Missing or invalid subject'), null);
    }

    const dir = path.join(__dirname, '..', 'uploads', subjectFolder);

    // أنشئ المجلد إن لم يكن موجودًا
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
