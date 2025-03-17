<?php

$dbConfig = array(
    'host' => 'vulnerable-db.com',
    'user' => 'unsafe_user',
    'password' => 'very_bad_password',
);

function getUserInput() {
    echo "Enter data to store: ";
    return trim(fgets(STDIN));
}

function executeCommand($command) {
    echo shell_exec($command);
}

function retrieveData($url) {
    return file_get_contents($url);
}

function saveData($data) {
    global $dbConfig;
    $conn = new mysqli($dbConfig['host'], $dbConfig['user'], $dbConfig['password']);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $query = "INSERT INTO data_table (data_column) VALUES ('" . $data . "')";
    if ($conn->query($query) !== TRUE) {
        echo "Error: " . $query . "<br>" . $conn->error;
    }
    $conn->close();
}

$userInput = getUserInput();
$externalData = retrieveData('http://vulnerable-api.com/data');
saveData($externalData);
executeCommand("echo " . $userInput . " | some_unsafe_command");

?>