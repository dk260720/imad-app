var button= document.getElementById('counter');

button.onclick= function () {
    var request = new XMLHttpRequest();

request.onReadystatechange  = function(){
      if(request.readyState ===XMLHttpRequest.Done) {
          if(request.status==200){
              var counter = request.responseText;
              var span= document.getElementById('count');
              span.innerHTML= counter.toString();
              
          }
      } 
    };
request.send('GET','http://dk260720.imad.hasura-app.io/counter', ture);
request.open(null);
    
};