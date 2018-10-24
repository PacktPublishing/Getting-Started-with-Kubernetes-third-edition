var express = require('express');
var os = require("os");
var dns = require("dns");

var app = express();
var hostname = os.hostname();
var platform = os.platform();
var uptime = os.uptime();
var interfaces = os.networkInterfaces();
var dnsServers = dns.getServers();

app.use(express.static('static'));

app.get('/', function (req, res) {
    var addresses = "";
	for (var i in interfaces) {
		for (var j in interfaces[i]) {
			if (i != "lo") {
				addresses += interfaces[i][j].address + ", ";			
			}
		}
	}
	addresses = addresses.substring( 0, addresses.length - 2 );
  res.send('<html> \n'+
'    <head> \n'+
'        <title>HTTP Whalesay</title> \n'+
'    </head> \n'+
'    <body> \n'+
'        <pre> \n'+
'		<code> \n'+
'     _____ \n'+
'    | ' + process.argv[2] + ' | \n'+
'     -----  \n'+
'            \\  \n'+
'             \\  \n'+
'                \\  \n'+
'                                            ##        . \n'+            
'                                ## ## ##       ==            \n'+
'                         ## ## ## ##      ===            \n'+
'                 /""""""""""""""""___/ ===        \n'+
'        ~~~ {~~ ~~~~ ~~~ ~~~~ ~~ ~ /  ===- ~~~   \n'+
'                 \\______ o          __/           \n'+ 
'                    \\    \\        __/             \n'+
'                        \\____\\______/ \n'+
'      </code> \n'+
'      </pre> \n'+
'    <body/> \n'+
'</html>\n');
});


var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});