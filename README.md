
  # FTP Module for Node.js
  
  **Motivation:**
  Because of some issues, restrictions of existing modules related with 
  ftp, ftps connections this lftp wrapper node module implemented.

  
## Installation

You can install with 
~~~javascript  
  npm i lftp-node
~~~  
  
## lftp installation

For Ubuntu/Debian
~~~javascript  
  sudo apt install lftp
~~~  
For Red Hat/CentOS/Fedora-based
~~~javascript  
  sudo yum install lftp
~~~ 
For Macos
~~~javascript  
  brew install lftp
~~~ 


## How to test
 Ofcourse you can use any server you wish Also 
 You can connect a FTP server for experimental testing FileZilla Server is a good choice 

  https://filezilla-project.org/download.php?platform=win64&type=server

 Also there are some test servers, You can choose one which fits with your needs.

  https://www.smartftp.com/en-us/support/kb/2779


 

## Usage and Features

The LftpWrapper class sends exec commands. You can create an instance,
index.js shows how to use the LftpWrapper. 


This line parameters are domain, user, password, local path of lftp, ssl verify certificate, port number
~~~javascript  
  myWrapper = new LftpWrapper('test.rebex.net', 'demo', 'password', '/opt/homebrew/bin/lftp', 'false' , 990);
~~~  

For implicit connection general port is 990

For explicit connection general port is 21

If the server is self certificate there are lftp commands which you indicate certificate and private key path.

For more information: https://lftp.yar.ru/lftp-man.html

**ls function** by giving the path which you want to see the files in it you can get all files list in a json format. At the test server there is a path contains many files.

~~~javascript  
  myWrapper.ls('pub/example').then((result) => {
    console.log(result);
})
~~~  

**Here is the json values**:

~~~javascript  

[
  {
    permissions: '-r--------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '19156',
    month: 'Feb',
    day: '16',
    timeOrYear: '2007',
    name: 'imap-console-client.png'
  },
  {
    permissions: '-rw-------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '36672',
    month: 'Mar',
    day: '19',
    timeOrYear: '2007',
    name: 'KeyGenerator.png'
  },
  {
    permissions: '-rw-------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '24029',
    month: 'Mar',
    day: '19',
    timeOrYear: '2007',
    name: 'KeyGeneratorSmall.png'
  },
  {
    permissions: '-r--------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '16471',
    month: 'Feb',
    day: '16',
    timeOrYear: '2007',
    name: 'mail-editor.png'
  },
  {
    permissions: '-r--------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '35414',
    month: 'Feb',
    day: '16',
    timeOrYear: '2007',
    name: 'mail-send-winforms.png'
  },
  {
    permissions: '-r--------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '49011',
    month: 'Feb',
    day: '16',
    timeOrYear: '2007',
    name: 'mime-explorer.png'
  },
  {
    permissions: '-rw-------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '58024',
    month: 'Mar',
    day: '19',
    timeOrYear: '2007',
    name: 'pocketftp.png'
  },
  {
    permissions: '-rw-------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '20197',
    month: 'Mar',
    day: '19',
    timeOrYear: '2007',
    name: 'pocketftpSmall.png'
  },
  {
    permissions: '-r--------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '20472',
    month: 'Feb',
    day: '16',
    timeOrYear: '2007',
    name: 'pop3-browser.png'
  },
  {
    permissions: '-r--------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '11205',
    month: 'Feb',
    day: '16',
    timeOrYear: '2007',
    name: 'pop3-console-client.png'
  },
  {
    permissions: '-rw-------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '379',
    month: 'Sep',
    day: '19',
    timeOrYear: '2023',
    name: 'readme.txt'
  },
  {
    permissions: '-rw-------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '11546',
    month: 'Mar',
    day: '19',
    timeOrYear: '2007',
    name: 'ResumableTransfer.png'
  },
  {
    permissions: '-rw-------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '2635',
    month: 'Mar',
    day: '19',
    timeOrYear: '2007',
    name: 'winceclient.png'
  },
  {
    permissions: '-rw-------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '6146',
    month: 'Mar',
    day: '19',
    timeOrYear: '2007',
    name: 'winceclientSmall.png'
  },
  {
    permissions: '-rw-------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '80000',
    month: 'Mar',
    day: '19',
    timeOrYear: '2007',
    name: 'WinFormClient.png'
  },
  {
    permissions: '-rw-------',
    number: '1',
    owner: 'demo',
    group: 'users',
    size: '17911',
    month: 'Mar',
    day: '19',
    timeOrYear: '2007',
    name: 'WinFormClientSmall.png'
  }
]

~~~  

**download function** by giving local and remote path as parameters you can download file you wish for. The downloaded png file is visible at repository.

~~~javascript  
 myWrapper.downloadFile('/Downloads' , 'pub/example/WinFormClient.png');
~~~  

**upload function** by giving local and remote path as parameters you can upload file you wish for.

~~~javascript  
 myWrapper.uploadFile('/Downloads/WinFormClient.png' , 'pub/example/');
~~~  
## License  
[MIT](https://choosealicense.com/licenses/mit/)  
