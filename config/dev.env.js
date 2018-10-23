'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const ALP_ITIL_SECRET = require('./ALP_ITIL_SECRET')

module.exports = merge(prodEnv, {
   NODE_ENV: '"development"',
   ALP_ITIL_API: ALP_ITIL_SECRET.DEV
})
