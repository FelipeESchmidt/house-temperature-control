<?php

    require('phpMQTT-master/phpMQTT.php');
    date_default_timezone_set('America/Sao_Paulo');

    $qtd = (isset($_GET['qtd'])) ? $_GET['qtd'] : 20;
    $i = 0;
    $j = 0;
    
    $server = 'test.mosquitto.org';             // change if necessary
    $port = 1883;                               // change if necessary
    $username = '';                             // set your username
    $password = '';                             // set your password
    $client_id = 'PHPcontainerGURIpublish';     // make sure this is unique for connecting to sever - you could use uniqid()

    $mqtt = new Bluerhinos\phpMQTT($server, $port, $client_id);

    if ($mqtt->connect(true, NULL, $username, $password)) { 
        while($i<$qtd){
            for ($j=1; $j <= 4; $j++) {
                postMqtt($mqtt, $j);
            }
            $i++;
            echo "***********************************************************************\n\n";
            sleep(2);
        }
        $mqtt->close();
    } else {
        echo "Não foi possível conectar o servidor!\n";
    }

    function postMqtt($mqtt, $sensor_number){
        $sensor = "Sensor_$sensor_number";
        $temperatura = random_int(28, 32);
        $data = date("d/m/Y H:i:s");
        $mqtt->publish('SensoresGURIsd', "{ \"sensorNumber\": $sensor_number, \"temperatura\": $temperatura, \"data\": \"$data\" }", 0, false);
        echo "sending: { \"sensorNumber\": $sensor_number, \"temperatura\": $temperatura, \"data\": $data }\n\n";
    }

?>