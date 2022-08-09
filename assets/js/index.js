const inputCLP = document.getElementById("clp")
const foreignExchange = document.getElementById("foreignExchange")
const result = document.getElementById("result")
const btnSearch = document.getElementById("search")
const graphic = document.getElementById("graphic")
const url = "https://mindicador.cl/api/"
let total = ""

async function getforeignExchangePrice(){
    console.log("inicio de llamada")
    let urlforeignExchange = url + foreignExchange.value
    console.log(urlforeignExchange)
    const res = await fetch(urlforeignExchange)
    const data = await res.json()
    value = data.serie[0].valor
    console.log(value)
    console.log(inputCLP.value)
    total = inputCLP.value / value
    result.innerHTML = Number(total).toFixed(2)
    console.log(total)
}

function Validation(){
    if(inputCLP.value === ""){
        alert("Aun no haz ingresado un valor a convertir")
        return
    }
    else if(inputCLP.value <= 0){
        alert("no se pueden convertir valores negativos o iguales a 0")
        return
    }
    if(foreignExchange.value === "ex"){
        alert("debes seleccionar una divisa")
        return
    }
}



btnSearch.addEventListener('click', () => {
    Validation()
    getforeignExchangePrice()
})   

async function getSomething() {
    try {
      const res = await fetch("https://mindicador.cl/api/");
      if (res.status == 200) {
        const data = await res.json();
      } else {
        throw "err";
      }
    } catch (err) {
      console.log("catch", err);
      alert("ha ocurrido un error")
    }
  }
  getSomething();

  mayo = [{name: "Pedro"},{name: "Victor"},{name: "Yaritza"}]
  junio = [{name: "Luis"},{name: "Valeria"}]
  julio = [{name: "Karla"}]
  
  let totalMayo = mayo.length;
  let totalJunio = junio.length;
  let totalJulio = julio.length;
  
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "dark1",
    title: {
      text: "Movimiento del valor seleccionado",
    },
    axisY: {
      title: "Valor por dia",
    },
    data: [
      {
        type: "column",
        showInLegend: true,
        legendMarkerColor: "grey",
        dataPoints: [
          { y: totalMayo, label: "Mayo" },
          { y: totalJunio, label: "Junio" },
          { y: totalJulio, label: "Julio" },
        ],
      },
    ],
    options: {
      backgroundColor: ["rgba(21,129, 239, 1)"],
      labels: {
        font: {
          family: "'Quicksand', sans-serif'",
          size: 14,
        },
      },
    },
  });
  chart.render();