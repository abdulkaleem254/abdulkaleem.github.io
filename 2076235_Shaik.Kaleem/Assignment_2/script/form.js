const ryes = document.getElementById("yes");
const rno = document.getElementById("no");
const radform = document.getElementById("radform");
const para = document.getElementById("para");
const srypara = document.getElementById("srypara");
const btn = document.getElementById("btn");


// form tags
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const addr = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const zip = document.getElementById("zipcode");
const num = document.getElementById("phn");
const email = document.getElementById("email");
const form = document.getElementById("regform");
const err = document.getElementsByClassName("err");
const print = document.getElementById("rdo");
const txt = document.getElementById("rod");


// error ids
var er1 = document.getElementById("e1");
var er2 = document.getElementById("e2");
var er3 = document.getElementById("e3");
var er4 = document.getElementById("e4");
var er5 = document.getElementById("e5");
var er6 = document.getElementById("e6");
var er7 = document.getElementById("e7");
var er8 = document.getElementById("e8");
var len = 1;

document.getElementById("radsub").addEventListener("click", (event) => {
    if (ryes.checked === true) {
        para.style.display = "none";
        radform.style.display = "none";
        srypara.style.display = "block";
        btn.style.display = "block";
        document.getElementById("registration").style.display = "none";
        hide(e1, e2, e3, e4, e5, e6, e7, e8);

    }
    else if (rno.checked === true) {
        document.getElementById("registration").style.display = "block";
        rno.checked = false;
        ryes.checked = false;

    }
    else {
        alert("Please select any option");
    }

});
btn.addEventListener("click", () => {
    para.style.display = "block";
    radform.style.display = "block";
    srypara.style.display = "none";
    btn.style.display = "none";
    rno.checked = false;
    ryes.checked = false;
});
// if fiels are empty then to throw error messgae
document.getElementById("frmsub").addEventListener("click", (form) => {


    if (validateForm()) {
        form.submit();
    }
    else {
        form.preventDefault();
    }

});
var res = Fn = Ln = Adr = cty = zcode = ph = eml = st = 0;

function validateForm() {

    if (fname.value === "" && lname.value === "" && addr.value === "" &&
        city.value === "" && state.value === "" && zip.value === "" && num.value === "" && email.value === "") {
        for (let i = 0; i < err.length; i++) {
            err[i].style.visibility = "visible";
        }
        fname.style.borderColor = "red";
        lname.style.borderColor = "red";
        addr.style.borderColor = "red";
        city.style.borderColor = "red";
        state.style.borderColor = "red";
        zip.style.borderColor = "red";
        num.style.borderColor = "red";
        email.style.borderColor = "red";

    }
    // firstName
    if (fname.value === "") {
        Fn = 0;
        fname.style.borderColor = "red";
        error(e1);
    }
    else {
        Fn = 1;
        fname.style.borderColor = "rgba(3, 53, 144, 0.849)";
        success(e1);
    }


    // LastName
    if (lname.value === "") {
        lname.style.borderColor = "red";
        Ln = 0;
        error(e2);
    }
    else {
        Ln = 1;
        lname.style.borderColor = "rgba(3, 53, 144, 0.849)";
        success(e2);
    }
    // Address
    if (addr.value === "") {
        addr.style.borderColor = "red";
        Adr = 0;
        error(e3);
    }
    else {
        Adr = 1;
        addr.style.borderColor = "rgba(3, 53, 144, 0.849)";
        success(e3);
    }
    // city
    if (city.value === "") {
        city.style.borderColor = "red";
        cty = 0;
        error(e4);
    }
    else {
        city.style.borderColor = "rgba(3, 53, 144, 0.849)";
        cty = 1;
        success(e4);
    }

    // zipcode
    if (zipcode.value === "") {
        zip.style.borderColor = "red";
        zcode = 0;
        error(e6);
    }
    else if (zipcode.value.length < 6) {
        zip.style.borderColor = "red";
        zcode = 0;
        er(e6, "Please Enter Valid Zipcode");

    }
    else {
        zip.style.borderColor = "rgba(3, 53, 144, 0.849)";
        zcode = 1;
        success(e6);
    }
    // Phn Number
    if (num.value === "") {
        num.style.borderColor = "red";
        ph = 0;
        error(e7);
    }
    else {
        if (validateNum(num.value)) {
            num.style.borderColor = "rgba(3, 53, 144, 0.849)";
            ph = 1;
            success(e7);
        }
    }

    // Email 
    if (email.value === "") {
        email.style.borderColor = "red";
        eml = 0;
        error(e8);
    }
    else {
        if (validateMail(email.value)) {
            email.style.borderColor = "rgba(3, 53, 144, 0.849)";
            eml = 1;
            success(e8);
        }
        else {
            email.style.borderColor = "red";
            eml = 0;
            er(e8, "Please Enter Valid Mail")
        }
    }
    // state
    if (state.value == "") {
        state.style.borderColor = "red";
        st = 0;
        er(e5,"Please Select State")
        
    }
    else {
        document.getElementById("sto").style.transform="translateY(-25px)";
        state.style.borderColor = "rgba(3, 53, 144, 0.849)";
        e5.style.visibility = "hidden";
        st = 1;
    }

    // checking for errors
    if (Fn === 1 && Ln === 1 && st === 1 && Adr === 1 && cty === 1 && zcode === 1 && ph === 1 && eml === 1) {
        // radio buttons
        if (print.checked === true || txt.checked === true) {
            rd = 1;
            res = 1;
        }
        else {
            rd = 0;
            res = 0
            alert("please select Saving Card Deliver option");
        }
    }
    else
        res = 0;
    return res;
}





//external functions
function error(msg) {
    msg.style.visibility = "visible"
}
function success(msg) {
    msg.style.visibility = "hidden"
}
function hide(e1, e2, e3, e4, e5, e6, e7, e8) {
    e1.style.visibility = "hidden";
    e2.style.visibility = "hidden";
    e3.style.visibility = "hidden";
    e4.style.visibility = "hidden";
    e5.style.visibility = "hidden";
    e6.style.visibility = "hidden";
    e7.style.visibility = "hidden";
    e8.style.visibility = "hidden";
}
function er(ta, msg) {
    ta.innerHTML = '<i class="fas fa-exclamation-circle"></i>' + msg;
    ta.style.visibility = "visible";
}
// number validation
function validateNum(number) {
    var phoneno = /^\d{10}$/;
    if (number.length === 10) {
        if (number.match(phoneno)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        ph = 0;
        er(e7, "Number Length Must be 10");
    }
}
// Email Validation
function validateMail(mail) {
    var exp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(exp)) {
        return true;
    }
    else {
        return false;
    }

}
function sn(){
    document.getElementById("sto").style.transform="translateY(-25px)";
}
