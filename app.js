function convertDataToArray(data){
  return data.split(',');
}

function saveDayProgress(day, state){
  var allDays = convertDataToArray(localStorage.days)
  if(state === 'f' || state === 't'){
    allDays[day - 1] = state;
  }
  localStorage.days = allDays.join(',');
}

var days = new Array();

function reloadIndex(){
  days = convertDataToArray(localStorage.days);
  for(var i = 1; i <= 27; i++){
    if(days[i - 1] === 't'){
      $("." + i + "-day-completed-img").html("<img src='done.png' class='complete' />");
    } else if(days[i - 1] === 'f'){
      $("." + i + "-day-completed-img").html("");
    }
  }
}

if(localStorage.length > 0){
  days = convertDataToArray(localStorage.days);
  console.log(localStorage.days);
} else {
  localStorage.days = "f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f"
}

function dayStatus(day){
  return days[day - 1];
}

$('#home').live( 'pageinit', function(event){
  reloadIndex();
  $('.install').click(function(){
    navigator.mozApps.install() 
  });
});

$( '#day' ).live( 'pageinit',function(event){
  console.log(dayStatus($('#completed').data('day')));
  if(dayStatus($('#completed').data('day')) === 't'){
    $("#completed").prop("checked", true).checkboxradio("refresh");
  } else if (dayStatus($('#completed').data('day')) === 'f') {
    $('#completed').prop('checked', false).checkboxradio("refresh");
  }

  $(".treadmill-display").hide();

  $(".street").click(function(){
    $(".street-display").show();
    $(".treadmill-display").hide();
  });
  $(".treadmill").click(function(){
    $(".treadmill-display").show();
    $(".street-display").hide();
  });

  $("input[type='checkbox']").bind( "change", function(event, ui) {
    if($('#completed').is(':checked')){
      saveDayProgress($('#completed').data('day'), 't')
      reloadIndex();
    } else {
      saveDayProgress($('#completed').data('day'), 'f')
      reloadIndex();
    }
  });
});


