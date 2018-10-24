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
  res.send('<html> \
    <head> \
        <title>Container Info</title> \
        <link rel="stylesheet" type="text/css" href="style/info.css"> \
    </head> \
    <body> \
        <div class="main"> \
           <h3>Pod Scaling v0.3</h3> \
           <span class="label">Host:</span><span class="value">' + hostname + '</span><br /> \
		   <span class="label">Running OS:</span><span class="value">' + platform + '</span><br /> \
		   <span class="label">Uptime:</span><span class="value">' + uptime + '</span><br /> \
		   <span class="label">Network Information:</span><span class="value">' + addresses + '</span><br /> \
		   <span class="label">DNS Servers:</span><span class="value">' + dnsServers + '</span><br /> \
		   <br /> \
		   <button onclick="myFunction()">Reload page</button>\
           \
		   <script> \
             function myFunction() { \
               location.reload(); \
             }\
           </script> \
		</div> \
    <body/> \
</html>');
});


var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var serverFS = app.listen(process.env.FAKE_SSL_PORT || 3000, function () {
  var host = serverFS.address().address;
  var port = serverFS.address().port;

  console.log('Example app also listening at http://%s:%s', host, port);
});