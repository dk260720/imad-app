var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));
var articles ={
             'article-One' : {
               title: 'dinesh kumar |  feeling cool',
               heading: 'This is my article_one',
               date: 'june 4 95',
               content: `<p> C functions are used to avoid rewriting same logic/code again and again in a program.
              There is no limit in calling C functions to make use of same functionality wherever required.
              We can call functions any number of times in a program and from any place in a program.
              A large C program can easily be tracked when it is divided into functions.
              The core concept of C functions are, re-usability, dividing a big task into small pieces to achieve the functionality and to improve understandability of very large C programs.</p>`
               },
                'article-Two' : {
                   title: 'dinesh kumar |  feeling hot',
               heading: 'This is my article_two',
               date: 'june 5 95',
               content: `<p> C functions are used to avoid rewriting same logic/code again and again in a program.
               </p>`},
               'article-Three' : {title: 'dinesh kumar |  feeling hot',
               heading: 'This is my article_three',
               date: 'june 6 95',
               content: `<p> C functions are used to avoid rewriting same logic/code again and again in a program.
               </p>`}
};
function createTemplate (data)
          {
              var title= data.title;
          var date= data.date;
          var heading= data.heading;
          var content= data.content;
          var htmltemplate= 
          `<html>
    <head>
        <title> ${title}</title>
           <meta name="viewport" content="width=device-width, initial-scale=1" />
           <link href="/ui/style.css" rel="stylesheet" />
     </head>
            <body>
                <div class="container"><a href="/">Home</a>
                <hr/>
                <h> ${heading}</h>
                <div>${date}</div>
                <div>${content}</div>
           </div>
           </body>
    </html>`;
    return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName',function (req, res){
    articleName= rer.params.articleName;
    res.send(createTemplate(articles[articleName]));
});
app.get('/article-two',function (req, res){
    res.send('my first page in articles two');
});
app.get('/article-three',function (req, res){
    res.send('my first page in articles three');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
