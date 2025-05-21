const db = require('../databases');

const getAllSubjects = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT id, name FROM subjects ORDER BY name ASC`);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching subjects:', err);
        res.status(500).json({ message: 'Failed to fetch subjects', error: err.message });
    }
};

module.exports = { getAllSubjects };
