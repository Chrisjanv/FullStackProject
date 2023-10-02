<?php

// Database configuration
$host = "localhost";
$dbname = "bro_clothing";
$username = "root";

// Establish a database connection using PDO
try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo("Database connection established");
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>