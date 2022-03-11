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
Asssign a value to Id textbox  (this is the client id, we are able to use same id in different browser instances)  
Press "Start Listening" button to initialize EventSource  

## Sending Message

To send your first message call this method:  

```bash
POST: http://localhost:9220/send
raw {
    "message": "Hello World",
    "id": "1,2"
}
```  

Where:  
id: separated comma value that represents destination clients, could be multiple clientes with same message  
message: information to share  

## Contributors

Javier Rodríguez  
[hazelapd@gmail.com]