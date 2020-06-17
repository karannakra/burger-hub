const https=require('https');
const url='https://jsonmock.hackerrank.com/api/countries?page='+1;
https.get(url, (resp) => {
    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        data=JSON.parse(data)
        let total=data.total
        i=0;
        while(i<total){
            const code="AF";
            if(data.data[i].alpha2Code==code){
                name=data.data[i].name
            }
        }
        p

    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});