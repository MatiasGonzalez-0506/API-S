const inputCLP = document.getElementById("clp")
const foreignExchange = document.getElementById("foreignExchange")
const result = document.getElementById("result")
const btnSearch = document.getElementById("search")
const url = "https://mindicador.cl/api/"
let total = ""

async function getforeignExchangePrice(){
    let urlforeignExchange = url + foreignExchange.value
    const res = await fetch(urlforeignExchange)
    const data = await res.json()
    let value = data.serie[0].valor
    console.log(value)
    console.log(inputCLP.value)
    total = inputCLP.value / value
    result.innerHTML = Number(total).toFixed(2)

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

  function graphic(dataGrafic) {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "dark1", // "light1", "light2", "dark1", "dark2"
      title: {
        text: "cambiar texto",
      },
      axisY: {
        title: "cambiar texto",
      },
      data: [
        {
          type: "column",
          showInLegend: true,
          legendMarkerColor: "grey",
          dataPoints: dataGrafic,
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
  }
  
  async function indicator() {
    let urlforeignExchange = url + foreignExchange.value
    let miIndicator = await fetch(urlforeignExchange);
    let data = await miIndicator.json();
    let arrObject = [];
    for (const i of data.serie.slice(0, 9)) {
      let dataGrafic = [{ y: i.valor, label: i.fecha }];
      arrObject.push(dataGrafic);
    }
    graphic(arrObject.flat());
    // console.log(arrObject.flat());
  }

  btnSearch.addEventListener('click', () => {
    Validation()
    getforeignExchangePrice()
    indicator()
    graphic()
}) 
