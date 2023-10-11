$(function(){

    var sensores;

    repit();
    setInterval(function(){
        repit();
    },1000);

    function repit(){

        $.getJSON('LINK_DO_SEU_BANCO_FIREBASE.json', function(data) {
            sensores = data;
        });

        if (sensores != null) {        
            changeTemps(sensores);
        }

    }

    function changeTemps(sensores){
        var sens = Object.values(sensores.Sensor_1);
        changeCSS("sensor_1", sens[sens.length-1].temperatura);
        var sens = Object.values(sensores.Sensor_2);
        changeCSS("sensor_2", sens[sens.length-1].temperatura);
        var sens = Object.values(sensores.Sensor_3);
        changeCSS("sensor_3", sens[sens.length-1].temperatura);
        var sens = Object.values(sensores.Sensor_4);
        changeCSS("sensor_4", sens[sens.length-1].temperatura);
    }

    function changeCSS(sensor, temp){
        $('#'+sensor).find('div').attr('temp','temp_'+temp);
        $('#'+sensor).find('div').find('span').html(temp+'º');
    }
	
});