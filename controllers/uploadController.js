const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const db = require('../databases');

const uploadFile = async (req, res) => {
    try {
        if (!req.file || !req.body.subject) {
            return res.status(400).json({ message: 'Missing file or subject.' });
        }

        const subject = req.body.subject;
        const fileName = req.file.originalname;
        const savedFileName = req.file.filename;
        const filePath = `/uploads/${subject}/${savedFileName}`;
        const fullPath = path.join(__dirname, '..', 'uploads', subject, savedFileName);

        // 1. قراءة الملف
        let fileBuffer;
        try {
            fileBuffer = fs.readFileSync(fullPath);
        } catch (err) {
            return res.status(500).json({ message: 'Error reading uploaded file.', error: err.message });
        }

        const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

        const [existing] = await db.query(
            'SELECT id FROM files WHERE file_hash = ? LIMIT 1',
            [fileHash]
        );

        if (existing.length > 0) {
            fs.unlinkSync(fullPath); // حذف الملف المكرر من الخادم
            return res.status(409).json({ message: 'Duplicate file detected. Upload aborted.' });
        }

        // 4. إدخال في قاعدة البيانات
        const insertQuery = `
            INSERT INTO files (subject_id, file_name, file_path, file_hash)
            VALUES ((SELECT id FROM subjects WHERE name = ? LIMIT 1), ?, ?, ?)
        `;

        await db.query(insertQuery, [subject, fileName, filePath, fileHash]);

        // 5. رد نهائي
        return res.status(200).json({
            message: 'File uploaded successfully.',
            fileName,
            fileUrl: filePath
        });

    } catch (error) {
        console.error('Upload Error:', error);
        return res.status(500).json({ message: 'Unexpected server error.', error: error.message });
    }
};

module.exports = { uploadFile };
