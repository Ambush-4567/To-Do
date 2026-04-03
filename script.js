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
    {
        Text: "try adding your own task.",
        Priority: "low",
        Due: "27/3/26",
        ID: 1,
    }
];

let doneItems = [
    {

    }
];

let count = 0;

function startUp()
{
    //document.getElementById('print1').innerHTML = ("startUp ran")
    initialiseDates();
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

    const selectedMonth = monthSelect.value; 
    const daysInMonth = monthDays[selectedMonth];

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


    const date = "27/3/26";
    let date2 = toString(day) + "/" + month + "/" + toString(year);

    return date2;
}

function pushObject(newTask, priority, date)
{
    count++;
    let localcount = count -1;
    //document.getElementById('print1').innerHTML = "Text:" + newTask + " Priority:" + priority + " Date:" + date;
    let taskInfo = {
        Text: newTask,
        Priority: priority,
        Due: date, 
        ID: localcount,
    };
    listItems.push(taskInfo);
    document.getElementById('print1').innerHTML = JSON.stringify(listItems);
}

function createTask(textInfo, priority, date)
{
    // this will make all id's seperate. This should align with the array index, -1 cause of zero-indexing.
    let localcount = count -1;

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
    };

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
    checkBox.onclick = function() {
        moveTask(localcount);
    };
    taskInstance.appendChild(checkBox);

    parentLocation.appendChild(taskInstance);
    //document.getElementById('print3').innerHTML = taskInstance.id;
}

function deleteTask(param)
{
    if (confirm("This task will be deleted. Are you sure?")) {
        //document.getElementById('print4').innerHTML = "deleteFound! " + param;
        let deletedElement = document.getElementById("task" + param);
        //document.getElementById('print4').innerHTML = deletedElement;
        deletedElement.remove();
    }
    
}

function moveTask(param)
{
    // cut from listItems array
    let element = listItems.splice(param, 1);

    // add to finished array
    doneItems.push(element);

    // fuck with classlists
    let movedElement = document.getElementById("task" + param);
    movedElement.classList.remove('textBorder');
    movedElement.classList.add('doneBorder');

    // append element to new parent
    document.getElementById('div3').appendChild(movedElement);

    // save to localstorage
}