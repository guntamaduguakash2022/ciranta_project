<?php

$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

echo "<h2>Thank you, " . $name . "!</h2>";
echo "<p>Your message has been received successfully.</p>";
echo "<p>We will get back to you soon.</p>";

?>