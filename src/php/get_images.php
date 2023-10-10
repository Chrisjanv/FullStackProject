<?php
// Include your database configuration file (config.php)
include 'config.php';

try {
    // Query to select image paths from the 'products' table
    $query = "SELECT pictures FROM products";
    $statement = $db->prepare($query);
    $statement->execute();

    $imagePaths = array();

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        // Assuming the 'pictures' column contains file paths
        $imagePaths[] = $row['pictures'];
    }

    // Return the image paths as JSON
    echo json_encode(array('imagePaths' => $imagePaths));
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database query failed: ' . $e->getMessage()));
}