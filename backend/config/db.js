const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,     
    queueLimit: 0          
});
                 
(async () => {                                                                           
    try {
        const conn = await pool.getConnection();
        console.log("✅ Successfully connected to the database {</>}");
        conn.release(); 
    } catch (err) {
        console.error("❌ Error occurred when connecting to the database:", err.message);
}})();
module.exports = pool;
