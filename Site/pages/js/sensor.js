$(function(){

    var sensores;
    var sensor = $('sensor').attr('name');

    repit();
    setInterval(function(){
        repit();
    },1000);

    function repit(){

        $.getJSON('LINK_DO_SEU_BANCO_FIREBASE'+sensor+'.json', function(data) {
            sensores = data;
        });

        if (sensores != null) {   
            changeTemps(sensores);
            putTemperatures(sensores);
            
        }

    }

    function changeTemps(sensores){
        var sens = Object.values(sensores);
        changeCSS("sensor_1", sens[sens.length-1].temperatura);
        var sens = Object.values(sensores);
        changeCSS("sensor_2", sens[sens.length-1].temperatura);
        var sens = Object.values(sensores);
        changeCSS("sensor_3", sens[sens.length-1].temperatura);
        var sens = Object.values(sensores);
        changeCSS("sensor_4", sens[sens.length-1].temperatura);
    }

    function changeCSS(sensor, temp){
        $('#'+sensor).find('div').attr('temp','temp_'+temp);
        $('#'+sensor).find('div').find('span').html(temp+'º');
    }

    function putTemperatures(sensores){
        all = Object.values(sensores);
        $('tbody').html('');
        all.forEach(medicao => {
            $('tbody').prepend('<tr class="temp_color" temp="temp_'+medicao.temperatura+'"><td>'+medicao.temperatura+'º</td><td>'+medicao.data+'</td></tr>');
        });
    }
	
});