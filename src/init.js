import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";


const PORT = 5000;

/// server listening test
const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

// app add server listen
app.listen(PORT,  handleListening);