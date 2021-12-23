const request = require('request');
const geocode = (adress,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1Ijoic2F2aW5kdWhhcml0aDExMTEiLCJhIjoiY2t4YnVubmVkMHFsajJwdGh0d2FvMXRxbiJ9.mJHCbLVNJSGZ2bL3fnJ48w&limit=1';
    request({url , json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services',undefined);    
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search',undefined);
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location : response.body.features[0].place_name
            });
        }
    });
} 
module.exports = geocode;