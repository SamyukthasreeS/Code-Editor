<?php
session_start();

$response = array();

if (isset($_SESSION['user_email'])) {
    $response['email'] = $_SESSION['user_email'];
}

if (isset($_SESSION['user_profile_picture'])) {
    $response['profilePicture'] = $_SESSION['user_profile_picture'];
}

header('Content-Type: application/json');
echo json_encode($response);
?>