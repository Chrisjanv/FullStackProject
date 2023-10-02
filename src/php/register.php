<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Modify these database connection details to match your existing database
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
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

    // Insert user data into the database
    $query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
    if ($db->query($query) === TRUE) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $db->error;
    }

    // Close the database connection
    $db->close();
}
?>