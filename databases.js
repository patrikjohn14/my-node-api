const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ طباعة تأكيد الاتصال (باستعمال async/await)
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connection Success with Database');
    connection.release();
  } catch (err) {
    console.error('❌ Connection failed with Database:', err.message);
  }
})();

module.exports = pool;
