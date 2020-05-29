// import required modules
const express = require("express");

// create and instance of the Express Router
const cart = express.Router();

// config variables
const endpointURI = "/cart"



let cartInventory = [
    {
        id: 1,
        product: "watermelon",
        quantity: 80,
        price: "5.56",
    },
    {
        id: 2,
        product: "juice box",
        quantity: 12,
        price: "3.99",
    },
    {
        id: 3,
        product: "trail mix",
        quantity: 5,
        price: "7.99",
    }
]

let nextId = cartInventory.length + 1;

// GET
cart.get(endpointURI, (request, response) => {
    response.json(cartInventory)
    response.status(200)
})

// GET by id
cart.get(`${endpointURI}/:id`, (request, response) => {
    let id = parseInt(request.params.id);
    let item = cartInventory.find((item) => {
        if (item.id === id) {
            return true
        }
    })
    if (item) {
        response.json(item);
    } else {
        response.status(404).send("ID Not Found");
    }
});

// // POST

cart.post(endpointURI, (req, res) => {
    let newCartItem = req.body;
    newCartItem.id = nextId;
    cartInventory.push(newCartItem);
    nextId++;
    res.status(201).json(newCartItem);
})


// // PUT
// does PUT require all properites when updating?
cart.put(`${endpointURI}/:id`, (req, res) => {
    // little confused about where params comes from
    let id = parseInt(req.params.id);
    let updatedItem = req.body;
    cartInventory.id = id
    let foundIndex = cartInventory.findIndex((item) => {
        if (item.id === id)
            return true
    });
    if (foundIndex === -1) {
        res.status(204)
        res.send(`nothing at his id`)
    } else {
        cartInventory.splice(foundIndex, 1, updatedItem);
        res.status(200);
        res.json(updatedItem);
    }
})

// DELETE
cart.delete(`${endpointURI}/:id`, (req, res) => {
    let id = parseInt(req.params.id)
    let foundIndex = cartInventory.findIndex((item) => {
        if (item.id === id) {
            return true
        }
    });
    if (foundIndex > -1) {
        cartInventory.splice(foundIndex, 1);
        res.status(200);
        res.json(cartInventory);
    } else {
        res.status(204);
        res.send(`no item with id: ${id}`);
    }
})

module.exports = { cart };