import {
    API_TOKEN,
    API_URL
} from '../Constants';
import axios from 'axios';

const defaultCatchCallback = err => {
    console.error(err)
}

const buildHeaders = () => {

    const headers = new Headers({
        'auth-key': API_TOKEN,
        'Content-Type': 'text/plain',//'application/json',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, auth-key',
        'Access-Control-Allow-Origin': 'http://localhost:8000'
    });
    return headers;
}

const generateUrl = relativeUrl => {
    return `${API_URL}${relativeUrl}`;
}

const generateRequest = (url, type, headers, payload) => {


    axios.get(url, {
            // headers:
            //     {
                    // 'AUTH-KEY': API_TOKEN,
                    // 'Accept': '*/*',
                    // 'Content-Type': 'text/plain',
                // }
        }
    ).then(function (response) {
        alert(response);
        console.log(response);
    })

    // console.log("headers", Array.from(headers.keys()));
    //
    // var myHeaders = new Headers({'auth-key': API_TOKEN,'Cache-Control': 'no-cache'});
    //
    // var myInit = { method: 'GET',
    //     credentials: 'include',
    //     headers: myHeaders,
    //     mode: 'cors'};
    //
    // return fetch(url, myInit).then(d => d.json())
    // //     , {
    // //     method: type,
    // //     headers: {
    // //         Accept: 'application/json',
    // //         'Content-Type': 'application/json',
    // //         'Access-Control-Allow-Origin': '*',
    // //         'auth-key': API_TOKEN,
    // //     }
    // // });

    // if (type === 'GET') {
    //     return new Request(url, {
    //         method: type,
    //         mode: 'no-cors',
    //         headers: headers,
    //     });
    // } else {
    //     return new Request(url, {
    //         method: type,
    //         mode: 'cors',
    //         headers: headers,
    //         body: JSON.stringify(payload)
    //     });
    // }
}

export {
    defaultCatchCallback,
    buildHeaders,
    generateUrl,
    generateRequest
};