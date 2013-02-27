/*
 *  Supports GET @ /srpintrest
 */

var http = require('http');

exports.search = function(req, res){
    var gmsOptions = {
            host: 'services.cars.com',
            path: '/gms/1.0/rest/zone/60453',
            method: 'GET',
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'accept-charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
                'accept-encoding': 'gzip,deflate,sdch',
                'host': 'api.cars.com'
            }
    };

    var gmsResponseData = '';
    var gmsStatusCode = 'defaultCode';
    var gmsRequest = http.request(options, function(gmsResponse) {
            gmsStatusCode = gmsResponse.statusCode;
            console.log('STATUS: ' + gmsResponse.statusCode);
            console.log('HEADERS: ' + JSON.stringify(gmsResponse.headers));
            gmsResponse.setEncoding('utf8');
            gmsResponse.on('data', function (chunk) {
                gmsResponseData += chunk;
            });
            gmsResponse.on('end', function() {
                console.log(gmsResponseData);
                res.setHeader("X-Greg", "Yeah it's me.");
                res.render('srpintrest', { title: 'SRPintrest', name: 'Greg', xml: gmsResponseData, currentURL: '/srpintrest' });
            });
    }).on('error', function(e) {
        console.log('problem with request: ' + e.message + ' sockets:' + gmsRequest.socketPath);
    }).end();
};


var issRequestData = {"SearchCriteriaBO": { "zc":60606, "rd":30, "stkTypId":28880, "mkId":[20021], "mdId":[21399], "requestorTrackingInfo":"Server Search"}};