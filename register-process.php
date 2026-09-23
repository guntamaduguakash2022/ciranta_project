<?php

$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$password = $_POST["password"];

echo "<h2>Registration Successful!</h2>";
echo "<p>Welcome to Ciranta, " . $name . ".</p>";
echo "<p>Your registration has been received successfully.</p>";

?>