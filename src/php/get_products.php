<?php
require('config.php'); // Include your existing config.php file

// Fetch products from the database
$query = "SELECT name, size, price, pictures FROM products";
$stmt = $db->query($query);
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($products);
?>