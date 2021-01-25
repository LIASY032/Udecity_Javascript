'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

let accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


const displayMovements = function(movements, sort = false) {
    containerMovements.innerHTML = '';
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function(mov, i) {


        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};


const eurToUsd = 1.1;
const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
let currentAccount;



const createUsernames = function(accs) {
    accs.forEach(function(acc) {
        acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join("");
    })
};

createUsernames(accounts);

const calcDisplaySummary = function(movements) {

    const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`;
    const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}€`;
    const interest = movements.filter(mov => mov > 0).map(deposit => (deposit * 1.2) / 100).filter(int => int >= 1).reduce((acc, mov) => acc + mov, 0);
    labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const refreshPage = function(account) {


    calcDisplaySummary(account.movements);
    displayMovements(account.movements);
    balance(account.movements);
};



btnLogin.addEventListener('click', function(e) {
    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );

    if (accounts.find(
            acc => acc.username == inputLoginUsername.value
        ) && accounts.find(
            acc => acc.pin == inputLoginPin.value
        )) {
        console.log(currentAccount);
        containerApp.style.opacity = 100;
        refreshPage(currentAccount);


        inputLoginUsername.value = "";
        inputLoginPin.value = "";
    }

});


btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    let transferAccount = accounts.find(
        acc => acc.username === inputTransferTo.value
    );

    let transferMoney = inputTransferAmount.value;
    if (transferAccount && transferMoney && transferAccount !== currentAccount) {
        accounts[accounts.indexOf(transferAccount)].movements.push(Number(transferMoney));
        accounts[accounts.indexOf(currentAccount)].movements.push(-Math.abs(transferMoney));
        refreshPage(currentAccount);
        inputTransferTo.value = "";
        inputTransferAmount.value = "";


    }

});

btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const loanNumber = inputLoanAmount.value;
    if (Math.sign(loanNumber) === 1) {

        accounts[accounts.indexOf(currentAccount)].movements.push(Number(loanNumber));
        refreshPage(currentAccount);
    }

});

// const deposits = movements.filter(function(mov) {
//     return mov > 0;
// });

// const withdrawals = movements.filter(function(mov) {
//     return mov < 0;
// });

const balance = function(movements) {
    const num = movements.reduce(function(acc, cur, i, arr) {


        return acc + cur;
    });
    labelBalance.textContent = `${num}€`;
}


btnClose.addEventListener('click', function(e) {
    e.preventDefault();

    const closeUser = accounts.find(
        acc => acc.username === inputCloseUsername.value
    );

    if (closeUser && Number(inputClosePin.value) === closeUser.pin) {
        if (closeUser === currentAccount) {
            containerApp.style.opacity = 0;

        }

        let s;
        console.log(s);
        const newAccounts = accounts;
        accounts = [];

        for (const acc of newAccounts) {
            if (acc !== closeUser) {
                accounts.push(acc);
            }
        }
        inputCloseUsername.value = "";
        inputClosePin.value = "";



        console.log(accounts);
    }




});

btnSort.addEventListener('click', function(e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, true)

});

// const max = movements.reduce((acc, cur) => {
//     if (acc > cur) return acc;
//     else return cur;
// });


// console.log(max);