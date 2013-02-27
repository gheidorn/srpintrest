/*
 *  Supports GET @ /srpintrest
 */

var http = require('http');

exports.search = function(req, res){

    console.log("firing search...");

    var options = {
            host: 'services.cars.com',
            path: '/InventorySearchService/1.0/rest/inventory/search',
            method: 'POST',
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17',
                'accept': 'application/JSON',
                'accept-charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
                'accept-encoding': 'gzip,deflate,sdch',
                'content-type': 'application/json'
            }
    };

    var responseData = '';
    var statusCode = 'defaultCode';
    var apiReq = http.request(options, function(apiRes) {
            statusCode = apiRes.statusCode;
            console.log('STATUS: ' + apiRes.statusCode);
            console.log('HEADERS: ' + JSON.stringify(apiRes.headers));
            apiRes.setEncoding('utf8');
            apiRes.on('data', function (chunk) {
                responseData += chunk;
            });
            apiRes.on('end', function() {
                console.log(responseData);
                res.setHeader("X-Greg", "Yeah it's me.");
                res.render('srpintrest', { title: 'SRPintrest', name: 'Greg', sr: JSON.parse(responseData), currentURL: '/srpintrest' });
            });
    }).on('error', function(e) {
        console.log('problem with request: ' + e.message + ' sockets:' + apiReq.socketPath);
    });

    var issRequestData = '{"SearchCriteriaBO": { "zc":60606, "rd":30, "stkTypId":28880, "mkId":[20021], "mdId":[21399], "requestorTrackingInfo":"Server Search", "rpp":50, "sf1Nm" : "price", "sf1Dir":"ASC"}}';
    //var issRequestData = '{"SearchCriteriaBO": { "zc":60606, "rd":30, "stkTypId":28880, "mkId":[20021], "mdId":[21399], "requestorTrackingInfo":"Server Search", "rpp":30, "sf1Nm" : "price", "sf1Dir":"ASC", "mlgId":[28864]}}';
    apiReq.write(issRequestData, 'utf-8');
    apiReq.end();
};