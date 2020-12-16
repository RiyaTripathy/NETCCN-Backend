var express = require("express");
var request = require("request");
var https = require('https');
const oktapost = express();
var config = require('../config/config.json');
const fs = require('fs')
const IncomingForm = require('formidable').IncomingForm;
var bodyParser = require('body-parser');
const { Console } = require("console");
const { query } = require("express");
const { SERVFAIL } = require("dns");
var filename = ""


// parse application/x-www-form-urlencoded
oktapost.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
oktapost.use(bodyParser.json());


oktapost.post("/createUser",async function (req, res) {
   // var mrnnum = ""
    var MRN = await generateMRN()
    console.log(MRN)
    console.log(req.body);
    var url=config.url;
    var apikey=config.token;
    const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: url,
            token: apikey
        });
        //var data = req.body['profile'];
        firstName = req.body['firstName'],
        lastName = req.body['lastName'],
        email = req.body['email'],
        login = req.body['email'],
        city = req.body['city'],
        sex = req.body['gender'],
        dod_id = req.body['doid'],
        accountType = req.body['accountType'],
        DoB = req.body['dob'],
        LicenseNumber = req.body['LicenseNo'],
        LicenseState = req.body['LicenseState'],
        primaryPhone = req.body['phnNo'],
        state = req.body['state'],
        zipCode = req.body['zip'],
        postalAddress = req.body['address'],
        ProviderType = req.body['type']
        //console.log(MRN)
        //MRN = req.body['mrn']
    const newUser = {
        profile: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            login: login,
            city: city,
            sex: sex,
            dod_id: dod_id,
            accountType: accountType,
            DoB: DoB,
            LicenseNumber: LicenseNumber,
            LicenseState: LicenseState,
            primaryPhone: primaryPhone,
            state: state,
            zipCode: zipCode,
            postalAddress: postalAddress,
            ProviderType: ProviderType,
            MRN: MRN
        }
    }
    console.log(newUser);
    client.createUser(newUser)
    .then(user => res.send(user))
        .catch(err =>{
		console.log(err);
        res.send(false)}
    );
   
    })

    oktapost.get("/checkUser",function (req, res) {
        email= req.query.email;
        console.log(email);
        var url=config.url;
            var apikey=config.token;
            const okta = require('@okta/okta-sdk-nodejs');
                const client = new okta.Client({
                    orgUrl: url,
                    token: apikey
            });
              client.getUser(email)
                .then(user => {res.send(true)}
                )
                .catch(err => {
                    console.log(err);
                    res.send(false)
                });
        });
        


oktapost.get("/createMRN",async function (req, res) {
    var MRN = await generateMRN()
    res.send(MRN)
         
        })

        async function generateMRN()
        {
            var url=config.url;
            var apikey=config.token;
            const okta = require('@okta/okta-sdk-nodejs');
                const client = new okta.Client({
                    orgUrl: url,
                    token: apikey
                });
                var val ="";
                var searchquery = "";
                var status = "";
                var MRN = "";
                var mrn = "";
                var nm = await generateNum();
                function generateNum(){
                     val = Math.floor(10000 + Math.random() * 90000);
                
                status="check";
                var NETCCN = "NETCCN";
                MRN = NETCCN+val;
                console.log(MRN)
                var query = "profile.MRN eq ";
               searchquery = query +"\""+ MRN +"\""
               //searchquery = query +"\""+"NETCCN33620"+"\""
                }
                console.log(searchquery);
                var usr = await listusers();
                //var searchquery = query +"\""+"NETCCN00001"+"\""
                async function listusers(){
                    console.log("enters function block")
                    await client.listUsers({
                        search: searchquery
                      })
                      .each(user =>{
                          status="new";
                         console.log(status)
                        console.log(user['id'])
                        generateNum();
                       // searchquery='profile.MRN eq "NETCCN54565"'
                        listusers();      
                      })
                         
                     // .then(test=>{console.log(status);
                     
                         
                      
                   // });
                }  
                console.log(status);
                        if(status=="check"){
                            //res.send(MRN)
                            console.log('MRN GENERATED') 
                            console.log(MRN)
                            console.log("return statement")
                            return(MRN)
                          }
                          else{
                              console.log("false")
                             //return('MRN not generated')
                          }
                
                //console.log(status);
                
        }


module.exports = oktapost;
