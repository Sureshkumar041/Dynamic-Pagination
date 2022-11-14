var data = JSON.parse(localStorage.getItem("UserData"));
var actions = '<button class="btn btn-primary onClick="onEdit(this)">Edit</button> <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>';

data.forEach(element => {
    var content = document.getElementById("tbody");
    var newrow = content.insertRow();
    var i = 0;
    var cell = newrow.insertCell(0);
    cell.innerHTML = element.email;
    var cell = newrow.insertCell(1);
    cell.innerHTML = element.username;
    var cell = newrow.insertCell(2);
    cell.innerHTML = element.mobileno;
    var cell = newrow.insertCell(3);
    cell.innerHTML = '<button class="btn btn-primary" onclick="onEdit(this)">Edit</button> <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>';
});

var tbody = document.querySelector("tbody");
var row = tbody.querySelectorAll("tr");
var pagination = document.querySelector("#pagination");
var a;
index = 1;
array = [];
itemperpage = 2;

row.forEach(element => array.push(element));
console.log("Array data: ", array);

// 1st page data
displayData = (itemperpage) => {
    tbody.innerHTML = "";
    a = 0;
    array.forEach(element => {
        if (a < itemperpage) tbody.appendChild(element); a++;
    });
}
displayData(itemperpage);

// Dynamic Pagination
dynamicPage = () => {
    var rowlength = array.length;
    if (rowlength <= itemperpage) pagination.style.display = "none";
    else {
        var totalpage = Math.ceil(rowlength / itemperpage);
        for (let a = 1; a <= totalpage; a++) {
            var li = document.createElement("li");
            li.className = "list page-item";
            var anchor = document.createElement("a");
            anchor.href = "#";
            anchor.className = "page-link";
            anchor.innerHTML = a;
            anchor.setAttribute("value", a);
            li.appendChild(anchor);
            pagination.insertBefore(li, pagination.querySelector(".next"));
        }
    }
}
dynamicPage(itemperpage);

var pagelink = document.querySelectorAll("a");
var lastpage = pagelink.length -2;
pagelink[1].classList.add("active");
console.log("Lastpage: ",lastpage);
var pagehref = document.querySelectorAll(".list")

// Page Connecter 1 to another page
pageConnector=(pagelink,itemperpage,lastpage,pagehref)=>{
    var pagehref = pagination.querySelectorAll(".list");
    for(btn of pagelink){
        btn.onclick=e=>{
            var pageno = e.target.getAttribute("value");
            var id = e.target.getAttribute("id");
            if(pageno != null) index = pageno;
            else{
                if(id === "next"){
                    index++;
                    if(index >= lastpage) index = lastpage;
                }else{
                    index--;
                    if(index <= 1) index = 1;
                }
            }
            console.log("Index: ",index);
            console.log("Pageno: ",pageno);
            pageCreate(index,itemperpage,pagehref)
        };
    }
}
pageConnector(pagelink,itemperpage,lastpage,pagehref);

// Next Page data
pageCreate=(index,itemperpage,pagehref)=>{
    var start = index*itemperpage;
    var end = start+itemperpage;
    var currentpagedata = array.slice((start-itemperpage),(end-itemperpage));
    tbody.innerHTML ="";
    currentpagedata.forEach(element => {
        tbody.appendChild(element);
    }); 
    pagelink.forEach(e=>{
        e.classList.remove("active");
    })
    pagelink[index].classList.add("active");
}