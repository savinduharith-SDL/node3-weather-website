const request = require('request');
const forecast = (long,lat,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=bdecc41749f3deb97a26803af71fb1fa& query= '+encodeURIComponent(lat)+','+encodeURIComponent(long);
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to the weather api!',undefined);
        }else if(response.body.error){
            callback('Try entering valid values!',undefined);
        }
        else{
            callback(undefined,response.body.current);
        }
    })
}
module.exports = forecast;