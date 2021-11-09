const cors = require("cors")
const express = require("express")
const { verify } = require("jsonwebtoken")
const db = require("./db")

module.exports = app => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({
        origin: '*'
    }))
}
