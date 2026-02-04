const historyList = document.getElementById("historyList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function renderHistory() {
  historyList.innerHTML = "";

  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.classList.add(tx.amount < 0 ? "minus" : "plus");

    li.innerHTML = `
      ${tx.text}
      <span>$${Math.abs(tx.amount)}</span>
      <i class="fa-solid fa-trash delete" data-id="${tx.id}"></i>
    `;

    historyList.appendChild(li);
  });
}

historyList.onclick = (e) => {
  if (e.target.classList.contains("delete")) {
    const id = Number(e.target.dataset.id);
    transactions = transactions.filter(tx => tx.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderHistory();
  }
};

renderHistory();
