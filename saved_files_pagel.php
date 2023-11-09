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

// Get the user's email address from the URL parameter
$userEmail = isset($_GET['email']) ? $_GET['email'] : '';

// SQL query to select rows for the specific user (if email is provided)
if (!empty($userEmail)) {
    $sql = "SELECT id, user_email, saved_time, file_name, editor_content FROM save_data WHERE user_email = '" . $userEmail . "'";
} else {
    // SQL query to select all saved files if no email is provided
    $sql = "SELECT id, user_email, saved_time, file_name, editor_content FROM save_data";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo '<table>
        <tr>
            <th>ID</th>
            <th>User Email</th>
            <th>Saved Time</th>
            <th>File Name</th>
            <th>View Content</th>
        </tr>';
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row["id"] . "</td>";
        echo "<td>" . $row["user_email"] . "</td>";
        echo "<td>" . $row["saved_time"] . "</td>";
        echo "<td>" . $row["file_name"] . "</td>";
        echo '<td><button onclick="viewContent(\'' . $row["editor_content"] . '\')">View</button></td>';
        echo "</tr>";
    }
    echo '</table>';
} else {
    echo "No saved files found";
}

$conn->close();
?>
<textarea id="edicontent" style="width: 400px; height: 400px;"></textarea>
<script>
function viewContent(content) {
    // Display the content in the textarea
    document.getElementById('edicontent').value = content;
}
</script>
<style>
    body{
        background-color: c2e9fb;
    }
    /* Add table styles here */
    table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 20px; /* Optional margin for spacing */
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }

    th {
        background-color: violet; /* Optional background color for header cells */
    }

    tr:nth-child(even) {
        background-color: #f2f2f2; /* Optional background color for even rows */
    }
</style>
</body>
</html>
