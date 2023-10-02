<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Database connection
    $host = "localhost";
    $dbname = "bro_clothing";
    $username = "root";

    // Database connection
    $db = new mysqli($host, $db_name, $username);
    
    // Check for errors
    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }

    // Get user input
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Retrieve user data from the database
    $query = "SELECT id, name, email, password FROM users WHERE email='$email'";
    $result = $db->query($query);

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Start a session and store user data if login is successful
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            echo "Login successful!";
        } else {
            echo "Incorrect password!";
        }
    } else {
        echo "User not found!";
    }

    // Close the database connection
    $db->close();
}
?>