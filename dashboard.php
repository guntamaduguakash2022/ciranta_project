<?php

session_start();

if (!isset($_SESSION["user_email"])) {
    header("Location: login.html");
    exit;
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard — Ciranta</title>
</head>
<body>

    <h1>Welcome to Ciranta</h1>

    <p>You are logged in as:</p>
    <p><?php echo $_SESSION["user_email"]; ?></p>

    <a href="logout.php">Logout</a>

</body>
</html>