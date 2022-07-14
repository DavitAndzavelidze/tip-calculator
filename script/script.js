const bill = document.getElementById('bill__input');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('inp__tip');
const people = document.getElementById('inp__people');
const errorMsg = document.querySelector('.error__msg');
const results = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.reset');

//--------------- Add event listener-------------
bill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setTipCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);


let billValue = 0.0; //----default value------
let tipValue = 0.15; //-----------default value -> 15% button is active---------------
let peopleValue = 1; 

function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

// when someone type , between numbers this function replace it to point .
function setBillValue(){
    if (bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }

    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1);
    }

    billValue = parseFloat(bill.value);

    calculateTip();
   
}

function handleClick(event){
    tipBtns.forEach(btn => {
        //------------------clear active state------------------
        btn.classList.remove('btn-active');

        //--------------------set active state---------------- 
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    });

    //-----------------------clear custom tip-----------------
    tipCustom.value = '';

    calculateTip();

   
}

function setTipCustomValue(){
    if(!validateInt(tipCustom.value)){
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }
    tipValue = parseFloat(tipCustom.value/100);

    //-------------------Remove active state from buttons------------------------
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if(tipCustom.value !== ''){
        calculateTip();
    }
    
    
}

// ------------------Appears error massage when type 0 in input field------------------- 
function setPeopleValue(){
    if(!validateInt(people.value)){
        people.value = people.value.substring(0, people.value.length-1);
    }

    peopleValue = parseFloat(people.value);

    if(peopleValue <= 0){
        errorMsg.classList.add('show-error-msg');
        people.style.border = "2px solid red";
        setTimeout(function(){
            errorMsg.classList.remove('show-error-msg');
            people.style.border = "none";
        }, 3000);
    }

    calculateTip();
   
}

// -------------------Calculate tip, total in minimum one person----------------------
function calculateTip(){
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

//--------------Reset all values---------------
function reset(){
    bill.value = '0.0';
    setBillValue();

    tipBtns[2].click();

    people.value = '1';
    setPeopleValue();
}