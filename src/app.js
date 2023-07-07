const express = require('express')
const db = require('./connection/db')
require('dotenv').config()

const app = express()

const uri = process.env.DATABASE_URI
db.connect(uri)