import express from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import axios from 'axios'

const router = express.Router()
const prisma = new PrismaClient()

function sendRequest() {
  return axios.get("https://api.currencyapi.com/v3/latest?apikey=oOygUN497xMBmxExXpNLHBFot1PnnXGCZEMKOzvF", {
  }).then(response => response.data);
}

router.route('/')
  .get(async (req: express.Request, res: express.Response) => {
    const id = req.body.id;

    const accounts = await prisma.account.findMany({ where: { userId: id } })
    try {
      sendRequest().then(async data => {
        accounts.forEach(x => {
          const convert = data.data[x.currency.toUpperCase()].value;
          console.log(`${convert} * ${x.amount}`);
          x.amount = x.amount * convert;
        })
        console.log(accounts);
        res.json(accounts);
      })
    }
    catch (e) {
      res.json({ 'msg': 'error occurred' });
    }
  })

  .post(async (req: express.Request, res: express.Response) => {
    console.log(req.body)
    try {
      sendRequest().then(async data => {
        const currency = req.body.currency
        const convert = data.data[currency.toUpperCase()].value;
        console.log(convert);
        req.body.amount = req.body.amount / convert;
        const account = await prisma.account.create({ data: req.body })
        res.json(account)
      })

    } catch (e) {
      console.log(e.message)
      res.json({ 'msg': 'error occurred' })
    }
  })
  .delete((req, res) => res.send('delete bank'))

module.exports = router