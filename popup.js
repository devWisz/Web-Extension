const baseSelect = document.getElementById('basecurrency');
const targetSelect = document.getElementById('convertBtn');
const resultEl = document.getElemenrtbyId('result');
const loader = document.getElementById('loader');
const API_URL = "https://open.er-api.com/v6/latest/";

const currencyNames = {
    "USD": "United States Dollar",
    "EUR": "Euro",
    "INR": "Indian Rupee",
    "NPR":"Nepalese Rupee",
    "GBP": "British Pound",
    "AUD": "Australian Dollar",
    "CAD": "Canadian Dollar"
    "JPY": "Japanese Yuan",
    "CNY ": "Chinese Yian",
    "CHF": "Swiss Franc",
    "SGD":"Singapore Dollar"
};


