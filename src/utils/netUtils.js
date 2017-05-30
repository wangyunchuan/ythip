const checkStatus = (response)=> {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

/**
 * 自定义Fetch
 */
const myFetch = (url, options)=> {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(options.method, url, true);
        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            }
            else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error("Network Error"));
        };
        //接口加密
        //let timeStamp = new Date().getTime();
        // let md5Param = Object.assign({}, options.body, {timeStamp: timeStamp, sign: md5(timeStamp)});
        req.send(options.body)
    })
};

export {checkStatus, myFetch}

