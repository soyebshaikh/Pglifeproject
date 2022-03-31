<?php
session_start();
require("../includes/database_connect.php");

$email = $_POST['email'];
$password = $_POST['password'];
$password = sha1($password);

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = pg_query($db, $sql);
if (!$result) {
    $response= array("success"=> false, "message"=> "Something went wrong!");
	echo json_encode($response);
    return;
}

$row_count = pg_num_rows($result);
if ($row_count == 0) {
    $response= array("success"=> false, "message"=> "Login failed! Invalid email or password.");
	echo json_encode($response);
    return;
}

$row = pg_fetch_assoc($result);
$_SESSION['user_id'] = $row['id'];
$_SESSION['full_name'] = $row['full_name'];
$_SESSION['email'] = $row['email'];

$response= array("success" => true, "message" => "Login successful !");
echo json_encode($response);
pg_close($db);
