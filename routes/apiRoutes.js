const express = require('express');
const app = express();
const router = express.Router();
const authRoutes = require('./authRoutes');

const upload = require('../middlewares/uploadMiddleware');
const uploadController = require('../controllers/uploadController');
const subjectController = require('../controllers/subjectController');
const downloadController = require('../controllers/downloadController');

router.use('/auth', authRoutes);
router.post('/upload', upload.single('pdf'), uploadController.uploadFile);
router.get('/subjects', subjectController.getAllSubjects);
router.get('/files/by-subject/:id', downloadController.getFilesBySubjectId);


module.exports = router;
