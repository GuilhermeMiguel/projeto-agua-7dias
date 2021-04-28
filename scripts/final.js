
const $usuarioLogado = sessionStorage.getItem("usuarioLogado");

const $dadosUsuario =  JSON.parse(localStorage.getItem($usuarioLogado));

const $textoQuantidadeAgua = document.querySelector('.quantidadeTotalDeAguaTomada');

if($usuarioLogado == null || !$dadosUsuario.finalizado){
    window.location.href = "/pages/dias/index.html"
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawGrafico);


function drawGrafico() { 
  
  let arrayParaOhGrafico = [
    ['Dia', 'Mls Ingeridos', 'Mls Esperados'],
  ];

  let dia = 1;
  
  let quantidadeTotalDeAguaTomada = 0;

  $dadosUsuario.quantidade.forEach(x => {
    quantidadeTotalDeAguaTomada = quantidadeTotalDeAguaTomada + x;
    arrayParaGrafico.push([`0${dia++}`, x, 2000]);
  });
  
  $textoQuantidadeAgua.innerText = `${quantidadeTotalDeAguaTomada} Mls`;
  
  // Some raw data (not necessarily accurate)
  var data = google.visualization.arrayToDataTable(arrayParaOhGrafico);

  var options = {
    title : 'Quantidade de água tomada na última semana.',
    vAxis: {title: 'Quantidade'},
    hAxis: {title: 'Dias'},
    bar: {groupWidth: "40%"},
    seriesType: 'bars',
    series: {5: {type: 'line'}}
  };

  var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}