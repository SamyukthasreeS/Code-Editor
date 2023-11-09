<?php
// Establish a database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "code_editor"; // Replace with your actual database name
$conn = new mysqli($servername, $username, $password, $dbname);
// Check for a successful connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Retrieve the user's email from the query parameter
$userEmail = $_GET['email'];
// Query to count the number of rows with the specified email in the save_data table
$sql = "SELECT COUNT(*) AS count FROM save_data WHERE user_email = '$userEmail'";
$result = $conn->query($sql);
$response = array();
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response['count'] = $row["count"];
} else {
    $response['count'] = 0;
}
// Close the database connection
$conn->close();
// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
