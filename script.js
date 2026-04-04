const monthDays = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30, 
    July: 31,
    August: 31, 
    September: 30,
    October: 31,
    November: 30,
    December: 31,
};

let listItems = [
    //{
        //Text: "try adding your own task.",
        //Priority: "Medium",
        //Due: "27/3/26",
        //ID: 1,
    //}
];

let doneItems = [
    
];

let state = [ {
    currentIndex: 0,
    }
];

function startUp()
{
    //document.getElementById('print1').innerHTML = ("startUp ran")
    initialiseDates();
    importData();
    setInterval(printArr, 500);
    document.getElementById('month').addEventListener('change', initialiseDays);
    document.addEventListener('keydown', function(event) {
    // Check if the key pressed was 'Enter'
    if (event.key === 'Enter') {
        document.getElementById('print2').innerHTML = ("yes enter was pressed");
        if (validateText()) {
            
        } else {
            document.getElementById('print4').innerHTML = ("message was invalid");
        }
    }

});
}

function printArr()
{
    document.getElementById('print1').innerHTML = JSON.stringify(listItems) + " Done array next: " + JSON.stringify(doneItems);
}

function saveData()
{
    localStorage.setItem('listItems', JSON.stringify(listItems));
    localStorage.setItem('doneItems', JSON.stringify(doneItems));
    localStorage.setItem('state', JSON.stringify(state));
}

function importData()
{
    if (localStorage.getItem('listItems')) {
       listItems = JSON.parse(localStorage.getItem('listItems'));
       importOngoing(listItems); }
    if (localStorage.getItem('doneItems')) {
       doneItems = JSON.parse(localStorage.getItem('doneItems'));
       importDone(doneItems); }
    if (localStorage.getItem('state')) {
       state = JSON.parse(localStorage.getItem('state')); }
}

function deleteData()
{
    if (confirm("Are you sure you want to delete all data?")) {
       localStorage.clear();
	   location.reload(); 
    }

}

function initialiseDates()
{
    const monthSelect = document.getElementById('month');
    // the array is an object, and specifically a key-value pair. selecting the 'keys' specifically will return month names rather than month days.
    const months = Object.keys(monthDays);

    // let i begin at 0. while i is less than the amount of months, increment i after creating a new option element as a child of the select id at "months".
    for (let i = 0; i < months.length; i++) {
        let monthOption = document.createElement('option');
        monthOption.value = months[i];
        monthOption.text = months[i];
        monthSelect.appendChild(monthOption);
    }
    initialiseDays();
}

function initialiseDays()
{
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');

    let selectedMonth = monthSelect.value; 
    let daysInMonth = monthDays[selectedMonth];

    daySelect.innerHTML = ""; // clear previous options

    for (let i = 0; i < daysInMonth; i++) {
        let dayOption = document.createElement('option');
        dayOption.value = i + 1;
        dayOption.text = i + 1;
        daySelect.appendChild(dayOption);
    }
}

function validateText()
{
    let newTask = document.getElementById('userInput').value;
    if (newTask.length == 0) {
        return false;
    }
    document.getElementById('print3').innerHTML = typeof newTask;
    let priority = readPriority();
    let date = readDate();
    pushObject(newTask, priority, date);
    createTask(newTask, priority, date);
    saveData();
}

function readPriority()
{
    const prioritySelect = document.getElementById('priority').value;
    return prioritySelect;
}

function readDate()
{
    let day = document.getElementById('day').value;
    let month = document.getElementById('month').value;
    let year = document.getElementById('year').value;

    // convert written month to month shorthand
    // same keys as done in date initialisation
    const monthNames = Object.keys(monthDays);
    // find index where, for example, January (month var) = January (object) in the array.
    let originalPos = monthNames.findIndex(index => index === month);
    //document.getElementById('print5').innerHTML = "array position is: " + originalPos;
    let correctedMonth = originalPos + 1;

    let date2 = day + "/" + correctedMonth + "/" + year;

    return date2;
}

function pushObject(newTask, priority, date)
{
    // state is equal to 0 on first call of this func
    let currentIndex = state[0].currentIndex;

    //document.getElementById('print1').innerHTML = "Text:" + newTask + " Priority:" + priority + " Date:" + date;
    let taskInfo = {
        Text: newTask,
        Priority: priority,
        Due: date, 
        ID: currentIndex,
    };
    //state[0].currentIndex++;
    listItems.push(taskInfo);
    document.getElementById('print1').innerHTML = JSON.stringify(listItems);
}

function createTask(textInfo, priority, date)
{
    // this will make all id's seperate. This should align with the array index, -1 cause of zero-indexing.
    let currentIndex = state[0].currentIndex;
    let localcount = currentIndex;

    // a new div element, with id of 'task' + count, and class to add fancy border
    let taskInstance = document.createElement("div");
    taskInstance.id = "task" + localcount;
    taskInstance.classList.add('textBorder');

    // use date to append to end of text element for readability.
    let modifiedText = textInfo + " Due (" + date + ")";

    // make text into a paragraph element. add class for styling, then append to taskInstance (above) to make it a child.
    let textInstance = document.createElement("p");
    textInstance.classList.add('para', 'ubuntu-medium-italic');
    textInstance.textContent = modifiedText;
    taskInstance.appendChild(textInstance);

    let parentLocation = orderPriority(priority);

    // deletebutton has a class which will add a trash png and red backdrop. 
    let deleteButton = document.createElement("img");
    deleteButton.classList.add('trash');
    deleteButton.onclick = function() {
        deleteTask(localcount);
    };
    taskInstance.appendChild(deleteButton);

    let checkBox = document.createElement("input");
    checkBox.type = 'checkbox';
    checkBox.classList.add('checkBox');
    checkBox.id = "move" + localcount;
    checkBox.onclick = function() {
        moveTask(localcount);
    };
    taskInstance.appendChild(checkBox);

    parentLocation.appendChild(taskInstance);
    //document.getElementById('print3').innerHTML = taskInstance.id;
    state[0].currentIndex++;
    saveData();
}

function importOngoing(array)
{
    for (let i = 0; i < array.length; i++) {

        // a new div element, with id of 'task' + count, and class to add fancy border
        let taskInstance = document.createElement("div");
        taskInstance.id = "task" + array[i].ID;
        taskInstance.classList.add('textBorder');

        // use date to append to end of text element for readability.
        let modifiedText = array[i].Text + " Due (" + array[i].Due + ")";

        // make text into a paragraph element. add class for styling, then append to taskInstance (above) to make it a child.
        let textInstance = document.createElement("p");
        textInstance.classList.add('para', 'ubuntu-medium-italic');
        textInstance.textContent = modifiedText;
        taskInstance.appendChild(textInstance);

        let parentLocation = orderPriority(array[i].Priority);

        // deletebutton has a class which will add a trash png and red backdrop. 
        let deleteButton = document.createElement("img");
        deleteButton.classList.add('trash');
        deleteButton.onclick = function() {
            deleteTask(array[i].ID);
        };
        taskInstance.appendChild(deleteButton);

        let checkBox = document.createElement("input");
        checkBox.type = 'checkbox';
        checkBox.classList.add('checkBox');
        checkBox.id = "move" + array[i].ID;
        checkBox.onclick = function() {
            moveTask(array[i].ID);
        };
        taskInstance.appendChild(checkBox);

        parentLocation.appendChild(taskInstance);
    }
}

function importDone(array)
{
    for (let i = 0; i < array.length; i++) {

        // a new div element, with id of 'task' + count, and class to add fancy border
        let taskInstance = document.createElement("div");
        taskInstance.id = "task" + array[i].ID;
        taskInstance.classList.add('doneBorder');

        // use date to append to end of text element for readability.
        let modifiedText = array[i].Text + " Due (" + array[i].Due + ")";

        // make text into a paragraph element. add class for styling, then append to taskInstance (above) to make it a child.
        let textInstance = document.createElement("p");
        textInstance.classList.add('para', 'ubuntu-medium-italic');
        textInstance.textContent = modifiedText;
        taskInstance.appendChild(textInstance);

        // deletebutton has a class which will add a trash png and red backdrop. 
        let deleteButton = document.createElement("img");
        deleteButton.classList.add('trash');
        deleteButton.onclick = function() {
            deleteTask(array[i].ID);
        };
        taskInstance.appendChild(deleteButton);

        let checkBox = document.createElement("input");
        checkBox.type = 'checkbox';
        checkBox.classList.add('checkBox');
        checkBox.id = "move" + array[i].ID;
        checkBox.onclick = function() {
            reinstateTask(array[i].ID);
        };
        taskInstance.appendChild(checkBox);

        document.getElementById('div3').appendChild(taskInstance);
    }
}

function orderPriority(priority)
{
    // default div location for new element if all goes wrong
    let parentLocation = document.getElementById('div2');

    // use priority parameter to move taskInstance into a sub-div of div2. 
    let prio = priority;
    if (prio == "High") {
        parentLocation = document.getElementById('High');
    } else if (prio == "Medium") {
        parentLocation = document.getElementById('Medium');
    } else {
        parentLocation = document.getElementById('Low');
    }
    return parentLocation;
}

function deleteTask(param)
{
    if (confirm("This task will be deleted. Are you sure?")) {
        //document.getElementById('print4').innerHTML = "deleteFound! " + param;
        let deletedElement = document.getElementById("task" + param);
        //document.getElementById('print4').innerHTML = deletedElement;
        deletedElement.remove();
    }
    saveData();
    
}

function moveTask(param)
{
    // cut from listItems array
    let elementIndex = listItems.findIndex(index => index.ID === Number(param));
    let element = listItems.splice(elementIndex, 1)[0];

    //if (elementIndex === -1) return;


    // add to finished array
    doneItems.push(element);

    // fuck with classlists
    let movedElement = document.getElementById("task" + param);
    movedElement.classList.remove('textBorder');
    movedElement.classList.add('doneBorder');

    // access child checkbox
    var checkBox = document.getElementById('move' + param);
     
    checkBox.onclick = null;
    checkBox.onclick = function() {
        reinstateTask(param);
    };

    // append element to new parent
    document.getElementById('div3').appendChild(movedElement);

    // save to localstorage
    saveData();
}

function reinstateTask(param)
{
    
    let elementIndex = doneItems.findIndex(item => item.ID === Number(param));
    
    //if (elementIndex === -1) return;

    let element = doneItems.splice(elementIndex, 1)[0];
    document.getElementById('print4').innerHTML = 'this ran';
    listItems.push(element);

    let movedElement = document.getElementById("task" + param);
    movedElement.classList.remove('doneBorder');
    movedElement.classList.add('textBorder');

    let checkBox = document.getElementById('move' + param);
    checkBox.onclick = () => moveTask(param);

    let priorityIndex = listItems.findIndex(item => item.ID === param);
    if (priorityIndex === -1) return;

    let priority = listItems[priorityIndex].Priority;
    let parentLocation = orderPriority(priority);

    parentLocation.appendChild(movedElement);

    saveData();
}

function exportSave()
{
    const gameData = JSON.parse(localStorage.getItem('gS'));
    const jsonData2 = JSON.stringify(gameData);

    const dataURL = window.URL.createObjectURL(new Blob([jsonData2], {type: 'text/json'}));

    const link = document.createElement('a');
    link.href = dataURL;
    link.setAttribute('download', 'gameData2.json');
    link.click();   
}

function importData() 
{
    const importFileInput = document.getElementById('importFile');

    importFileInput.addEventListener('change', (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const importedData = JSON.parse(e.target.result);
                gS = { ...gS, ...importedData }; // Merge importedData into gS
saveGame(); // Save updated gS to localStorage
};

            reader.readAsText(file);
        }
    });
}
