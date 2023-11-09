<?php
// Database connection settings
$host = "localhost";
$username = "root";
$password = "";
$database = "code_editor";

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check for a successful connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Get user input (email and problem name)
$user_email = $_POST['user_email'];
$problem_name = $_POST['problem_name'];
// Check if the user already solved the problem
$check_query = "SELECT * FROM solved_problems WHERE user_email = '$user_email' AND problem_name = '$problem_name'";
$result = $conn->query($check_query);
if ($result->num_rows > 0) {
    // If the user already solved the problem, update the solve count
    $update_query = "UPDATE solved_problems SET solve_count = solve_count + 1 WHERE user_email = '$user_email' AND problem_name = '$problem_name'";
    $conn->query($update_query);
} else {
    // If the user hasn't solved the problem before, insert a new record
    $insert_query = "INSERT INTO solved_problems (user_email, problem_name) VALUES ('$user_email', '$problem_name')";
    $conn->query($insert_query);
}
// Close the database connection
$conn->close();
?>
