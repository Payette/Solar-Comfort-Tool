//Javascript URL Utility by Ayman Farhat
//http://www.thecodeship.com/web-development/javascript-url-object/


function urlObject(options) {
    "use strict";
    /*global window, document*/

    var url_search_arr,
        option_key,
        i,
        urlObj,
        get_param,
        key,
        val,
        url_query,
        url_get_params = {},
        a = document.createElement('a'),
        default_options = {
            'url': window.location.href,
            'unescape': true,
            'convert_num': true
        };

    if (typeof options !== "object") {
        options = default_options;
    } else {
        for (option_key in default_options) {
            if (default_options.hasOwnProperty(option_key)) {
                if (options[option_key] === undefined) {
                    options[option_key] = default_options[option_key];
                }
            }
        }
    }

    a.href = options.url;
    url_query = a.search.substring(1);
    url_search_arr = url_query.split('&');

    if (url_search_arr[0].length > 1) {
        for (i = 0; i < url_search_arr.length; i += 1) {
            get_param = url_search_arr[i].split("=");

            if (options.unescape) {
                key = decodeURI(get_param[0]);
                val = decodeURI(get_param[1]);
            } else {
                key = get_param[0];
                val = get_param[1];
            }

            if (options.convert_num) {
                if (val.match(/^\d+$/)) {
                    val = parseInt(val, 10);
                } else if (val.match(/^\d+\.\d+$/)) {
                    val = parseFloat(val);
                }
            }

            // if (url_get_params[key] === undefined) {
            //     url_get_params[key] = val;
            // } else if (typeof url_get_params[key] === "string") {
            //     url_get_params[key] = [url_get_params[key], val];
            // } else {
            //     url_get_params[key].push(val);
            // }
            if (url_get_params[key] === undefined) {
                url_get_params[key] = [val];
            } else {
                if (!Array.isArray(url_get_params[key])) {
                    url_get_params[key] = [url_get_params[key]];
                }
                url_get_params[key].push(val);
            }

            get_param = [];
            
        }
        
    }
    
    urlObj = {
        protocol: a.protocol,
        hostname: a.hostname,
        host: a.host,
        port: a.port,
        hash: a.hash.substr(1),
        pathname: a.pathname,
        search: a.search,
        parameters: url_get_params
    };

    console.log("??????",url_get_params);

    return urlObj;
}

// var testUrl = "https://payette.github.io/Solar-Comfort-Tool/?case1=show&case2=show&case3=hide&month=7&day=21&hour=12&timeStep=4&long=-71&lat=42&timeZone=-5&outdoorTemp=90.9&airTemp=76&humidity=60&airSpeed=10&cloting=0.5&metabolic=1.2&posture=seated&aveShortwave=0.7&windowOrientation=180&ceiling=12&gridHeight=3&wallDep=40&wallLen=30&wallR=15&windowHeight=7.0&sill=2.0&windowWidth=14&glzRatio=39&distanceWindows=12&windowU=0.35&solarHeatGainCo=0.35&horzShadeDep=1&horzShadeNum=0&horzShadeSpace=3&horzShadeDist=0&horzShadeHeight=0&horzShadeAngle=90&vertShadeDep=3&vertShadeNum=0&vertShadeSpace=3&vertShadeStart=L&vertShadeShift=0&vertShadeDist=0&vertShadeOn=on&vertShadeHeight=3&vertShadeScale=5&month=7&day=21&hour=12&timeStep=4&long=-71&lat=42&timeZone=-5&outdoorTemp=90.9&airTemp=71&humidity=60&airSpeed=10&cloting=0.5&metabolic=1.2&posture=seated&aveShortwave=0.7&windowOrientation=180&ceiling=12&gridHeight=3&wallDep=40&wallLen=30&wallR=15&windowHeight=7.0&sill=2.0&windowWidth=9&glzRatio=39&distanceWindows=12&windowU=0.35&solarHeatGainCo=0.35&horzShadeDep=1&horzShadeNum=0&horzShadeSpace=3&horzShadeDist=0&horzShadeHeight=0&horzShadeAngle=90&vertShadeDep=3&vertShadeNum=0&vertShadeSpace=3&vertShadeStart=L&vertShadeShift=0&vertShadeDist=0&vertShadeOn=on&vertShadeHeight=3&vertShadeScale=5";
// var result = urlObject({ url: testUrl });
// console.log(result);