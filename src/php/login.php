<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get user input
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Prepare and execute the SQL query to retrieve user data
        $stmt = $db->prepare("SELECT name, email, password FROM users WHERE email = ?");
        $stmt->execute([$email]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Verify the password
            if (password_verify($password, $user['password'])) {
                // Start a session and store user data if login is successful
                session_start();
                $_SESSION['user_email'] = $user['email']; // Assuming email is a unique identifier
                $_SESSION['user_name'] = $user['name'];
                // echo "Login successful!";
            } else {
                echo "Incorrect password!";
            }
        } else {
            echo "User not found!";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>