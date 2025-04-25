class logbookGenerator {

    constructor() {
        this.dateInput = document.getElementById('date');
        this.startKmInput = document.getElementById('kmStart');
        this.endKmInput = document.getElementById('kmEnd');
        this.fuelTypeInput = document.getElementsByName('fuelType')[0];
        this.fuelPriceInput = document.getElementById('fuelPrice');
        this.fuelAmountInput = document.getElementById('fuelAmount');

        this.addButton = document.getElementById('addData');
        this.deleteLastDataButton = document.getElementById('deleteLastData');
        this.deleteAllDataButton = document.getElementById('deleteAllData');

        this.outputArea = document.getElementById('logbookOutput');

        this.logbookEntries = []; //array of all user inputs, every user Input consists of another Array (userData)


        this.firstRowLabels = ["Datum", "Kilometerstand Start", "Kilometerstand Ende", "Gefahrene Kilometer",
            "Getankter Treibstoff", "Preis pro Liter", "Getankte Liter", "Kosten gesamt"]

    }


    initGuiEvents() {
        this.addButton.addEventListener('click', () => this.generateLogbook());
        this.deleteLastDataButton.addEventListener('click', ()=> this.deleteLastEntry());
        this.deleteAllDataButton.addEventListener('click', ()=> this.deleteLogbook());

    }

    generateLogbook() {
        this.outputArea.innerHTML = " ";

        let validInput = this.validateUserInput();

        if (validInput) {
            this.getUserInput();
            this.createLogbook();
        }
    }

    getUserInput() {
        //builds an array out of user input data and adds it to the array userData, which collects all User Inputs

        let userInput = [];
        userInput.push(this.dateInput.value);

        userInput.push(this.startKmInput.value);

        userInput.push(this.endKmInput.value);

        let kmTotal = this.endKmInput.value - this.startKmInput.value;
        userInput.push(kmTotal);

        userInput.push(this.fuelTypeInput.value);

        userInput.push(this.fuelPriceInput.value);

        userInput.push(this.fuelAmountInput.value);

        let priceTotal = this.fuelPriceInput.value * this.fuelAmountInput.value;
        userInput.push(priceTotal);

        this.logbookEntries.push(userInput);

        return userInput;


    }

    validateUserInput() {
        //checks if user input is valid
        //checks if kmEnd > kmStart, if fuelAmount > 10
        //checks if all required fields are filled

        if (this.dateInput.value === "" || this.startKmInput.value === "" || this.endKmInput.value === ""
            || this.fuelPriceInput.value === "" || this.fuelAmountInput.value === "") {
            alert("Bitte füllen Sie alle Pflichtfelder aus.");
            return false;
        }

        let kmEnd = parseInt(this.endKmInput.value);
        let kmStart = parseInt(this.startKmInput.value);

        if (kmEnd <= kmStart) {
            alert("Der Kilometerstand zum Ende der Fahrt muss größer als der Kilometerstand zum Beginn der Fahrt sein.");
            return false;
        }

        if (parseInt(this.fuelAmountInput.value) < 10) {
            alert("Es müssen mindestens 10 Liter getankt werden.");
            return false;
        }

        return true;
    }

    createLogbook() {
        //creates the basic structure of the logbook and appends them to the html-table
        let logbookHeader = this.prepareLogbookHeader();
        this.outputArea.appendChild(logbookHeader);

        for (let i=0; i<this.logbookEntries.length; i++) {
            let logbookEntry = this.logbookEntries[i];
            let logbookLine = this.prepareLogbookLine(logbookEntry);
            this.outputArea.appendChild(logbookLine);
        }
    }

    prepareLogbookHeader() {
        let logbookHeader = document.createElement('tr');

        for (let i = 0; i < this.firstRowLabels.length; i++) {
            let logbookHeaderCell = document.createElement('th');
            logbookHeaderCell.innerText = this.firstRowLabels[i];
            logbookHeaderCell.classList.add('logbookHeaderCell');
            logbookHeader.appendChild(logbookHeaderCell);
        }
        return logbookHeader;

    }

    prepareLogbookLine(userInput) {
        //creates one line of the logbook with Data from userinput-Array
        let rowLogbook = document.createElement('tr');

        for (let i = 0; i < userInput.length; i++) {
            let logbookLineCell = document.createElement('td');
            logbookLineCell.innerText = userInput[i];
            logbookLineCell.classList.add('logbookCell');
            rowLogbook.appendChild(logbookLineCell);
        }

        return rowLogbook;
    }


    deleteLastEntry(){
        this.outputArea.innerHTML = " ";
        this.logbookEntries.pop();
        this.createLogbook();
     }

     deleteLogbook(){
        this.outputArea.innerHTML = " ";
        this.logbookEntries = [];

     }
}