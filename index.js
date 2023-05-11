const express = require("express");

const server = express();
server.use(express.json());

server.get("/health", (req, res) => {
    res.json({
        status: "Running"
    })
})


let toDos = [
    {
        id: 1,
        name: "Comprar leite",
        description: "Ir no mercado da esquina e comprar leite",
        isDone: false
    },
    {
        id: 2,
        name: "Exame de Sangue",
        description: "Ir na Clinica São José, sala 17 e realizar o exame",
        isDone: false
    },
    {
        id: 3,
        name: "Treino",
        description: "Ir na academia, retirar o doc e treinar",
        isDone: false
    }
]


server.get("/toDos", (req, res) => {
    res.json({toDos: toDos })
})

server.get("/toDos/:id", (req, res) => {
    const id = Number(req.params.id);
    const toDo = toDos.find((toDo) => {
        return toDo.id === id;
    });
    res.json({
        toDo
    })
})

server.post("/toDos", (req, res) => {
    const newToDo = {
        id: toDos.length + 1,
        name: req.body.name,
        description: req.body.description,
        isDone:req.body.isDone
    }
    toDos.push(newToDo)
    res.json({
        toDo: newToDo
    })
})


server.put("/toDos/:id", (req, res) => {
    const id = Number(req.params.id);
    const toDo = toDos.find((toDo) => {
        return toDo.id === id;
    })
    if (!toDo) {
        return res.status(404).json({message: "toDo not found"});
    }
    toDo.name = req.body.name;
    toDo.description = req.body.description;
    res.json({
        toDo
    })
})


server.delete("/toDos/:id", (req, res) => {
    const id = Number(req.params.id);
    toDos = toDos.filter((toDo) => {
        return toDo.id !== id;
    })
    res.status(204).send();
})

const port = 8080
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});