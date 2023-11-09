<?php

$uname = $_POST['uname'];
$email = $_POST['email'];
$pass = $_POST['pass'];
$cpass = $_POST['cpass'];

if (!empty($uname) || !empty($email) || !empty($pass) || !empty($cpass)) {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "code_editor";
    // Create connection
    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if (mysqli_connect_error()) {
        die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    } else {
        $SELECT = "SELECT email FROM signup WHERE email = ? LIMIT 1";
        $INSERT = "INSERT INTO signup (uname, email, pass, cpass) VALUES (?, ?, ?, ?)";

        // Prepare statement
        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($email);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        // Checking email
        if ($rnum == 0) {
            $stmt->close();
            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("ssss", $uname, $email, $pass, $cpass);
            $stmt->execute();
            echo "New record inserted successfully";

            // Close statement and connection
            $stmt->close();
            $conn->close();

            // Display success message and redirect
            echo "<script>
                    alert('Registration successful. You can now sign in.');
                    window.location.href ='signin.html';
                  </script>";
            exit();
        } else {
            echo "<script>
                    alert('Someone already registered using this email');
                    window.location.href ='signup.html';
                  </script>";
            exit();
        }
        $stmt->close();
        $conn->close();
    }
} else {
    echo "All fields are required";
    die();
}
?>
