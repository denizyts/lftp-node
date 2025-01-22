
const LftpWrapper = require('./LftpWrapper');


//WRITE lftp IF LFTP PATH IS AVAILABLE FROM NODE.
//domain , user , password , lftp_path , sslverifycertificate , port
myWrapper = new LftpWrapper('test.rebex.net', 'demo', 'password', '/opt/homebrew/bin/lftp', 'false' , 990);


//returns json.
myWrapper.ls('pub/example').then((result) => {
    console.log(result);
})

//First parameter is local_path , second parameter is remote path.
myWrapper.downloadFile('/Downloads' , 'pub/example/WinFormClient.png');

