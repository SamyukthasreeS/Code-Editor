<?php
// Check for a POST request with the 'id' parameter
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["id"])) {
    // Sanitize and retrieve the 'id' parameter
    $id = intval($_POST["id"]);

    // Connect to your MySQL database
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "code_editor";
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the database connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute the SQL query to delete the row
    $sql = "DELETE FROM save_data WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        // Deletion was successful
        echo "Row deleted successfully.";
    } else {
        // Error during deletion
        echo "Error: " . $stmt->error;
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>
