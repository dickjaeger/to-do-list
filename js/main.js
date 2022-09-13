{
    let tasks = [
        {
            content: "pozmywać naczynia",
            done: false,
        },
        {
            content: "odrobić zadanie z YouCode",
            done: true,
        },
    ];

    let readyTaskHided = false;

    const addTask = (newTaskContent) => {
        if (newTaskContent === "") {
            return;
        };

        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleHideDoneTask = () => {
        readyTaskHided = !readyTaskHided;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContentElement = document.querySelector(".js-taskContent");
        const newTaskContent = newTaskContentElement.value.trim();

        addTask(newTaskContent);

        newTaskContentElement.value = "";
        newTaskContentElement.focus();
    };

    const bindEvents = () => {
        const doneButtons = document.querySelectorAll(".js-doneButton");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-removeButton");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleHideDoneTaskButton = document.querySelector(".js-toggleHideDoneTask");
        if (toggleHideDoneTaskButton) {
            toggleHideDoneTaskButton.addEventListener("click", () => {
                toggleHideDoneTask();
            });
        };
    };

    const renderList = () => {
        const taskListElement = document.querySelector(".js-taskList");
        let htmlString = "";

        for (const task of tasks) {
            htmlString +=
                `<li class="taskList__listItem">
                    <button class="taskList__button js-doneButton">
                        ${task.done ? "&#10004" : ""}
                    </button>
                    <div class="taskList__textContainer${task.done ? " taskList__textContainer--done" : ""}">
                        ${task.content}
                    </div>
                    <button class="taskList__button taskList__button--remove js-removeButton">&#128465</button>
                </li>`;
        };

        taskListElement.innerHTML = htmlString;
    }

    const renderButtons = () => {
        const buttonsContainerElement = document.querySelector(".js-buttonsContainer");
        const htmlString =
            tasks.length === 0 ? "" :
                `
                <button class="section__button js-toggleHideDoneTask">
                        ${readyTaskHided ? "Pokaż ukończone" : "Ukryj ukończone"}
                </button>
                <button class="section__button">Ukończ wszystkie</button>
            `;
        buttonsContainerElement.innerHTML = htmlString;
    }

    const render = () => {
        renderList();
        renderButtons();
        bindEvents();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}