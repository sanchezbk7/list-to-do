//Data 
var items;
let data = localStorage.getItem("TODO");//  Retrieve data
if(data){
    items=JSON.parse(data);
}
else{
    items=[];
}
console.log(items);
//variables
const list=document.getElementById('list');
const CHECK='fa-check-circle';
const UNCHECK='fa-circle-thin';
const LINETHROUGHT='lineThrought';
// Generating list to-do function
function render(){
    var html="";
    items.forEach(item=>{
        if(item.trash){return;}
        const DONE=item.done?CHECK:UNCHECK;
        const LINE=item.done?LINETHROUGHT:"";
        html+=`<li class="item ${item.id}" >
                <i class="fa ${DONE}" aria-hidden="true" job="complete"></i>
                <span class="text ${LINE}">${item.todo}</span>
                <i class="fa fa-trash-o" aria-hidden="true" job="delete"></i>
            </li>`;
    })
    list.innerHTML=html;
    console.log(html);
}

// Get value of input when enter key is pressed
var input=document.getElementById('input');
var toDo="";
input.onkeydown=function(event){
    if(event.keyCode==13){
        console.log(input.value);
        toDo=input.value;
        if(toDo){
            addToDo();
        }
        input.value="";
        localStorage.setItem("TODO", JSON.stringify(items));
        console.log(JSON.stringify(items));
    }
}
                   
//Add To-do item
function addToDo(){
    items.push(
        {
            id:items.length,
            todo:`${toDo}`,
            done:false,
            trash:false
        }
    );
    console.log(items);
    render();
}


//Refresh List To-do
const refreshElement=document.querySelector('.refresh');
refreshElement.onclick=function(){
    refreshElement.style.transform=`rotate(0deg)`;
    items.splice(0,items.length);
    localStorage.setItem("TODO", JSON.stringify(items));
    render();
}
refreshElement.onmousemove=function(){
    refreshElement.style.transform=`rotate(45deg)`;
}
refreshElement.onmouseout=function(){
    refreshElement.style.transform=`rotate(0deg)`;
}

//Show today's date
const options = {weekday : "long", month:"short", day:"numeric"};
const today=new Date();
let dateElement=document.getElementById('date');
dateElement.innerText=today.toLocaleDateString("en-US", options);

//Delete to do
function deleteToDo(element){
    
    element.parentElement.parentElement.removeChild(element.parentElement);
    items[element.parentElement.classList.value.slice(5)].trash=true;
    console.log(items);
}

//Complete to do
function completeToDo(element){
    element.classList.toggle('fa-circle-thin');
    element.classList.toggle('fa-check-circle');
    element.parentElement.querySelector('.text').classList.toggle('lineThrought');
    let elementId=element.parentElement.classList.value.slice(5);
    items[elementId].done = items[elementId].done ? false:true;
    console.log(items);  
}
// action when click check button or trash
list.addEventListener('click',function(event){
    const element=event.target; 
    const elementJob=element.attributes.job.value;
    if(elementJob=='delete'){
        deleteToDo(element);
    }
    else if(elementJob=='complete'){
        completeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(items));
});
window.onload=function(){
    render();
}
