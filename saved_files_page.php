<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Saved Files</title>
</head>
<body>
<?php
// Start or resume the session
session_start();
// Connect to your MySQL database and fetch the saved files data here
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "code_editor";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Get the user's email address from the session
$userEmail = $_SESSION['user_email'];
// Check if the delete button is pressed
if(isset($_POST['delete'])){
    $fileId = $_POST['delete'];
    // SQL query to delete the row with the specified ID
    $deleteSql = "DELETE FROM save_data WHERE id = '$fileId' AND user_email = '$userEmail'";
    if ($conn->query($deleteSql) === TRUE) {
        // Reload the page after successful deletion
        header("Location: saved_files_page.php"); // Replace with the actual page name
        exit();
    } else {
        echo "Error deleting record: " . $conn->error;
    }
}

// SQL query to select rows for the specific user
$sql = "SELECT id, user_email, saved_time, file_name, editor_content FROM save_data WHERE user_email = '" . $userEmail . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo '<table>
        <tr>
            <th>ID</th>
            <th>User Email</th>
            <th>Saved Time</th>
            <th>File Name</th>
            <th>View Content</th>
            <th>Delete</th> <!-- Add a new column for the delete button -->
        </tr>';
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row["id"] . "</td>";
            echo "<td>" . $row["user_email"] . "</td>";
            echo "<td>" . $row["saved_time"] . "</td>";
            echo "<td>" . $row["file_name"] . "</td>";
            echo '<td><textarea style="width: 95%; height: 150px;" readonly>' . $row["editor_content"] . '</textarea></td>';
            echo '<td><form method="post" action=""><button type="submit" name="delete" value="' . $row["id"] . '">Delete</button></form></td>';
            echo "</tr>";
        }        
    echo '</table>';
} else {
    echo "No saved files found for this user.";
}
$conn->close();
?>
    <style>
        body{
            background-color:c2e9fb;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px; 
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color:violet; 

        tr:nth-child(even) {
            background-color: #f2f2f2; 
        }
        </style>
</body>
</html>