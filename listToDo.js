// const test=document.querySelector('.test');
// test.addEventListener('click',()=>{
//     console.log(parseInt(window.getComputedStyle(test).getPropertyValue('top')));
//     test.style.top=`${parseInt(window.getComputedStyle(test).getPropertyValue('top'))+42}px`;
// });
//Data 
var items;
let countCompleted=0;
let data = localStorage.getItem("TODO");//  Retrieve data
if(data){
    items=JSON.parse(data); 
    items.forEach((item)=>{
        if(item.done&&!item.trash){
            countCompleted++;
        }
    });
}
else{
    items=[];
}

//variables
const list=document.getElementById('list');
const completedList=document.getElementById('completedList');
const completed=document.querySelector('.completed');
const CHECK='fa-check-circle';
const UNCHECK='fa-circle-thin';
const LINETHROUGHT='lineThrought';
// Generating list to-do function
function render(){
    var html="";
    let countDone=0;
    items.forEach(item=>{
    if(item.trash){return;}
    const DONE=item.done?CHECK:UNCHECK;
    const LINE=item.done?LINETHROUGHT:"";
    if(item.done&&!countDone==1){
        countDone++;
        html+=`
        <div class="completed">
            <i class="fa fa-chevron-down" aria-hidden="true"></i>
            <span>Completed ${countCompleted}</span>
        </div>
        `;
    }
    html+=`<li class="item ${item.id}" >
        <i class="fa ${DONE}" aria-hidden="true" job="complete"></i>
        <span class="text ${LINE}">${item.todo}</span>
        <i class="fa fa-trash-o" aria-hidden="true" job="delete"></i>
    </li>`;
    });
    list.innerHTML=html;
    nodelist=document.querySelectorAll('.item'); 
    console.log(items);
}

// Get value of input when enter key is pressed
var input=document.getElementById('input');
const plusElement = document.querySelector('.fa-plus-circle');
var toDo="";
//add item by plus button
plusElement.addEventListener('click',()=>{
    toDo=input.value;
    if(toDo){
        addToDo();
    }
    input.value="";
    localStorage.setItem("TODO", JSON.stringify(items));
    //console.log(JSON.stringify(items));
});
// add to item by enter key
input.onkeydown=function(event){
    if(event.keyCode==13){
        toDo=input.value;
        if(toDo){
            addToDo();
        }
        input.value="";
        localStorage.setItem("TODO", JSON.stringify(items));
        //console.log(JSON.stringify(items));
    }
}
                   
//Add To-do item
function addToDo(){ 
        items.unshift(
            {
                id:items.length,
                origin:items.length,
                todo:`${toDo}`,
                done:false, 
                trash:false
            }
        );
        for(let i=0;i<items.length;i++){
            items[i].id=i;
        }
    render(); 
}


//Refresh List To-do
const alertBox=document.querySelector('.alertBox');
const yesConfirm=document.querySelector('.yes');
const noConfirm=document.querySelector('.no');
const close=document.querySelector('.fa-times');
const refreshElement=document.querySelector('.refresh');
close.addEventListener('click',()=>{
    alertBox.style.display='none';
})
refreshElement.onclick=function(){
    refreshElement.style.transform=`rotate(0deg)`;
    alertBox.style.display='block'; 
    alertBox.classList.remove('close');
    alertBox.classList.add('open'); 
     
}
yesConfirm.addEventListener('click',()=>{
    alertBox.style.display='none';
    items.splice(0,items.length);
    countCompleted=0;
    updateCountCompleted();
    localStorage.setItem("TODO", JSON.stringify(items));
    render();
})
noConfirm.addEventListener('click',()=>{
    alertBox.classList.remove('open');
    alertBox.classList.toggle('close');
    
})
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
function deleteToDo(element,id){
    element.parentElement.parentElement.removeChild(element.parentElement);
    
    if(items[element.parentElement.classList.value.slice(5)].done){
        countCompleted--;
        updateCountCompleted();
    }   
    items.splice(element.parentElement.classList.value.slice(5),1);
    for(let i=0;i<items.length;i++){
        items[i].id=i;
    }
}
// check or uncheck
function check(element){
    if(element.tagName=='I'){
        element.classList.toggle('fa-circle-thin');
        element.classList.toggle('fa-check-circle');
        element.parentElement.querySelector('.text').classList.toggle('lineThrought');
    }
    else if(element.tagName=='SPAN'){
        element.classList.toggle('lineThrought');
        element.parentElement.querySelector('.fa').classList.toggle('fa-circle-thin');
        element.parentElement.querySelector('.fa').classList.toggle('fa-check-circle');
    }
    let elementId=element.parentElement.classList.value.slice(5);
    items[elementId].done = items[elementId].done ? false:true;
}
    //Complete to do
function completeToDo(element,id){
    console.log(window.getComputedStyle(element.parentElement).getPropertyValue('top'));      
    check(element);
    countCompleted++;
    if(countCompleted==1){
        //render();    
    }
    console.log(`id=${id}`);
    items.forEach((item)=>{
        if(item.id>id&&item.done==false){
            
            nodelist[item.id].style.top=
            `${parseInt(window.getComputedStyle(nodelist[item.id]).getPropertyValue('top'))-42}px`;
            //nodelist[item.id].cla sList.remove(`${item.id}`);
            //nodelist[item.id].classList.add(`${item.id-1}`);
            item.id--;  
            
        }
        else if(item.id==id){
            console.log(parseInt(window.getComputedStyle(nodelist[id]).getPropertyValue('top')));
            const distance=items.length+1-id-countCompleted;
            console.log(`distance=${distance}`);
            nodelist[id].style.top=
            `${parseInt(window.getComputedStyle(nodelist[id]).getPropertyValue('top'))+distance*42}px`;
            // nodelist[item.id].classList.remove(`${item.id}`);
            // nodelist[item.id].classList.add(`${distance}`);
            item.id=items.length-countCompleted;
            console.log(parseInt(window.getComputedStyle(nodelist[id]).getPropertyValue('top')));
        }
        else{
            return;
        }
    });
    //element.parentElement.style.transform=`translateY(${(items.length-id+countCompleted)*42}px)`;
    // list.style.transform=`translateY(${-countCompleted*42}px)`;
    completed.style.top=
    `${parseInt(window.getComputedStyle(completed).getPropertyValue('top'))-42}px`;
    //console.log(completed);
    updateCountCompleted();
    items.sort((a,b)=>{
        return a.id-b.id;
    });
    for(let i=0;i<items.length;i++){
        items[i].id=i;
    }
    window.setTimeout(render,500);
    
}
// re-complete to do
function recomplete(element,id){
    check(element);
    console.log(id);    
    countCompleted--;
    let back=0;
    for(let i=0;i<items.length;i++){
        if(!items[i].done){
            back++;
        }
        else{
            break;
        }
    }
    items.forEach((item)=>{
        if(item.id<id&&item.done&&countCompleted){
            nodelist[item.id].style.top=
            `${parseInt(window.getComputedStyle(nodelist[item.id]).getPropertyValue('top'))+42}px`;
            item.id++;  
        }
        else if(item.id==id){
            // nodelist[id].style.top=
            // `${parseInt(window.getComputedStyle(nodelist[id]).getPropertyValue('top'))+back*42}px`;
             item.id=back;
        }
    });
    completed.style.top=
    `${parseInt(window.getComputedStyle(completed).getPropertyValue('top'))+42}px`;
    items.sort((a,b)=>a.id-b.id);
    if(back>0){
        let temp=items.slice(0,back+1).sort((a,b)=>b.origin-a.origin);
    items=temp.concat(items.slice(back+1));
    }
    for(let i=0;i<items.length;i++){
        items[i].id=i;
    }
    updateCountCompleted();
    //completedList.removeChild(element.parentElement);
    //list.appendChild(element.parentElement);
    window.setTimeout(render,500);
}
// action when click each item
list.addEventListener('click',(event)=>{
    action(event);
});
// completedList.addEventListener('click',(event)=>{
//     action(event);
// });

const chevrondown=document.querySelector('.fa-chevron-down');
function action(event){
    const element=event.target; 
    if(event.target.tagName=='DIV'){
        //hideCompleted();
        return 1;
    }
    const id=items[event.target.parentElement.classList.value.slice(5)].id;
    const elementJob=element.attributes.job ? element.attributes.job.value:event.target.tagName;
    if(elementJob=='delete'){
        deleteToDo(element,id);
    }
    else if(elementJob=='complete'||elementJob=='SPAN'){
        if(items[id].done){
            recomplete(element,id);
        }
        else{
            completeToDo(element,id);
        }
    }
    localStorage.setItem("TODO", JSON.stringify(items));
}
let nodelist;
window.onload=function(){
    render();
    updateCountCompleted(); 
}


// initial completed list
function updateCountCompleted(){
    if(countCompleted>0){
        //completed.style.display="block";
        completed.innerText=`Completed ${countCompleted}`;
    }
    else{
        //completed.style.display="none"; 
        completed.innerText=`Completed`;
    }
}
function hideCompleted(){
    console.log(chevrondown)
    console.log(window.getComputedStyle(chevrondown).getPropertyValue('top'));
    if(window.getComputedStyle(chevrondown).getPropertyValue('transform')=='matrix(6.12323e-17, -1, 1, 6.12323e-17, 0, 0)'){
        chevrondown.style.transform="rotate(0deg)";  
        chevrondown.innerText="rotate(0deg)";
    }
    else{
        chevrondown.style.transform="rotate(-90deg)";
        chevrondown.innerText="rotate(-90deg)";
    } 
}
