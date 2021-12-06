(function(){
    const form = document.getElementById('form');
    const tableData = document.getElementById('tableData');
    const typeSelect = document.getElementById('typeSelect');
    const totalDebit = document.getElementById('totalDebit');
    const totalCredit = document.getElementById('totalCredit');
    const descriptionInput = document.getElementById('descriptionInput');
    const amountInput = document.getElementById('amountInput');
    
    const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

    let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

    // Add Transaction
    function addTransaction(e) {
        e.preventDefault();

        if(descriptionInput.value.trim() === '' || typeSelect.value.trim() === ''|| amountInput.value.trim() === '') {
            alert('Please add a description, type, and/or amount');
        }else{
            const transaction = {
                description: descriptionInput.value,
                type: typeSelect.value,
                amount: amountInput.value
            };

            transactions.push(transaction);
            addTransactionDOM(transaction);
            updateTotals();
            updateLocalStorage();

            descriptionInput.value = '';
            typeSelect.value = '';
            amountInput.value = '';
        }
    }
    
    //Add transactions to DOM list
    function addTransactionDOM(transaction) {
        const item = document.createElement('tr');
        // Add based on values
        item.innerHTML = `
            <tr class="debit">
                <td>${transaction.description}</td>
                <td>${transaction.type}</td>
                <td class="amount">$${transaction.amount}</td>
                <td class="tools">
                    <button class="delete fa fa-trash-o" onclick="removeTransaction(${transaction.type})"></button>
                </td>
            </tr>
        `;
        tableData.appendChild(item)
    }

    // Update total debit and total credit amounts
    function updateTotals() {
        const amounts = transactions.map(transaction => transaction.amount);
        // Add debit total
        const debit = amounts

        // Add credit total
        const credit = amounts

        totalDebit.innerText = `$${debit}`
        totalCredit.innerText = `$${credit}`
    }

    // Remove transaction by type 
    function removeTransaction(type) {
        transactions = transactions.filter(transaction => transaction.type !== type);
        updateLocalStorage();
        init();
    }

    // Update local storage
    function updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    // Init
    function init() {
        tableData.innerHTML = '';
        transactions.forEach(addTransactionDOM);
        updateTotals();
    }

    removeTransaction();

    init();

    form.addEventListener('submit', addTransaction);
}
)()
