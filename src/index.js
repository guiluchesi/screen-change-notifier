const yargs = require('yargs')
const app = require('./app')

const args = yargs
  .scriptName('screen-change-notifier')
  .usage('$0 <cmd> [args]')
  .command('watch', 'Starts watching the screen for changes')
  .option('type', {
    description: 'Type of notification when screen change is detected',
    type: 'string'
  })
  .option('timeout', {
    description: 'Timeout in minutes',
    type: 'number'
  })
  .option('delay', {
    alias: 'd',
    description: 'Delay between screenshots in milliseconds',
    type: 'number'
  })
  .option('threshold', {
    alias: 't',
    description: 'Threshold of screen change in pixels',
    type: 'number'
  })
  .help()
  .alias('help', 'h')
  .argv

const appConfiguration = {
  notificationType: args.type || 'email',
  timeoutInMinutes: args.timeout || 5,
  msDelayToScreenshot: args.delay || 3000,
  pixelsChangedThreshold: args.threshold || 75000
}

app(appConfiguration)
