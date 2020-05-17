const simpleGit = require('simple-git');
const moment = require('moment');
const jsonfile = require('jsonfile');
const random = require('random');

const FILE_PATH = './data.json';

const makeCommits = (numberOfCommits) => {
  if (numberOfCommits == 0) {
    console.log("\n\n pushing...")
    return simpleGit().push();
  }
  const w = random.int(0, 30);
  const d = random.int(0, 6);
  const DATE = moment()
                .subtract(1, 'y')
                .add(1, 'd')
                .add(w, 'w')
                .add(d, 'd')
                .format();
  const data = {
    date: DATE
  }
  console.log(numberOfCommits + " ");
  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, {'--date': DATE}, makeCommits.bind(this, --numberOfCommits));
  });
}

console.log("I got this, Just Sit back and Enjoy...")
makeCommits(100, () => {
  console.log("\nDone :)");
});