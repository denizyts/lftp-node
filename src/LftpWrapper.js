/*
@author denocan
*/

const { exec } = require('child_process');

class LftpWrapper {

    
    constructor(domain, user, password, lftp_path , sslverifycertificate, port ) {
        
        this.base_cmd = lftp_path + ' -e "set ssl:verify-certificate ' + sslverifycertificate + '; open ftps://' + user + ':' + password + '@' + domain + ':' + port +' ;';
        console.log("base cmd is : " + this.base_cmd);
        this.consoleOutPut = '';
    }

    
    //executes lftp commands.
    async connectExec(param_cmd) {
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
                this.consoleOutPut = stdout;
                resolve(stdout);
            });
        });
    }

    async ls(path) {
        var cmd = this.base_cmd + ' cd ' + path + '; ls ; bye"';
        console.log(cmd);
        var jsonArray = [];
        var totalArray = [];
        await this.connectExec(cmd);
        //console.log(a);
        var lines = this.consoleOutPut.split('\n');
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
    async downloadFile(local_path , remote_path) {         //if local target path is not given it will download it directory of nodejs file.
  
    var cmd = this.base_cmd + ' get ' + remote_path + ' ' + local_path + '; bye"';
    console.log(cmd);
    await this.connectExec(cmd);
    return a;
  }
  
    async uploadFile(local_path, remote_path) {
      
    var cmd = this.base_cmd + ' put ' + local_path + ' -o ' + remote_path + '; bye"';
    console.log(cmd);
    await this.connectExec(cmd);
    return a;
  }


}



module.exports = LftpWrapper;