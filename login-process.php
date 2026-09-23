<?php

session_start();

$email = $_POST["email"];
$password = $_POST["password"];

if ($email == "admin@ciranta.com" && $password == "12345") {

    $_SESSION["user_email"] = $email;

    header("Location: index.html");
    exit;

} else {

    echo "Invalid email or password!";

}

?>