import express from "express";
import { value } from "./test.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send('<h1>Hello World</h1><h1>What?</h1>');
});
app.post('/', (req, res) => {
    console.log(req.body);
    res.json({ msg: 'data received', data: req.body });
});
console.log(value);
app.listen(5000, () => console.log("Server running on port 5000"));
;
//# sourceMappingURL=server.js.map