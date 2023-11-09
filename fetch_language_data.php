<?php
// Get the user's email from the query parameter
$userEmail = $_GET['user_email'];

// Connect to your MySQL database and fetch the language data for the specific user_email
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "code_editor";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Modify your SQL query to filter by user_email
$sql = "SELECT language FROM save_data WHERE user_email = '$userEmail'";
$result = $conn->query($sql);
$languages = array(); // Initialize an array to store the languages

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $languages[] = $row["language"];
    }
}
$conn->close();
// Return the languages as JSON
echo json_encode($languages);
?>
