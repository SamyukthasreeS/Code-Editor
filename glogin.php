<?php
require_once 'vendor/autoload.php';
$clientID = '381031719249-c76edim92t7rn1a4saedeik58bbo6ppf.apps.googleusercontent.com';
$clientSecret = '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';
$redirectUrl = 'http://localhost/bithack/glogin.php'; // URL to this page
$client = new Google_Client();
$client->setClientID($clientID);
$client->setClientSecret($clientSecret);
$client->setRedirectUri($redirectUrl);
$client->addScope('profile');
$client->addScope('email');

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);
    $gauth = new Google_Service_Oauth2($client);
    $google_info = $gauth->userinfo->get();
    $email = $google_info->email;
    $name = $google_info->name;
    $profilePicture = $google_info->picture;
    // Store the user's email and profile picture in session variables
    session_start();
    $_SESSION['user_email'] = $email;
    $_SESSION['user_profile_picture'] = $profilePicture;
    // Redirect to indexg.html
    header("Location: indexg.html");
    exit();
} else {
    echo "<script>window.location='" . $client->createAuthUrl() . "';</script>";
}
?>
