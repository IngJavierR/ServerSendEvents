# Server Send Events

Server Send Events solution (SSE) with NodeJs

## Environment

Install Nodejs:  

* [NodeJsLTS](https://nodejs.org/)  

## Deploy Application  

```bash
npm install
npm start
```

## Testing Frontend  

Visit http://localhost:9220/ and open Developer Tools > Network  
Asssign a value to Id textbox, this is the client id (mandatory), we are able to use same id in different browser instances  
Asssign a value to Channel textbox, this is the channel we want to subscribe (optional)  
Press "Start Listening" button to initialize EventSource  

## Sending Message

To send your first message call this method:  

```bash
POST: http://localhost:9220/send
raw {
    "message": "Hello World",
    "ids": "1,2",
    "channels": "news"
}
```  

Where:  
id (optional): separated comma value that represents destination clients, could be multiple clientes with same message  
channels (optional): separated comma value that represents destination channel names, could be multiple channels with the same message  
message (optional): information to share  

## Contributors

Javier Rodríguez  
[hazelapd@gmail.com]