const path = require('path');
const argv = require('yargs').argv;
const critical = require('critical');
const chalk = require('chalk');
const meow = require('../config.json');

const processCriticalCss = (element, i, callback) => {
  const url = argv.url || meow.cssabove.url;
  const criticalSrc = `${url}${element.url}`;
  const BASE_PATH = path.resolve(__dirname, '..');
  const criticalDest = `${`${BASE_PATH}/${meow.src.templates}${
    element.template
  }`}_critical.min.css`;
  console.log(
    `-> Generating critical CSS: ${chalk.cyan(criticalSrc)} -> ${chalk.magenta(
      criticalDest
    )}`
  );

  critical
    .generate({
      src: criticalSrc,
      dest: criticalDest,
      inline: meow.cssabove.inline,
      ignore: meow.cssabove.ignore,
      include: meow.cssabove.include,
      css: [meow.dist.css + meow.cssabove.cssfile],
      minify: meow.cssabove.minify,
      height: meow.cssabove.height,
      width: meow.cssabove.width,
    })
    .then((output) => {
      console.log(
        chalk`-> Critical CSS generated: {green ${
          element.template
        }_critical.min.css}`
      );
      callback();
    })
    .error((err) => {
      console.log(chalk`-> Something goes wrong {red ${err}}`);
    });
};

doSynchronousLoop(meow.cssabove.sites, processCriticalCss, () => {
  console.log(chalk`{green Done!}`);
});

// Process data in an array synchronously, moving onto the n+1 item only after the nth item callback
function doSynchronousLoop(data, processData, done) {
  if (data.length > 0) {
    const loop = (data, i, processData, done) => {
      processData(data[i], i, () => {
        if (++i < data.length) {
          loop(data, i, processData, done);
        } else {
          done();
        }
      });
    };
    loop(data, 0, processData, done);
  } else {
    done();
  }
}
