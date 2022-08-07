const taskIDDOM = document.querySelector(`.task-edit-id`);
const taskNameDOM = document.querySelector(`.task-edit-name`);
const editFormDOM = document.querySelector(`.single-task-form`);
const formAlertDom = document.querySelector(`.form-alert`);
const taskCompletedDOM = document.querySelector(`.task-edit-completed`);

const params = window.location.search;
const id = new URLSearchParams(params).get("id");

// 一つの特定のタスクを取得する
const showTask = async () => {
    try {
        const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
        const { _id, completed, name } = task;
        taskIDDOM.textContent = _id;
        taskNameDOM.value = name;
        taskCompletedDOM.checked = completed;
    } catch (error) {
        console.log(error);
    }
};
showTask();

// タスクの編集
editFormDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;
        const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });
        formAlertDom.style.display = "block";
        formAlertDom.textContent = "Edit Succeeded";
        formAlertDom.classList.add("text-success");
    } catch (error) {
        console.log(error);
    }

    setTimeout(() => {
        formAlertDom.style.display = "none";
        formAlertDom.classList.remove("text-success");
    }, 3000);

});