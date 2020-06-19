
let curState= document.getElementById("curState") ;
let addBtn = document.getElementById("add")
let taskName =document.getElementById("task") ;

let tagJson ;
let doneTagJson ;
let list=[] ;
let doneList=[] ;



if ($.parseJSON( localStorage.getItem("unDoneList") ) != null && $.parseJSON( localStorage.getItem("unDoneList") ) != []){
   list=$.parseJSON(localStorage.getItem("unDoneList") )
   for(i=0 ;i<list.length;i++){
       let name =list[i]["task"] ;
        $('#unDoneList').append(`<li>${name}</li>`)   
    }
}

if ($.parseJSON(localStorage.getItem("doneList") ) != null && $.parseJSON( localStorage.getItem("doneList") ) != [] ){

    doneList=$.parseJSON( localStorage.getItem("doneList") )
    for(i=0 ;i<doneList.length;i++){
        let name =doneList[i]["task"] ;
        $('#doneList').append(`<li>${name}</li>`)   
    }    
   }
   function search(tagName, list){
    for (let i=0; i < list.length; i++) {
        if (list[i]["task"] === tagName) {
            return false;
        }
    } return true ;
} 
addBtn.addEventListener('click',function(){
    let fname=taskName.value ;
    let tagName = `${fname}<button class="done">Done</button><button class="del">X</button>`
    let doneTagName = `${fname}<button class="done">unDone</button><button class="del">X</button>`
    
    if( fname !="" && search(tagName, list) && search(doneTagName, doneList)){
        list.push({ task : tagName})
        tagJson = JSON.stringify(list) ;
        localStorage.setItem("unDoneList",tagJson)
        $('#unDoneList').append(`<li>${tagName}</li>`) 
    }
    taskName.value=""
    console.log(taskName.value)
})

$('#unDoneList').on('click','.del',function(index){
    for(i=0;i< list.length ; i++){
        if( list[i]["task"] === $(this).parent().html() ){
            list.splice( i, 1)
        }
    }
    tagJson = JSON.stringify(list) ;
    localStorage.setItem("unDoneList",tagJson)
    $(this).parent().remove() ;
})

$('#doneList').on('click','.del',function(index){
    for(i=0;i< doneList.length ; i++){
        console.log($(this).parent().html())
        if( doneList[i]["task"] === $(this).parent().html() ){
            console.log("a")
            doneList.splice( i, 1)
        }
    }
    doneTagJson = JSON.stringify(doneList) ;
    localStorage.setItem("doneList",doneTagJson)
    $(this).parent().remove() ;
})


$('#unDoneList').on('click','.done',function(index){
    let liItem = $(this).parent() ;
    for(i=0;i< list.length ; i++){
        if( list[i]["task"] === liItem.html() ){
            list.splice( i, 1)
        }
    }
    tagJson = JSON.stringify(list) ;
    localStorage.setItem("unDoneList",tagJson)

    $(this).text("unDone") ;
    doneList.push({ task : $(this).parent().html()})
    doneTagJson = JSON.stringify(doneList) ;
    localStorage.setItem("doneList",doneTagJson) 
    
    
    $('#doneList').append(`<li>${$(this).parent().html()}</li>`)
    liItem.remove() ;
    
})

$('#doneList').on('click','.done',function(index){
    let liItem = $(this).parent() ;
    for(i=0;i< doneList.length ; i++){
        if( doneList[i]["task"] === liItem.html() ){
            doneList.splice( i, 1)
        }
    }
    doneTagJson = JSON.stringify(doneList) ;
    localStorage.setItem("doneList",doneTagJson)

    $(this).text("Done") ;
    list.push({ task : $(this).parent().html()})
    tagJson = JSON.stringify(list) ;
    localStorage.setItem("unDoneList",tagJson) 
    
    
    $('#unDoneList').append(`<li>${$(this).parent().html()}</li>`)
    liItem.remove() ;
    
})
