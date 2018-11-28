const express = require('express')
const app = express()
const Client = require('bitcoin-core');
const bodyParser  =require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const fs = require('fs');
const client = new Client({
    username: 'bitcoinN0deAccess',
    password: 'bitc0inRPCpass',
    port: 8332,
});
 
//   const client = new Client({ headers: true });
//  console.log( client.getInfo())
app.post('/getInfo', function (req, res) {
    client.getInfo();
    res.send(client.getInfo());
})
 
  app.post('/GetNewAddress',function(req,res){
    var accName=req.body.accountName;
    const batch = [
        { method: 'getNewAddress', parameters: [accName] }
    ]
   //  client.command(batch).then(([firstAddress, secondAddress]) => res.send(firstAddress, secondAddress));
   client.command(batch).then(([ error,address]) => {
    if(error){
    console.log(error+"error");
    res.send(error)
    }
    else{
        console.log(address);
        res.send(address)
    }

   });


       res.end("yes");
  });

  //get new address
  app.post('/test', (req, res) => {
      client.getNewAddress((err, Address) => {
          var account_name = req.body.account_name;

          return res.json({
              address: Address,
              Name: account_name
          }),
          console.log(account_name);
      })
  })

app.post('/getaccount', function (req, res) {
    var accountNo = req.query.accountNo;
    const batch = [
        { method: 'getaccount', params: [accountNo] }
    ]

    client.command(batch).then(([address, error]) => res.send(address));
});
app.post('/getaddressesbyaccount', function (req, res) {
    var accountNo = req.query.accountNo;
    const batch = [
        { method: 'getaddressesbyaccount', params: [accountNo] }
    ]

    client.command(batch).then(([address, error]) => res.send(address));
});
app.listen(3000, () => console.log("Server is running at http://localhost:3000"));

