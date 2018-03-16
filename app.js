var express=require('express');
var app =express();
var fs = require('fs')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});




function readText(pathname,callback) {
    var bin = fs.readFileSync(pathname);

    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }


    callback(bin.toString('utf-8'))
}
var questions=[
    {
        data:213,
        num:444,
        age:12
    },
    {
        data:456,
        num:678,
        age:13
    }];



//写个接口123
app.get('/123',function(req,res){
    res.status(200),
        res.json(questions)
});


app.post('/hbtxjw/scene/getSceneByUserId',(req,res)=>{
    readText('./workspaceScene.json',data=>{
        res.status(200);
        res.send(data)
    })
})

app.post('/hbtxjw/application/getApplicationList',(req,res)=>{
    console.log(req)
    readText('./getApplicationList.json',function(data){
        res.status(200)
        res.send(data)
    });
})


app.post('/hbtxjw/application/getApplicationByUserId',(req,res)=>{
    readText('./workspaceApplication.json',data=>{
        res.status(200)
        res.send(data)
    })
})

app.post('/hbtxjw/scene/getSceneList',(req,res)=>{

    readText("./getSceneList.json",data=>{
        res.status(200);
        res.send(data)
    })
})

app.post('/hbtxjw/search/getSearchList',(req,res)=>{
    readText('./searchList.json',data=>{
        res.status(200);
        res.send(data)
    })
})





//配置服务端口
var server = app.listen(3000, function () {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})