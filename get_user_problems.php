<?php
// Database connection details
$host = "localhost"; // Replace with your database host (e.g., localhost)
$database = "code_editor"; // Replace with your database name
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password

// Create a database connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
// Prepare and execute a SQL query to fetch all problem names
$sql = "SELECT problem_name FROM solved_problems"; // Replace with your actual problem table name
$result = mysqli_query($conn, $sql);
// Check for errors and fetch problem names
if (!$result) {
    die("Error: " . mysqli_error($conn));
}
$problemNames = array();
while ($row = mysqli_fetch_assoc($result)) {
    $problemNames[] = $row['problem_name'];
}
// Convert the problem names to JSON and send it as a response
header('Content-Type: application/json');
echo json_encode($problemNames);
// Close the database connection
mysqli_close($conn);
?>