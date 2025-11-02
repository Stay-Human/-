// js/app.js

class CryptoExchange {
  constructor() {
    this.initElements();
    this.initEventListeners();
    this.updateExchangeRate();
    this.renderTransactionHistory();
  }

  initElements() {
    this.amountFrom = document.getElementById('amountFrom');
    this.amountTo = document.getElementById('amountTo');
    this.currencyFrom = document.getElementById('currencyFrom');
    this.currencyTo = document.getElementById('currencyTo');
    this.exchangeRateDisplay = document.getElementById('exchangeRate');
    this.createExchangeBtn = document.getElementById('createExchangeBtn');
    this.modal = document.getElementById('exchangeModal');
    this.closeModal = document.querySelector('.modal__close');
    this.exchangeForm = document.getElementById('exchangeForm');
  }

  initEventListeners() {
    // Расчет обмена при изменении суммы или валюты
    this.amountFrom.addEventListener('input', () => this.calculateExchange());
    this.currencyFrom.addEventListener('change', () => this.updateExchangeRate());
    this.currencyTo.addEventListener('change', () => this.updateExchangeRate());

    // Открытие модального окна
    this.createExchangeBtn.addEventListener('click', () => this.openModal());

    // Закрытие модального окна
    this.closeModal.addEventListener('click', () => this.closeModalWindow());
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModalWindow();
      }
    });

    // Отправка формы
    this.exchangeForm.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  calculateExchange() {
    const amount = parseFloat(this.amountFrom.value) || 0;
    const fromCurrency = this.currencyFrom.value;
    const toCurrency = this.currencyTo.value;

    if (amount <= 0) {
      this.amountTo.value = '';
      return;
    }

    // Конвертация через USD
    const amountInUSD = amount * exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD / exchangeRates[toCurrency];

    this.amountTo.value = convertedAmount.toFixed(8);
  }

  updateExchangeRate() {
    const fromCurrency = this.currencyFrom.value;
    const toCurrency = this.currencyTo.value;

    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const rateDisplay = rate > 1 
      ? rate.toFixed(2) 
      : rate.toFixed(8);

    this.exchangeRateDisplay.textContent = 
      `Курс: 1 ${fromCurrency} = ${rateDisplay} ${toCurrency}`;

    this.calculateExchange();
  }

  openModal() {
    const amountFrom = parseFloat(this.amountFrom.value);
    
    if (!amountFrom || amountFrom <= 0) {
      alert('Пожалуйста, введите сумму для обмена');
      return;
    }

    // Заполняем summary
    document.getElementById('summaryFrom').textContent = 
      `${amountFrom} ${this.currencyFrom.value}`;
    document.getElementById('summaryTo').textContent = 
      `${this.amountTo.value} ${this.currencyTo.value}`;

    this.modal.style.display = 'block';
  }

  closeModalWindow() {
    this.modal.style.display = 'none';
    this.exchangeForm.reset();
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('userEmail').value;
    const wallet = document.getElementById('walletAddress').value;

    // Базовая валидация
    if (!this.validateEmail(email)) {
      alert('Пожалуйста, введите корректный email');
      return;
    }

    if (!this.validateWallet(wallet)) {
      alert('Пожалуйста, введите корректный адрес кошелька');
      return;
    }

    // Генерируем ID транзакции
    const txId = 'TX' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Показываем успешное сообщение
    alert(`✅ Заявка создана!\n\nID транзакции: ${txId}\n\nВ реальном приложении на ${email} будет отправлено письмо с деталями обмена.`);

    this.closeModalWindow();

    // Очищаем форму калькулятора
    this.amountFrom.value = '';
    this.amountTo.value = '';
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validateWallet(wallet) {
    // Простая проверка: минимум 10 символов
    return wallet.length >= 10;
  }

  renderTransactionHistory() {
    const tbody = document.getElementById('transactionTableBody');
    
    transactionHistory.forEach(tx => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td><strong>${tx.id}</strong></td>
        <td>${tx.date}</td>
        <td>${tx.from} → ${tx.to}</td>
        <td>
          <div>${tx.amountFrom} ${tx.from}</div>
          <div style="color: var(--color-text-secondary); font-size: 12px;">
            ${tx.amountTo} ${tx.to}
          </div>
        </td>
        <td>
          <span class="status status--${tx.status}">
            ${tx.status === 'completed' ? 'Завершено' : 'В обработке'}
          </span>
        </td>
      `;
      
      tbody.appendChild(row);
    });
  }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  new CryptoExchange();
});
