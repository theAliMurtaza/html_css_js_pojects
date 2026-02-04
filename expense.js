const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  if (text.value === "" || amount.value === "") {
    alert("Please enter text and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  text.value = "";
  amount.value = "";

  update();
}

function update() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
 
  updateValues();
}



function updateValues() {
  const amounts = transactions.map(tx => tx.amount);

  const total = amounts.reduce((acc, val) => acc + val, 0);
  const inc = amounts.filter(a => a > 0).reduce((acc, a) => acc + a, 0);
  const exp = amounts.filter(a => a < 0).reduce((acc, a) => acc + a, 0);

  balance.innerText = `$${total}`;
  income.innerText = `$${inc}`;
  expense.innerText = `$${Math.abs(exp)}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  update();
}

update();
