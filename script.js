
let listItems = [
    {
        Text: "try adding your own task.",
        Priority: "low",
        Due: "27/3/26",
        ID: 1,
    }
];

let count = 0;

function startUp()
{
    //document.getElementById('print1').innerHTML = ("startUp ran")
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
    const date = "27/3/26";
    return date;
}

function pushObject(newTask, priority, date)
{
    count++;
    let localcount = count;
    //document.getElementById('print1').innerHTML = "Text:" + newTask + " Priority:" + priority + " Date:" + date;
    let taskInfo = {
        Text: newTask,
        Priority: priority,
        Due: date, 
        ID: localcount,
    };
    listItems.push(taskInfo);
    document.getElementById('print1').innerHTML = listItems;
}

function createTask(textInfo, priority, date)
{
    // this will make all id's seperate. This should align with the array index, -1 cause of zero-indexing.
    let localcount = count;

    // a new div element, with id of 'task' + count, and class to add fancy border
    let taskInstance = document.createElement("div");
    taskInstance.id = "task" + localcount;
    taskInstance.classList.add('textBorder');

    // use date to append to end of text element for readability.
    let modifiedText = textInfo + " Due (" + date + ")"

    // make text into a paragraph element. add class for styling, then append to taskInstance (above) to make it a child.
    let textInstance = document.createElement("p");
    textInstance.classList.add('para');
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
        parentLocation = document.getElementById('High');
    };

    parentLocation.appendChild(taskInstance);
}