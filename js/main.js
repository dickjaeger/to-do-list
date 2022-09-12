{
    let tasks = [
        {
            content: "pozmywać naczynia",
            done: false,
        },
        {
            content: "odrobić zadanie z YouCode",
            done: true,
        }
    ];

    const addTask = () => {
        const newTaskContent = document.querySelector(".js-taskContent").value.trim();

        if (!newTaskContent) {
            return;
        }

        tasks.push({
            content: newTaskContent,
        })
    }

    const onFormSubmit = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            addTask();
            render();
        });
    }

    const render = () => {
        const taskListElement = document.querySelector(".js-taskList");
        let htmlString = "";

        for (const task of tasks) {
            htmlString +=
                `<li class="section__listItem">
                    <button class="section__doneButton"></button>
                    <div class="section__taskTextContainer">${task.content}</div>
                    <button class="section__removeButton">&#128465</button>
                </li>`
        }

        taskListElement.innerHTML = htmlString;
    };

    const init = () => {
        render();
        onFormSubmit();
    };

    init();
}