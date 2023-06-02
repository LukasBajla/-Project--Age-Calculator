const App = {
  $: {
    inputContainer: document.querySelector(".cont-input"),
    inputDayText: document.querySelector(".input-day-text"),
    inputMonthText: document.querySelector(".input-month-text"),
    inputYearText: document.querySelector(".input-year-text"),
    inputDay: document.querySelector(".input-day"),
    inputMonth: document.querySelector(".input-month"),
    inputYear: document.querySelector(".input-year"),
    inputDayBox: document.querySelector("#day-box"),
    inputMonthBox: document.querySelector("#month-box"),
    inputYearBox: document.querySelector("#year-box"),

    resultButton: document.querySelector(".arrow-box"),
    resultTextYears: document.querySelector("#result-years"),
    resultTextMonths: document.querySelector("#result-months"),
    resultTextDays: document.querySelector("#result-days"),
  },

  Dates: {
    CurrentDate:
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate(),
    CurrentDay: new Date().getDate(),
    CurrentMonth: new Date().getMonth() + 1,
    CurrentYear: new Date().getFullYear(),
  },

  init() {
    App.AgeFromDateCalculator();
  },

  AgeFromDateCalculator() {
    App.$.resultButton.addEventListener("click", (event) => {
      // Remove All Error Messages
      App.errorMessage_Remove(App.$.inputDay);
      App.errorMessage_Remove(App.$.inputMonth);
      App.errorMessage_Remove(App.$.inputYear);

      // Remove result HTML
      App.$.resultTextYears.innerHTML = "--";
      App.$.resultTextMonths.innerHTML = "--";
      App.$.resultTextDays.innerHTML = "--";

      // Check if field is empty

      if (App.$.inputDayBox.value == "") {
        App.errorMessage_Length(App.$.inputDay);
      }
      if (App.$.inputMonthBox.value == "") {
        App.errorMessage_Length(App.$.inputMonth);
      }
      if (App.$.inputYearBox.value == "") {
        App.errorMessage_Length(App.$.inputYear);
      }

      // Check if number is valid as a date

      let goodInput = 0;

      if (
        Number(App.$.inputDayBox.value) < 1 ||
        Number(App.$.inputDayBox.value) > 31
      ) {
        App.errorMessage_InvalidNumber(App.$.inputDay);
      } else goodInput++;
      if (
        Number(App.$.inputMonthBox.value) < 1 ||
        Number(App.$.inputMonthBox.value) > 12
      ) {
        App.errorMessage_InvalidNumber(App.$.inputMonth);
      } else goodInput++;
      if (
        Number(App.$.inputYearBox.value) < 1900 ||
        Number(App.$.inputYearBox.value) > App.Dates.CurrentYear
      ) {
        App.errorMessage_InvalidNumber(App.$.inputYear);
      } else goodInput++;

      //Input Numbers to Date
      let InputDate =
        Number(App.$.inputYearBox.value) +
        "-" +
        Number(App.$.inputMonthBox.value) +
        "-" +
        Number(App.$.inputDayBox.value);

      console.log("Input date : " + InputDate); // Input Date
      console.log("Input date parse : " + Date.parse(InputDate)); // Validity of current date
      console.log("Current date : " + App.Dates.CurrentDate); // Current Date

      let inpD = new Date(InputDate);
      let currD = new Date();

      // Check if date exists and show result
      if (isNaN(Date.parse(InputDate)) || goodInput != 3 || inpD > currD) {
        App.errorMessage_InvalidDate();
      } else {
        App.ageShowResult(
          App.$.inputYearBox.value,
          App.$.inputMonthBox.value,
          App.$.inputDayBox.value
        );
      }
    });
  },

  errorMessage_Remove(place) {
    if (place.querySelector(".error-msg") != null) {
      place.querySelector(".error-msg").remove();
      place.querySelector("p").classList.remove("error");
    }
    if (place.querySelector(".error-border") != null) {
      place.querySelector("input").classList.remove("error-border");
      place.querySelector("p").classList.remove("error");
    }
  },
  errorMessage_Length(place) {
    if (place.querySelector(".error-msg") != null) return;
    else {
      let errorMessage = document.createElement("p");
      errorMessage.textContent = "This field is required";
      errorMessage.setAttribute("class", "error-msg");
      place.appendChild(errorMessage);
      place.querySelector("p").classList.add("error");
    }
  },
  errorMessage_InvalidNumber(place) {
    if (place.querySelector(".error-msg") != null) return;
    else {
      let errorMessage = document.createElement("p");
      errorMessage.textContent = "Date is not valid";
      errorMessage.setAttribute("class", "error-msg");
      place.appendChild(errorMessage);
      place.querySelector("p").classList.add("error");
    }
  },
  errorMessage_InvalidDate() {
    const inputContainer = App.$.inputContainer.querySelectorAll("input");
    const inputParagraph = App.$.inputContainer.querySelectorAll("p");
    inputContainer.forEach((element) => {
      element.classList.add("error-border");
    });
    inputParagraph.forEach((element) => {
      element.classList.add("error");
    });
    App.errorMessage_InvalidNumber(App.$.inputDay);
  },

  ageShowResult(inputYear, inputMonth, inputDay) {
    //Convert date into fixes years, months, days
    let resultYear = App.Dates.CurrentYear - Number(inputYear);
    let resultMonth = App.Dates.CurrentMonth - Number(inputMonth);
    let resultDay = App.Dates.CurrentDay - Number(inputDay);
    let daysInMonth = new Date(
      Number(inputYear),
      Number(inputMonth),
      0
    ).getDate();

    if (resultMonth <= 0 && inputDay > App.Dates.CurrentDay) {
      // console.log("resultMonth <= 0");
      resultYear -= 1;
      resultMonth = 12 - Number(Math.abs(resultMonth));
    }
    if (
      inputMonth < App.Dates.CurrentMonth &&
      inputDay > App.Dates.CurrentDay
    ) {
      // console.log(
      //   "inputMonth < App.Dates.CurrentMonth && inputDay > App.Dates.CurrentDay"
      // );
      resultMonth -= 1;
    }
    if (resultDay < 0) {
      resultDay = daysInMonth - Number(Math.abs(resultDay));
    }

    // App.$.resultTextYears.innerHTML = resultYear;
    // App.$.resultTextMonths.innerHTML = resultMonth;
    // App.$.resultTextDays.innerHTML = resultDay;

    App.ageAnimate(resultYear, resultMonth, resultDay);
  },
  ageAnimate(inputYear, inputMonth, inputDay) {
    let animSpeed = 50;
    const values = [inputYear, inputMonth, inputDay];
    const data = [0, 0, 0];
    const resultBox = document.querySelectorAll(".result");

    // console.log(values, data, resultBox);
    // console.log(resultBox[0].innerHTML);

    for (let i = 0; i < data.length; i++) {
      let time = +values[i] / animSpeed;
      // console.log("Time: "+time+" I: "+i+" Values: "+values[i]+" Data: "+data[i]+" ResultBox: "+resultBox[i].innerHTML);

      const animation = () => {
        if (data[i] < values[i] || resultBox[i].innerHTML < values[i]) {
          resultBox[i].innerHTML = Math.ceil(data[i] + time / 100);
          // console.log("resultBox : "+resultBox[i].innerHTML);
          // console.log("Math: "+data[i]+" + "+(time/100));
          data[i]++;
          animSpeed += 1;
          setTimeout(animation, animSpeed);
        }
      };
      animation();
    }
  },
};

window.addEventListener("load", App.init);
