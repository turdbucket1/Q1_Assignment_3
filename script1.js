const express = require('express');
const path = require('path');
const app = express();
const port = 3001; // Use port 3001 for simplicity

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Serve the Q1.html file when accessing the root URL
app.get('/', (req, res) => {    res.sendFile(path.join(__dirname, 'Q1.html'));  });

// Function: findSummation
function findSummation(N) {
    N = parseInt(N); // Convert N to an integer

    if (isNaN(N) || N <= 0) {return false;}

    let sum = 0;

    for (let i = 1; i <= N; i++) {sum += i;}

    return sum;
}


function uppercaseFirstandLast(str) {
    let answer = "";
    for (let i=0; i<str.length; i++)  {
        if (i === 0 || i === str.length - 1) {
            answer += str.charAt(i).toUpperCase();
        } else {
            answer += str.charAt(i);
        }
    }
    return answer;
}

function findAverageAndMedian(numbs)   {
    const numArr = ((String(numbs)).split(","));
    let sum=0;
    let median = 0;

    for (let i=0; i<numArr.length; i++) {
        sum += Number(numArr[i])
    }
    let average = sum/numArr.length;

    const middleIndex = numArr.length / 2;
    if (numArr.length % 2 !== 0) {
        median = numArr[Math.floor(middleIndex)];
    } else {
        median = (Number(numArr[middleIndex - 1]) + Number(numArr[middleIndex])) / 2;
    }
    return (`Average: ${average}.  Median: ${median}`);

}

function find4Digits(str) {
    const numbers = str.split(' ');
    for (const digits of numbers) {
        if (digits.length === 4 && !isNaN(Number(digits))) {
            return digits;
        }
    }
    return false;
}


// Route to handle findSummation request
app.post('/findSummation', (req, res) => {
    const { N } = req.body;
    const result = findSummation(N);
    res.send(`Result: ${result}`);
});


app.post('/uppercaseFirstandLast', (req, res) => {
    const { string1 } = req.body;
    const result = uppercaseFirstandLast(string1);
    res.send(`Final String: ${result}`);
})

app.post('/findAverageAndMedian', (req, res) => {
    const { av_med } = req.body;
    const result = findAverageAndMedian(av_med);
    res.send(`${result}`);
})

app.post('/find4Digits', (req, res) => {
    const { digits } = req.body;
    const result = find4Digits(digits);
    res.send(`${result}`);
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
