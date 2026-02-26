import * as mysql from 'mysql';
import * as dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
});

connection.connect((err) => {
    if (err) {
        console.error('There was an error with the connection to the database:', err.message);
    } else {
        console.log('Successfully connected to the database.');
    }
});


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export = connection;