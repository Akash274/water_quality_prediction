const express = require("express");
const router = express.Router();
const request = require("request-promise");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

router.post("/score",async (req, res) =>{
    // //res.send("Hello World");
    // //console.log("request served");
    // const options = {
    //     method:"POST",
    //     url: process.env.AUTH_URL,
    //     headers:{
    //         Accept:"application/json",
    //         "Content-Type":"application/x-www-form-urlencoded"
    //     },
    //     form:{
    //         apikey:process.env.WML_API_KEY,
    //         grant_type:"urn:ibm:parmas:oauth:grant-type:apikey"
    //     }
    // };
    // let access_token = "";
    // let response = "";
    // try{
    //     response = await request(options);
    //     access_token = JSON.parse(response)["access_token"];
    //     res.send(access_token);
    // }
    // catch(err){
    //     console.log(err);
    //     res.send(err);
    // }
// NOTE: you must manually enter your API_KEY below using information retrieved from your IBM Cloud
    function getToken(errorCallback, loadCallback) {
	    const req = new XMLHttpRequest();
	    req.addEventListener("load", loadCallback);
	    req.addEventListener("error", errorCallback);
	    req.open("POST", "https://iam.cloud.ibm.com/identity/token");
	    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    req.setRequestHeader("Accept", "application/json");
	    req.send("grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + process.env.WML_API_KEY);
    }

    function apiPost(scoring_url, token, payload, loadCallback, errorCallback){
	    const oReq = new XMLHttpRequest();
	    oReq.addEventListener("load", loadCallback);
	    oReq.addEventListener("error", errorCallback);
	    oReq.open("POST", scoring_url);
	    oReq.setRequestHeader("Accept", "application/json");
	    oReq.setRequestHeader("Authorization", "Bearer " + token);
	    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	    oReq.send(payload);
    }

    getToken((err) => console.log(err), function () {
	    let tokenResponse;
	    try {
		    tokenResponse = JSON.parse(this.responseText);
            console.log(tokenResponse["access_token"])
	    } catch(ex) {
		    // TODO: handle parsing exception
	    }
	// NOTE: manually define and pass the array(s) of values to be scored in the next line
	console.log("Req",req.body)
	const {pH,Hardness,Solids,Chloramines,Sulfate,Conductivity,Organic_carbon,Trihalomethanes,Turbidity} = req.body;
	const value = [pH,Hardness,Solids,Chloramines,Sulfate,Conductivity,Organic_carbon,Trihalomethanes,Turbidity];
	    const payload = '{"input_data": [{"fields": ["ph","Hardness","Solids","Chloramines","Sulfate","Conductivity","Organic_carbon","Trihalomethanes","Turbidity"], "values": [['+value+']]}]}';
	    const scoring_url = "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/798168a3-c688-4633-81e8-659b2b627be8/predictions?version=2022-12-04";
	    apiPost(scoring_url, tokenResponse.access_token, payload, function (resp) {
	    	let parsedPostResponse;
	    	try {
	    		parsedPostResponse = JSON.parse(this.responseText);
	    	} catch (ex) {
	    		// TODO: handle parsing exception
	    	}
	    	console.log("Scoring response");
			const pred =parsedPostResponse['predictions'];
			const pred1 = pred[0]
			const pred2 = pred1['values']
			const pred3 = pred2[0]
			// const response1 = this.responseText.prediction;
			// const response2 = response1.values;
			// const response3 = response2[0]
			console.log(pred2)			
            res.send(pred2)
	    }, function (error) {
	    	console.log(error);
	    });
});
});

module.exports = router;