<?php
session_start();
$response = array();

if (isset($_POST['user_email']) && isset($_POST['selected_language']) && isset($_POST['problem_name'])) {
    $userEmail = $_POST['user_email'];
    $selectedLanguage = $_POST['selected_language'];
    $problemName = $_POST['problem_name'];
    // Create a database connection
    $conn = new mysqli("localhost", "root", "", "code_editor");
    // Check connection
    if ($conn->connect_error) {
        $response['error'] = "Connection failed: " . $conn->connect_error;
    } else {
        // Construct and execute SQL query to increment the selected language column
        $sql = "UPDATE solved_problems SET $selectedLanguage = $selectedLanguage + 1 WHERE user_email = '$userEmail' AND problem_name = '$problemName'";
        if ($conn->query($sql) === TRUE) {
            // Language count incremented successfully
            $response['message'] = "Language count incremented successfully.";
        } else {
            $response['error'] = "Error: " . $sql . "<br>" . $conn->error;
        }
        // Close the database connection
        $conn->close();
    }
} else {
    $response['error'] = "Invalid data received.";
}
header('Content-Type: application/json');
echo json_encode($response);
?>
