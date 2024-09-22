const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
    host: 'mumult3.hostarmada.net',
    user: 'gamescre_ggp',
    password: 'cevhyw-tyjro7-fUvvyj',
    database: 'gamescre_ggp'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});


async function validateUser(email, password) {
    let connection;
 console.log("1");
    try {
        // Create a connection to the database
        connection = await mysql2.createConnection(dbConfig);
        console.log("2");
        // Example query
        let isValid;

        // Call the stored procedure
        const [rows] = await connection.execute(
            'CALL ValidateUserCredentials({email},{password}, @isValid); SELECT @isValid AS isValid;',
            [email, password]
        );
        console.log("3");
        // Get the output value from the second result set
        isValid = rows[1][0].isValid;

        // Log the result
        if (isValid) {
            console.log('Valid credentials.');
        } else {
            console.log('Invalid credentials.');
        }
        console.log('Query results:', results);
    }
    catch (error) {
        console.error('Error validating user credentials:', error);
    }
    finally {
        // Close the connection
        if (connection) {
            await connection.end();
        }
    };
};
// Close the connection when you're done
module.export = validateUser;

