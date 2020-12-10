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


oktapost.post("/createUser",function (req, res) {
    console.log(req.body);
    var url=config.url;
    var apikey=config.token;
    const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: url,
            token: apikey
        });
        //var data = req.body['profile'];
        //var credentials = req.body['credentials'];
        firstName = req.body['firstName'],
        lastName = req.body['lastName'],
        email = req.body['email'],
        login = req.body['email'],
        city = req.body['city'],
        sex = req.body['sex'],
        dod_id = req.body['dod_id'],
        accountType = req.body['accountType'],
        DoB = req.body['DoB'],
        LicenseNumber = req.body['LicenseNumber'],
        LicenseState = req.body['LicenseState'],
        primaryPhone = req.body['primaryPhone'],
        user_state = req.body['user_state'],
        user_type = req.body['user_type'],
        streetAddress = req.body['streetAddress'],
        ProviderType = req.body['ProviderType'],
        password = req.body['password']
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
            DoB: login,
            LicenseNumber: LicenseNumber,
            LicenseState: LicenseState,
            primaryPhone: primaryPhone,
            user_state: user_state,
            user_type: user_type,
            streetAddress: streetAddress,
            ProviderType: ProviderType,
        },
        credentials: 
        { 
            password :
            {
                value : password
            }
        }
    }
    console.log(newUser);
    client.createUser(newUser, {
        activate: false
      })
    .then(user => 
        {
            var userid=user['id'];
            client.activateUser(userid, {
                sendEmail: true
              })
              .then(user1 =>res.send(true) )

    })
        .catch(err =>{
		console.log(err);
        res.send(false)
        
        });
    })


oktapost.get("/createMRN",function (req, res) {
    console.log(req.body);
    var url=config.url;
    var apikey=config.token;
    const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: url,
            token: apikey
        });
        var val ="";
        generateNum();
        function generateNum(){
             val = Math.floor(10000 + Math.random() * 90000);
        }
        var MRN = "";
        var status="check";
        var NETCCN = "NETCCN";
        var MRN = NETCCN+val;
        var query = "profile.MRN eq "
       var searchquery = query +"\""+ MRN +"\""
        //var searchquery = query +"\""+"NETCCN00001"+"\""
         client.listUsers({
            search: searchquery
          })
          .each(user =>{
              status="new";
             // console.log(status)
            //console.log(user['id'])
            generateNum();     
                
          })
         
          
          .then(test=>{console.log(status);
          if(status=="check"){
            res.send(MRN) 
          }
          else{
              console.log("false")
          }
        });
         
        })

module.exports = oktapost;