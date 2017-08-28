var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var config= {
    user: 'dk260720',
    database: 'dk260720',
    port: '5432',
    host: 'db.imad.hasura-app.io',
    Password: process.evn.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));
 var names=[];
    app.get('/submitname',function(req, res){
        var name=req.query.name;
        names.push(name);
        res.send(JSON.stringify(names));
    });
var counter=0;
app.get('/counter',function(req, res){
    counter=counter+1;
    res.send(counter.toString());
    });
   
var articles = {
             'article-one' : {
               title: 'dinesh kumar |  feeling cool',
               heading: 'This is my article_one',
               date: 'june 4 95',
               content: `<p> C functions are used to avoid rewriting same logic/code again and again in a program.
              There is no limit in calling C functions to make use of same functionality wherever required.
              We can call functions any number of times in a program and from any place in a program.
              A large C program can easily be tracked when it is divided into functions.
              The core concept of C functions are, re-usability, dividing a big task into small pieces to achieve the functionality and to improve understandability of very large C programs.</p>`
               },
                'article-two' : {
                   title: 'dinesh kumar |  feeling hot',
               heading: 'This is my article_two',
               date: 'june 5 95',
               content: `<p> C functions are used to avoid rewriting same logic/code again and again in a program.
               </p>`},
               'article-three' : {title: 'dinesh kumar |  feeling hot',
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
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var pool= new pool(config);
app.get('/test-db',function (req, res)
{
    pool.query('SELECT * FROM test_piece', function(err, result)
    {
        if (err)
        {
            res.status(500).send(err.tostring());
        }else
        {
            res.send(JSON.stringfy(result));
        }
    });
});

app.get('/article/:articleName',function (req, res){
    pool.query("SELECT * FROM article WHERE title='" + req.params.articleName + "'", function(err, result)
    {
        if (err)
        {
            res.status(500).send(err.toString());
        }else
        {
            if(result.rows.length===0)
            {
                res.status(404).send ('Article not found');
            }else
            {
                var articleData= result.rows[0];
               res.send(createTemplate(articles[articleData]));
            }
        }
    });
    
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
