#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

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

  // Connect to MQTT
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

  // Print values to serial monitor
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" °C");

  // Publish temperature and humidity to MQTT
  String payload = String(temperature);
  client.publish(mqttTopic, payload.c_str());

  // Delay before the next reading and MQTT publication
  delay(5000);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");

    // Attempt to connect
    if (client.connect("ESP32Client")) {
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
