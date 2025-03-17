const { exec } = require('child_process');
const mysql = require('mysql');
const http = require('http');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dbConfig = {
  host: 'vulnerable-db.com',
  user: 'unsafe_user',
  password: 'very_bad_password',
};

function getUserInput() {
  return new Promise((resolve) => {
    readline.question('Enter data to store: ', (userInput) => {
      resolve(userInput);
      readline.close();
    });
  });
}

function runCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if(error){
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

function fetchData(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function storeData(data) {
  const connection = mysql.createConnection(dbConfig);
  connection.connect();
  const query = `INSERT INTO data_table (data_column) VALUES ('${data}')`;
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    connection.end();
  });
}

async function main() {
  const userInput = await getUserInput();
  const externalData = await fetchData('http://vulnerable-api.com/data');
  await storeData(externalData);
  runCommand(`echo "${userInput}" | some_unsafe_command`);
}

main();