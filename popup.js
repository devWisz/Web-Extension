const baseSelect = document.getElementById('baseCurrency');
const targetSelect = document.getElementById('targetCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultEl = document.getElementById('result');
const loader = document.getElementById('loader');
const API_URL = "https://open.er-api.com/v6/latest/";

const currencyNames = {
  "USD": "United States Dollar",
  "EUR": "Euro",
  "INR": "Indian Rupee",
  "NPR": "Nepalese Rupee",
  "GBP": "British Pound",
  "AUD": "Australian Dollar",
  "CAD": "Canadian Dollar",
  "JPY": "Japanese Yen",
  "CNY": "Chinese Yuan",
  "CHF": "Swiss Franc",
  "SGD": "Singapore Dollar"
};

const populateCurrencyDropdowns = async () => {
  try {
    const res = await fetch(`${API_URL}USD`);
    const data = await res.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(code => {
      const fullName = currencyNames[code] || code;
      const optionText = `${code} - ${fullName}`;

      const option1 = new Option(optionText, code);
      const option2 = new Option(optionText, code);

      baseSelect.add(option1.cloneNode(true));
      targetSelect.add(option2.cloneNode(true));
    });


    baseSelect.value = "USD";
    targetSelect.value = "NPR";

  } catch (err) {
    resultEl.textContent = " Could not load currency list.";
  }
};

convertBtn.addEventListener('click', async () => {
  const base = baseSelect.value;
  const target = targetSelect.value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (!base || !target || isNaN(amount) || amount <= 0) {
    resultEl.textContent = " Please enter valid amount and currencies.";
    return;
  }

  resultEl.textContent = "";
  loader.classList.remove('hidden');

  try {
    const res = await fetch(`${API_URL}${base}`);
    const data = await res.json();
    const rate = data.rates[target];

    if (!rate) {
      resultEl.textContent = ` Conversion for "${target}" failed.`;
    } else {
      const converted = (amount * rate).toFixed(2);
      resultEl.textContent = ` ${amount} ${base} = ${converted} ${target}`;
    }
  } catch (err) {
    resultEl.textContent = " Something went wrong. Please try again.";
  }

  loader.classList.add('hidden');
});

populateCurrencyDropdowns();
