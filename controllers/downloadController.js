const db = require('../databases');

const getFilesBySubjectId = async (req, res) => {
    const subjectId = req.params.id;

    try {
        const [rows] = await db.query(`
            SELECT file_name, file_path, uploaded_at 
            FROM files 
            WHERE subject_id = ?
            ORDER BY uploaded_at DESC
        `, [subjectId]);

        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching files by subject_id:', err);
        res.status(500).json({ message: 'Failed to fetch files', error: err.message });
    }
};

module.exports = { getFilesBySubjectId };
