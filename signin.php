<?php
// Database connection parameters
$hostname = 'localhost';
$username = 'root';
$password = '';
$database = 'code_editor';
// Create a new MySQLi instance
$mysqli = new mysqli($hostname, $username, $password, $database);
// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
// Get user inputs from the form
$email = $_POST['email'];
$pass = $_POST['pass'];
// Prepare and execute SQL query
$query = "SELECT * FROM signup WHERE email = '$email' AND pass = '$pass'";
$result = $mysqli->query($query);

// Check if a row was returned
if ($result->num_rows == 1) {
    // Successful login, redirect to indexl.html with email parameter
    header("Location: indexl.html?email=" . urlencode($email));
    exit();
} else {
    // Invalid login, show error message
    echo "Invalid email or password.";
}
// Close database connection
$mysqli->close();
?>