#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <time.h>

// Replace these with your WiFi credentials
const char* ssid = "iot";
const char* password = "iot@123@";

// Replace this with your MQTT broker address
const char* mqttServer = "test.mosquitto.org";
const int mqttPort = 1883;

// Replace this with your own topic
const char* mqttTopic = "SensoresGURImc";

// DHT sensor configuration
#define DHTPIN 4           // Pin where the DHT22 sensor is connected
#define DHTTYPE DHT11      // DHT 22 (AM2302) sensor type
DHT dht(DHTPIN, DHTTYPE);  // Initialize DHT sensor

long timezone = -3;
byte daysavetime = 1;

// Create an instance of the WiFiClient class
WiFiClient espClient;

// Create an instance of the PubSubClient class
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(5000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println("Contacting Time Server");
  configTime(3600 * timezone, daysavetime * 3600, "time.nist.gov", "0.pool.ntp.org", "1.pool.ntp.org");
  // Connect to MQTT
  // ntp.setTimeOffset(-10800);
  client.setServer(mqttServer, mqttPort);

  // Start the DHT sensor
  dht.begin();
}

void loop() {
  // Ensure the client is connected to the MQTT server
  if (!client.connected()) {
    reconnect();
  }

  // Read temperature and humidity from DHT22 sensor
  float temperature = dht.readTemperature();

  // Check if any reads failed
  if (isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    delay(5000);
    return;
  }

  struct tm tmstruct ;

  tmstruct.tm_year = 0;
  getLocalTime(&tmstruct);

  String date = (((tmstruct.tm_year) + 1900) + "-" + String(( tmstruct.tm_mon) + 1) + "-" + String(tmstruct.tm_mday));
  
  String hour = (String(tmstruct.tm_hour) + ":" + String(tmstruct.tm_min) + ":" + String(tmstruct.tm_sec));

  // Serial.println("Date: " + date + " - Time: " + hour);
  // Obter os últimos 4 caracteres
  String dia = date.substring(date.length() - 4);
  String DateHour = String(dia +" "+ hour);
  String temperatureString = String(temperature, 1); 
  String str1 = " {\"number\": \"1\", \"temperature\": \" " + temperatureString + " \", \"date\": \" " + DateHour +" \"} ";
  String str2 = " {\"number\": \"2\", \"temperature\": \" " + temperatureString + " \", \"date\": \" " + DateHour +" \"} ";
  String str3 = " {\"number\": \"3\", \"temperature\": \" " + temperatureString + " \", \"date\": \" " + DateHour +" \"} ";
  String str4 = " {\"number\": \"4\", \"temperature\": \" " + temperatureString + " \", \"date\": \" " + DateHour +" \"} ";
  //o que vai ser mandado
  Serial.println(str1);
  Serial.println(str2);
  Serial.println(str3);
  Serial.println(str4);
  //enviando para o mqtt
  client.publish(mqttTopic , str1.c_str());
  client.publish(mqttTopic , str2.c_str());
  client.publish(mqttTopic , str3.c_str());
  client.publish(mqttTopic , str4.c_str());

  // Delay before the next reading and MQTT publication
  delay(5000);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");

    // Attempt to connect
    if (client.connect("Teste")) {
      Serial.println("Connected to MQTT");
      // Subscribe to the topic if needed
      // client.subscribe(mqttTopic);
    } else {
      Serial.print("Failed, rc=");
      Serial.print(client.state());
      Serial.println(" Retrying in 5 seconds...");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
