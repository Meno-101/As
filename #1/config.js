
const environments = {}

environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
}
environments.develpment = {
  httpPort: 3000,
  httpsPort: 3001,
}

const currentEnvironment = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : ''

const isObject = assumed => typeof assumed === 'object'
const currEnv = environments[currentEnvironment]

const environmentToExport = isObject(currEnv) ? currEnv : environments.develpment

module.exports = environmentToExport
