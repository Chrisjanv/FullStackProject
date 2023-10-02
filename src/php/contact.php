<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate form fields
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "All fields are required. Please fill out the entire form.";
    } else {
        // Send email or perform other processing here
        // For example, you can use the PHP mail() function to send an email

        // Provide a success message
        echo "Thank you! Your message has been sent.";
    }
} else {
    echo "Invalid request.";
}
?>