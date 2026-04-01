
let listItem = [
    {
        Text: "try adding your own task.",
        Priority: 3,
        Due: "27/3/26",
    }
];

function startUp()
{
    //document.getElementById('print1').innerHTML = ("startUp ran")
    document.addEventListener('keydown', function(event) {
    // Check if the key pressed was 'Enter'
    if (event.key === 'Enter') {
        document.getElementById('print2').innerHTML = ("yes enter was pressed")
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
    return true;
}