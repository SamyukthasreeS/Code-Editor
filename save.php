<?php
session_start();

$response = array();

if (isset($_SESSION['user_email'])) {
    $userEmail = $_SESSION['user_email'];

    // Get the editor content, file name, and language from the POST request
    if (isset($_POST['editor_content']) && isset($_POST['file_name']) && isset($_POST['language'])) {
        $editorContent = $_POST['editor_content'];
        $fileName = $_POST['file_name'];
        $language = $_POST['language']; // New language value

        // Connect to your MySQL database (replace with your database credentials)
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "code_editor";
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        // Prepare and execute the SQL INSERT statement
        $stmt = $conn->prepare("INSERT INTO save_data (user_email, saved_time, editor_content, file_name, language) VALUES (?, NOW(), ?, ?, ?)");
        $stmt->bind_param("ssss", $userEmail, $editorContent, $fileName, $language);
        
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "File saved successfully!";
        } else {
            $response['success'] = false;
            $response['message'] = "Error saving file: " . $stmt->error;
        }
        
        $stmt->close();
        $conn->close();
    } else {
        $response['success'] = false;
        $response['message'] = "Editor content, file name, or language missing in the request.";
    }
} else {
    $response['success'] = false;
    $response['message'] = "User not logged in.";
}

header('Content-Type: application/json');
echo json_encode($response);
?>
