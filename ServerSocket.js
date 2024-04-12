class ServerSocket {
        constructor(port){
                this.ws = new WebSocket(port);        
                
                this.ws.addEventListener("open", (event) => {
                        console.log("connection open");
                });

                this.ws.addEventListener("message", (event) => {
                        console.log("received message: ");
                        console.log(event.data);
                });
        }
}