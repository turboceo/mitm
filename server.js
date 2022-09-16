var express = require('express'); 
var app = express(); 
app.use(express.static('pyzl_home'));
app.listen(8080, () => {
    console.log('Express listen on port 8080')
})