/*
 *  Supports GET @ /vdpintrest
 */

var http = require('http');

exports.listing = function(req, res){
    var options = {
            host: 'services.cars.com',
            path: '/InventorySearchService/1.0/rest/inventory/listing',
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
                res.render('vdpintrest', { title: 'VDPintrest', name: 'Greg', xml: responseData, currentURL: '/vdpintrest' });
            });
    }).on('error', function(e) {
        console.log('problem with request: ' + e.message + ' sockets:' + apiReq.socketPath);
    });

    var requestData = '{"ListingDetailsRequest":{"listingIds":[107515846]}}';

    apiReq.write(requestData, 'utf8');
    apiReq.end();
};