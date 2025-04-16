const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");

const btn =document.querySelector("form button");
const converterBtn =document.getElementById("converterBtn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode; 
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
    } else   if(select.name === "to" && currCode === "PKR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}

const updateFlag = (element) =>{
 let currCode = element.value;
let countrycode = countryList[currCode];
let newSrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src =newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || amtVal < 1){
        amtVal = 1;
        amount.value = "1"
    }




  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  try {
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching conversion rate. Please try again.";
    console.error(error);
  }
});

converterBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let converterDiv = document.getElementById("parent-div-converter");
  let hasrowClass=converterDiv.classList.contains('row-reverse');
  if(hasrowClass){
    converterDiv.classList.remove('row-reverse');
  }else{
    converterDiv.classList.add('row-reverse');

  }
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;

  updateFlag(fromCurr);
  updateFlag(toCurr);
}
)



