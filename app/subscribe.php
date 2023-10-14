<?php

require('./phpMQTT-master/phpMQTT.php');
require('./database.php');

$server = 'test.mosquitto.org';             // change if necessary
$port = 1883;                               // change if necessary
$username = '';                             // set your username
$password = '';                             // set your password
$client_id = 'PHPcontainerGURIsubscribe';   // make sure this is unique for connecting to sever - you could use uniqid()

$i = 0;

$mqtt = new Bluerhinos\phpMQTT($server, $port, $client_id);
if (!$mqtt->connect(true, NULL, $username, $password)) {
    exit(1);
}

$mqtt->debug = true;

$topics['SensoresGURImc'] = array('qos' => 0, 'function' => 'postFirebase');
$mqtt->subscribe($topics, 0);

while ($mqtt->proc() && $i < 400) {
    $i++;
}

$mqtt->close();

function postFirebase($topic, $msg)
{
    $sensorMessage = json_decode($msg);
    $isValid = validateObject($sensorMessage);
    echo $isValid;
    if ($isValid) {
        $sensor = "Sensor_$sensorMessage->number";
        $temperature = $sensorMessage->temperature;
        $date = $sensorMessage->date;
        sendCurl($sensor, $temperature, $date);
        echo "Mensagem recebida com sucesso, e repassada para Firebase\n";
    } else {
        echo "Mensagem recebida com erro:\n";
        echo "msg: \t$msg\n";
        echo "msg2: \t$sensorMessage\n\n";
    }
}

function validateObject($message)
{
    return is_object($message) &&
        property_exists($message, 'number') &&
        property_exists($message, 'temperature') &&
        property_exists($message, 'date');
}

function sendCurl($sensor, $temperature, $date)
{
    $url_banco = getUrlBanco();
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url_banco . $sensor . ".json");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array('temperature' => $temperature, 'date' => $date)));
    curl_exec($ch);
    curl_close($ch);
}
