const convertButton = document.querySelector(".convert-button"); // BOTAO que aciona a função
const selectOrigin = document.querySelector(".select-origin"); // recebe o SELECT origem
const selectDestination = document.querySelector(".select-destination"); // recebe o SELECT de destino

const currencyType = [
  {
    code: "BRL",
    name: "Real Brasileiro",
    flag: "./assets/br.png",
    format: "pt-BR",
  },
  {
    code: "USD",
    name: "Dólar Americano",
    flag: "./assets/usa.png",
    format: "en-US",
  },
  {
    code: "EUR",
    name: "Euro",
    flag: "./assets/euro.png",
    format: "de-DE",
  },
  {
    code: "ARS",
    name: "Peso Argentino",
    flag: "./assets/arg.png",
    format: "es-AR",
  },
  {
    code: "GBP",
    name: "Libra Esterlina",
    flag: "./assets/lbes.png",
    format: "en-GB",
  },
];

async function convertCurrency() {
  const inputCurrencyValue = document.querySelector(".input-currency").value; // recebe o valor do "input" digitado pelo usuario
  // ------------------------------------------------------------------------------------------------------------
  // VARIAVEIS de origem
  const labelCurrencyOrigin = document.getElementById("label-currency-origin"); // recebe o NOME da moeda de origem
  const currencyOriginImg = document.querySelector(".currency-origin-img"); // recebe o IMAGEM da moeda de origem
  const currencyValueOrigin = document.querySelector(".currency-value-origin"); // recebe o VALOR original
  //------------------------------------------------------------------------------------------------------------
  // VARIAVEIS de destino
  const labelCurrencyDestination = document.getElementById(
    "label-currency-destination"
  ); // recebe o NOME da moeda de destino
  const currencyDestinationImg = document.querySelector(
    ".currency-destination-img"
  ); // recebe o IMAGEM da moeda de destino
  const currencyValueDestination = document.querySelector(
    ".currency-value-destination"
  ); // recebe o VALOR convertido

  let factor = selectOrigin.value + "-" + selectDestination.value; // constroi o fator de ENVIO
  let returnFactor = selectOrigin.value + selectDestination.value; // constroi o nome do OBJETO recebido

  // consulta ao servidor do BANCO CENTRAL
  // laço de pesquisa CEDIDO pelo colega do DevClub - Alessandro Pedroso (modificado por mim para aceitar VARIÁVEL)
  const data = await fetch(
    "https://economia.awesomeapi.com.br/json/last/" + factor
  ).then((response) => response.json());

  const currencyFactor = data[returnFactor].high; // pegando o FATOR DE CONVERSÃO
  const conversionResult = inputCurrencyValue * currencyFactor; // calculo da CONVERSÃO

  // const inptOrigin = selectOrigin.value;
  // const inptDestination = selectDestination.value;

  // laço da MOEDA DE ORIGEM
  let codeOri = "",
    nameOri = "",
    flagOri = "",
    formatOri = "",
    codeDest = "",
    nameDest = "",
    flagDest = "",
    formatDest = "";

  currencyType.forEach((registry) => {
    if (selectOrigin.value == registry.code) {
      codeOri = registry.code;
      nameOri = registry.name;
      flagOri = registry.flag;
      formatOri = registry.format;
    }
  });

  // bloco de formação da MOEDA DE ORIGEM
  currencyValueOrigin.innerHTML = new Intl.NumberFormat(formatOri, {
    style: "currency",
    currency: codeOri,
  }).format(inputCurrencyValue);
  labelCurrencyOrigin.innerHTML = nameOri; // coloca o nome da MOEDA no label de origem
  currencyOriginImg.src = flagOri; // coloca a bandeira na label de origem

  // laço da MOEDA DE DESTINO
  currencyType.forEach((registry) => {
    if (selectDestination.value == registry.code) {
      codeDest = registry.code;
      nameDest = registry.name;
      flagDest = registry.flag;
      formatDest = registry.format;
    }
  });

  // bloco de formação da MOEDA DE DESTINO
  currencyValueDestination.innerHTML = new Intl.NumberFormat(formatDest, {
    style: "currency",
    currency: codeDest,
  }).format(conversionResult);
  labelCurrencyDestination.innerHTML = nameDest; // coloca o nome da MOEDA no label de destino
  currencyDestinationImg.src = flagDest; // coloca a bandeira no destino
}

// fuction FUNCIONANDO (pensar numa solução mais INTELIGENTE)
function disableCurrency() {
  // a linha ABAIXO é uma idéia para otimizar essa função
  // document.getElementById(selectOrigin.value).setAttribute("disabled", "");
  if (selectOrigin.value == "BRL") {
    document.getElementById("BRL").setAttribute("disabled", "");
    document.getElementById("USD").removeAttribute("disabled", "");
    document.getElementById("EUR").removeAttribute("disabled", "");
    document.getElementById("ARS").removeAttribute("disabled", "");
  } else if (selectOrigin.value == "USD") {
    document.getElementById("USD").setAttribute("disabled", "");
    document.getElementById("BRL").removeAttribute("disabled", "");
    document.getElementById("EUR").removeAttribute("disabled", "");
    document.getElementById("ARS").removeAttribute("disabled", "");
  } else if (selectOrigin.value == "EUR") {
    document.getElementById("EUR").setAttribute("disabled", "");
    document.getElementById("BRL").removeAttribute("disabled", "");
    document.getElementById("USD").removeAttribute("disabled", "");
    document.getElementById("ARS").removeAttribute("disabled", "");
  } else if (selectOrigin.value == "ARS") {
    document.getElementById("ARS").setAttribute("disabled", "");
    document.getElementById("BRL").removeAttribute("disabled", "");
    document.getElementById("USD").removeAttribute("disabled", "");
    document.getElementById("EUR").removeAttribute("disabled", "");
  }
}
// função da mudança do select de DESTINO
function recharge() {
  const inputValue = document.querySelector(".input-currency").value;
  if (inputValue > 0) {
    convertCurrency();
  }
}
selectOrigin.addEventListener("change", disableCurrency);
selectDestination.addEventListener("change", recharge);
convertButton.addEventListener("click", convertCurrency);
