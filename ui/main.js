var button= document.getElementById('counter');

button.onclick= function () {
    var request = new XMLHttpRequest();

request.onreadystatechange  = function(){
      if(request.readyState ===XMLHttpRequest.DONE) {
          if(request.status===200){
              var counter = request.responseText;
              var span= document.getElementById('count');
              span.innerHTML= counter.toString();
              
          }
      } 
    };
request.open('GET','http://dk260720.imad.hasura-app.io/counter', true);
request.send(null);
    
};

var nameinput= document.getElementById('name');
var name= nameinput.value;
var submit= document.getElementById('submit');
submit.onclick= function(){
var names=['name1','name2','name3','name4'];
var list='';
for(i=0;i<=names.length;i++)
{
  list+='<li>' + names[i] + '</li>';
}
var ul=document.getElementById('namelist');
ul.innerHTML=list;
};