let classList = document.querySelector(".class-list");
let performanceList = document.querySelector(".performance-list");

const fetchDropdownApi = async (url)=>{
    try{
        let res = await fetch(url);
        let data = await res.json();
        let classDropdown = data.classDropdown;
        classDropdown.map((element)=>{
            let option = document.createElement("option")
            let value = element.split(" ");
            option.value = value[1];
            // console.log("the fetched value is here... ",classList.value)
            option.appendChild( document.createTextNode(element));
            // console.log(document.createTextNode(element))
            classList.appendChild(option)
        })
        let performanceLevel = data.performanceLevel;
        performanceLevel.map((element)=>{
          let option = document.createElement("option")
          option.value = element;
          option.appendChild( document.createTextNode(element));
          performanceList.appendChild(option)
      })
    }
    catch(err){
        console.log(err);
    }
}

fetchDropdownApi("https://jsonblob.com/api/jsonBlob/922837073522868224");

const fetchClasses= async (url)=>{
  try{
    let res = await fetch(url);
    let data = await res.json();
    let classes = data.classes;
    let getReportBtn = document.querySelector(".getReportBtn");
    getReportBtn.addEventListener("click", () => getReportDetails(classes));
    return classes;
  }
  catch(err){
      console.log(err);
  }
}
fetchClasses("https://jsonblob.com/api/jsonBlob/922847334786940928");











function getReportDetails(classes){
    let selectedClass = classes.filter((ele) => ele.className == classList.value);
    if(selectedClass.length != 0){
        let filteredStudents = selectedClass[0].studentresults.filter((studentObj) => studentObj.peformanceLevel == performanceList.value);
        if(filteredStudents.length != 0){
            displayTable(filteredStudents);
        }else{
            displayTable(selectedClass[0].studentresults);
        }
    }
    else{
        let tableBody = document.querySelector(".table_body");
        tableBody.innerHTML="";
    }
    
}

const callingSorting = async () => {
  let classes = await fetchClasses("https://jsonblob.com/api/jsonBlob/922847334786940928");
  let selectedClass = classes.filter((ele) => ele.className == classList.value);
  if(selectedClass.length != 0){
      let filteredStudents = selectedClass[0].studentresults.filter((studentObj) => studentObj.peformanceLevel == performanceList.value);
      if(filteredStudents.length != 0){
          sortByname(filteredStudents)
      }else{
        sortByname(selectedClass[0].studentresults);
      }
      
  } 
}

document.getElementById("studentName").addEventListener("click", callingSorting)



    

//function to display table data
const displayTable = (tabelData)=>{
    let tableBody = document.querySelector(".table_body");
    tableBody.innerHTML="";
    tabelData.map((tableObj)=>{
        let tr = document.createElement("tr");
        tr.innerHTML=`<td style="">${tableObj.studentName}</td>
                        <td style="">${tableObj.rank}</td>
                        <td style="">${tableObj.completedPercent}<span class=${tableObj.peformanceLevel}></span> ${tableObj.peformanceLevel}</td>
                        <td style="">${tableObj.mid1Score}</td>
                        <td style="">${tableObj.mid2score}</td>
                        <td style="">${tableObj.finalscore}</td>`
        tableBody.appendChild(tr)
    })


    tabelData.map((tableObj)=>{
      let tr = document.createElement("tr");
      for(let ele in tableObj){
        if(ele != "completedPercent"){
          if(ele == "peformanceLevel"){
            let td = document.createElement("td");
            td.appendChild( document.createTextNode(tableObj.completedPercent));
            let icon = document.createElement("span");
            icon.innerHTML=`<i class="fas fa-circle"></i>`;
            if(tableObj[ele] == "Below-Level"){
              icon.className=("text-danger");
            }else if(tableObj[ele] == "On-Level"){
              icon.className=("text-warning ");
            }else{
              icon.className=("text-success");
            }
            
            td.appendChild(icon);
            td.appendChild( document.createTextNode(tableObj[ele]));
            tr.appendChild(td);
          }
          else{
            let td = document.createElement("td");
            td.innerHTML = `${tableObj[ele]}`;
            if(ele == "finalscore"){
              td.classList.add("visibility");
            }
            if(ele == "rank"){
              td.classList.add("invisibility");
            }
            tr.appendChild(td);
          }
        }
        tableBody.appendChild(tr)
      }

  })
    
}

// sorting by string
let ascending = true;
function sortByname(tableValues){
    let icon = document.querySelector(`.studentName-icon`);
    if(ascending){
        tableValues.sort((a, b) => {
            icon.innerHTML=`<i class="fas fa-arrow-up"></i>`;
            let fa = a.studentName.toLowerCase();
            let fb = b.studentName.toLowerCase();
            return(fa <= fb ? -1 : 1)
        });
        
        displayTable(tableValues);
        ascending = false;
    }
    else{
        tableValues.sort((a, b) => {
            icon.innerHTML=`<i class="fas fa-arrow-down"></i>`;
            let fa = a.studentName.toLowerCase();
            let fb = b.studentName.toLowerCase();
            return(fa < fb ? 1 : -1)
        });
        displayTable(tableValues);
        ascending = true;
    }
}


const mediaQuery = window.matchMedia('(max-width: 768px)')
function handleTabletChange(e) {
  if (e.matches) {
    let visible = document.querySelectorAll(".visibility")
    for(let i=0; i< visible.length;i++){
      visible[i].style.display = "none";
    }
    document.querySelector(".midscreen-icon").innerHTML = `<i class="fas fa-chevron-left tab-left-btn ms-3 bg-primary" style="cursor:pointer;" ></i> <i class="fas fa-chevron-right tab-right-btn ms-3 bg-primary" style="cursor:pointer;"></i>`;
    document.querySelector(".tab-right-btn").addEventListener("click", handleResponsivenessRight);
    document.querySelector(".tab-left-btn").addEventListener("click", handleResponsivenessLeft);
  }else{
    let visible = document.querySelectorAll(".visibility")
    for(let i=0; i< visible.length;i++){
      visible[i].style.display = "block"
    }
    document.querySelector(".midscreen-icon").innerHTML = "";
  }
}
let visible = true;
function handleResponsivenessRight(){
    let visible = document.querySelectorAll(".visibility")
    for(let i=0; i< visible.length;i++){
      visible[i].style.display = "block";
    }
    let invisible = document.querySelectorAll(".invisibility")
    for(let i=0; i< invisible.length;i++){
      invisible[i].style.display = "none";
    }
}

function handleResponsivenessLeft(){
  let visible = document.querySelectorAll(".visibility")
  for(let i=0; i< visible.length;i++){
    visible[i].style.display = "none";
  }
  let invisible = document.querySelectorAll(".invisibility")
  for(let i=0; i< invisible.length;i++){
    invisible[i].style.display = "block";
  }
}

mediaQuery.addListener(handleTabletChange)

handleTabletChange(mediaQuery)

