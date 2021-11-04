'use strict'

function makeXHRJSONRequest(methodType, url) {
    if (typeof methodType === 'undefined' && typeof url === 'undefined') {
        return;
    }

    return new Promise(function(reslove, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(methodType, url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (this.status == 200) {
                reslove(xhr.response);
            } else {
                reject({status : this.status});
            }
        };
        xhr.onerror = function() {
            reject({status : this.status});
        };
        xhr.send();
    });
}

function getListOfUsers() {
    makeXHRJSONRequest('GET', 'https://615485ee2473940017efaed3.mockapi.io/assessment')
        .then(function(data) {
            var templateScript = Handlebars.compile(document.getElementById('user-detail').innerHTML);
            document.getElementById('user-data').innerHTML = templateScript({userDetails : data });
        })
        .catch(function(e) {
            console.error('request failed: ', e.status);
        });    
}

function handleBarsHelpers() {
    Handlebars.registerHelper("dateFormat", function(dateString) {
        let date = dateString ? new Date(dateString) : new Date(); //TODO: revisit if the date not present
        let dateFormat = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        return new Handlebars.SafeString(dateFormat);
    });
}

document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        handleBarsHelpers();
        getListOfUsers();
    }
}