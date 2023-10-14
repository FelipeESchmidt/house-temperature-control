$(function () {
  var sensores;
  var sensor = $("sensor").attr("name");

  repit();
  setInterval(function () {
    repit();
  }, 1000);

  function repit() {
    console.log(sensor);
    $.getJSON(`${getDatabaseURL()}${sensor}.json`, function (data) {
      sensores = data;
    });

    if (sensores != null) {
      changeTemps(sensores);
      putTemperatures(sensores);
    }
  }

  function changeTemps(sensores) {
    var sens = Object.values(sensores);
    changeCSS("sensor_1", sens[sens.length - 1].temperature);
    var sens = Object.values(sensores);
    changeCSS("sensor_2", sens[sens.length - 1].temperature);
    var sens = Object.values(sensores);
    changeCSS("sensor_3", sens[sens.length - 1].temperature);
    var sens = Object.values(sensores);
    changeCSS("sensor_4", sens[sens.length - 1].temperature);
  }

  function changeCSS(sensor, temp) {
    $("#" + sensor)
      .find("div")
      .attr("temp", "temp_" + temp);
    $("#" + sensor)
      .find("div")
      .find("span")
      .html(temp + "º");
  }

  function putTemperatures(sensores) {
    all = Object.values(sensores);
    $("tbody").html("");
    all.forEach((data) => {
      $("tbody").prepend(
        '<tr class="temp_color" temp="temp_' +
          data.temperature +
          '"><td>' +
          data.temperature +
          "º</td><td>" +
          data.date +
          "</td></tr>"
      );
    });
  }
});
