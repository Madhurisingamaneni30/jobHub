let jobs=[];

let currentPage=1;

let perPage=6;

showSkeleton();


fetch(
"https://jsonplaceholder.typicode.com/users"
)


.then(response=>{


if(!response.ok){

throw Error();

}


return response.json();


})


.then(data=>{


jobs=data.map((item,index)=>{


return{


title:
[
"Frontend Developer",
"UI Designer",
"Java Developer"
][index%3],


company:
[
"Google",
"Microsoft",
"Amazon"
][index%3],


location:
[
"Remote",
"India",
"USA"
][index%3]


}


});


displayJobs();


})


.catch(()=>{


document.getElementById("jobs").innerHTML=

"Error loading jobs";


});







function displayJobs(){


let box=
document.getElementById("jobs");


box.innerHTML="";



let search=
document.getElementById("search").value.toLowerCase();



let location=
document.getElementById("location").value;



let company=
document.getElementById("company").value;



let filtered=
jobs.filter(job=>{


return (

job.title.toLowerCase()
.includes(search)

&&

(job.location==location || location=="")

&&

(job.company==company || company=="")


);


});





let start=
(currentPage-1)*perPage;



let result=
filtered.slice(start,start+perPage);





result.forEach(job=>{


box.innerHTML +=


`

<div class="job">


<h3>
${job.title}
</h3>


<p>
Company: ${job.company}
</p>


<p>
Location: ${job.location}
</p>


<button onclick="openForm('${job.title}')">

Apply Now

</button>


</div>


`;


});


document.getElementById("page").innerHTML=currentPage;


}





function nextPage(){


currentPage++;

displayJobs();


}




function previousPage(){


if(currentPage>1){

currentPage--;

}


displayJobs();


}





document
.getElementById("search")
.oninput=displayJobs;



document
.getElementById("location")
.onchange=displayJobs;



document
.getElementById("company")
.onchange=displayJobs;






document
.getElementById("darkMode")
.onclick=function(){


document.body.classList.toggle("dark");


localStorage.setItem(
"theme",
document.body.className
);


}




if(localStorage.getItem("theme")){


document.body.className=
localStorage.getItem("theme");


}

function openForm(job){


document.getElementById("applyBox")
.style.display="flex";


document.getElementById("jobName")
.innerHTML=

"Applying for: "+job;



}



function closeForm(){


document.getElementById("applyBox")
.style.display="none";


}



function submitApplication(){


let name =
document.getElementById("applicantName").value;


let email =
document.getElementById("applicantEmail").value;



if(name=="" || email==""){


alert("Please fill all details");


return;


}



alert(
"Application submitted successfully!"
);



closeForm();



}



let menuBtn =
document.getElementById("menuBtn");


let navMenu =
document.getElementById("navMenu");



menuBtn.onclick=function(){


navMenu.classList.toggle("show");


}

function showSkeleton(){


document.getElementById("jobs").innerHTML=


`

<div class="skeleton job"></div>

<div class="skeleton job"></div>

<div class="skeleton job"></div>


`;


}