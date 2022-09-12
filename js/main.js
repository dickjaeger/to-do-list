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

    const addTask = () => {
        const newTaskContentElement = document.querySelector(".js-taskContent");
        const newTaskContent = newTaskContentElement.value.trim();

        if (!newTaskContent) {
            newTaskContentElement.focus();
            return;
        };

        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const onFormSubmit = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            addTask();
            form.reset();
        });
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
    };

    const render = () => {
        const taskListElement = document.querySelector(".js-taskList");
        let htmlString = "";

        for (const task of tasks) {
            htmlString +=
                `<li class="section__listItem">
                    <button class="section__doneButton js-doneButton">
                        ${task.done ? "&#10004" : ""}
                    </button>
                    <div class="section__taskTextContainer${task.done ? " section__taskTextContainer--done" : ""}">
                        ${task.content}
                    </div>
                    <button class="section__removeButton js-removeButton">&#128465</button>
                </li>`;
        };

        taskListElement.innerHTML = htmlString;

        bindEvents();
    };

    const init = () => {
        render();
        onFormSubmit();
    };

    init();
}