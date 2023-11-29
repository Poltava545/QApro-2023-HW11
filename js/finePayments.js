"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;


/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */


buttonSubmit.addEventListener('click',payFine);
function payFine(){
    // Отримання значень з полів форми
    let enteredFineNumber = fineNumber.value;
    let enteredPassport = passport.value;
    let enteredCreditCardNumber = creditCardNumber.value;
    let enteredCvv = cvv.value;
    let enteredAmount = parseFloat(amount.value);

    // Валідація номера та суми
    let matchingFine = DB.find(fine => fine.номер === enteredFineNumber && fine.сума === enteredAmount);
    if (!matchingFine) {
        alert("Номер не співпадає або сума не співпадає");
        return;
    }

    // Валідація паспортних даних
    let passportRegex = /^[А-ЩЬЮЯҐЄІЇ]{2}\d{6}$/;
    if (!passportRegex.test(enteredPassport)) {
        alert("Не вірний паспортний номер");
        return;
    }

    // Валідація номера кредитної карти
    let creditCardRegex = /^\d{16}$/;
    if (!creditCardRegex.test(enteredCreditCardNumber)) {
        alert("Не вірна кредитна картка");
        return;
    }

    // Валідація CVV
    let cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(enteredCvv)) {
        alert("Не вірний CVV");
        return;
    }

    // Якщо валідація пройшла успішно, видалити штраф з DB
    let indexToRemove = DB.findIndex(fine => fine.номер === enteredFineNumber && fine.сума === enteredAmount);
    if (indexToRemove !== -1) {
        DB.splice(indexToRemove, 1);
        alert("Штраф оплачено успішно!");
        populateFinesTable(data.finesData); // Оновити таблицю після оплати
    } else {
        alert("Помилка видалення штрафу з бази даних");
    }
}

