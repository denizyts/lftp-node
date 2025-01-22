const { exec } = require('child_process');
const path = require('path');
const os = require('os');


//https://www.smartftp.com/en-us/support/kb/2779
//THIS LINK FOR FTP TEST SERVERS.

var basic_cmd = '/opt/homebrew/bin/lftp -e "set ssl:verify-certificate false; open ftps://demo:password@test.rebex.net:990 ;';


var command = '/opt/homebrew/bin/lftp -e "set ssl:verify-certificate false; open ftps://denocan:123@localhost; ls ; bye"';
//command = '/opt/homebrew/bin/lftp -e "set ssl:verify-certificate false; open ftps://denocan:123@localhost; cd deneme; ls;bye"';
command = '/opt/homebrew/bin/lftp -e "set ssl:verify-certificate false; open ftps://demo:password@test.rebex.net ; ls ; bye"';

command = '/opt/homebrew/bin/lftp -e "set ssl:verify-certificate false; open ftps://demo:password@test.rebex.net ; cd pub ; cd example;ls ; bye"';

command = '/opt/homebrew/bin/lftp -u demo,password -e "set ftp:ssl-force true; set ssl:verify-certificate true ;set ftp:ssl-protect-data true; set ftp:ssl-allow true; connect ftps://test.rebex.net; ls; bye"'


let a;

async function connectExec(param_cmd) {
  return new Promise((resolve, reject) => {
    exec(param_cmd, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      //console.log(`stdout: ${stdout}`);
      a = stdout;
      resolve(stdout);
    });
  });
}

async function ls(path) {
  var cmd = basic_cmd + ' cd ' + path + '; ls ; bye"';
  //cmd = command; //for testing implicit
  console.log(cmd);
  var jsonArray = [];
  var totalArray = [];
  await connectExec(cmd);
  //console.log(a);
  var lines = a.split('\n');
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].length > 0) {
      var line = lines[i].split(/\s+/);
      var jsonObject = {
        permissions: line[0],
        number: line[1],
        owner: line[2],
        group: line[3],
        size: line[4],
        month: line[5],
        day: line[6],
        timeOrYear: line[7],
        name: line.slice(8).join(' ')
      };
      jsonArray.push(jsonObject);
    }
  }

  totalArray = jsonArray;
  //console.log(totalArray);

  return totalArray;
}

//path must include file name. 
async function downloadFile(local_path , remote_path) {         //if local target path is not given it will download it directory of nodejs file.
  
  var cmd = basic_cmd + ' get ' + remote_path + ' ' + local_path + '; bye"';
  console.log(cmd);
  await connectExec(cmd);
  return a;
}

async function uploadFile(local_path, remote_path) {
    
  var cmd = basic_cmd + ' put ' + local_path + ' -o ' + remote_path + '; bye"';
  console.log(cmd);
  await connectExec(cmd);
  return a;
}


ls('pub/example').then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});    

//downloadFile('subFolderTest' , 'pub/example/WinFormClient.png');
//downloadFile('/Downloads' , 'pub/example/WinFormClient.png');
//downloadFile('/Downloads' , 'pub/example/WinFormClient.png');


//uploadFile('/Desktop/sendThis.txt' , 'pub/example');



