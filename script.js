
let listItem = [
    {
        Text: "try adding your own task.",
        Priority: 3,
        Due: "27/3/26",
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
    createTask(newTask);
}

function createTask(textInfo)
{
    count++;
    let localcount = count;

    let taskInstance = document.createElement("div");
    taskInstance.id = "task" + localcount;
    taskInstance.classList.add('textBorder');

    let textInstance = document.createElement("p");
    textInstance.classList.add('para');
    textInstance.textContent = textInfo;
    taskInstance.appendChild(textInstance);

    document.getElementById("div2").appendChild(taskInstance);
}