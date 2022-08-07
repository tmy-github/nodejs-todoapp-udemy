const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDom = document.querySelector(".task-input");
const formAlertDom = document.querySelector(".form-alert");

// /api/v1/tasks からタスクを取得する
const showTasks = async () => {
    try {
        // 自作のapi をたたく
        const { data: tasks } = await axios.get("/api/v1/tasks");

        // タスクが一つもないとき
        if (tasks.length < 1) {
            tasksDOM.innerHTML = `<h5 class="empty-list">No Tasks</h5>`;
            return;
        }

        // タスクを出力
        const allTasks = tasks.map((task) => {
            const { completed, _id, name } = task;

            return `<div class="single-task ${completed && "task-completed"}">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`
        }).join("");
        tasksDOM.innerHTML = allTasks;
    } catch (error) {
        console.log(error);
    }
};

showTasks();

// タスクを新規作成する
formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = taskInputDom.value;

    try {
        await axios.post("/api/v1/tasks", { name: name });
        showTasks();
        taskInputDom.value = "";
        formAlertDom.style.display = "block";
        formAlertDom.textContent = "Task Added";
        formAlertDom.classList.add("text-success");
    } catch (error) {
        console.log(error);
        formAlertDom.style.display = "block";
        formAlertDom.innerHTML = "Invalid Task Name. Please Fix it.";
    }
    setTimeout(() => {
        formAlertDom.style.display = "none";
        formAlertDom.classList.remove("text-success");
    }, 3000);
});

// タスクを削除する
tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    if (element.parentElement.classList.contains("delete-btn")) {
        const id = element.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (error) {
            console.log(error);
        }
    }
});