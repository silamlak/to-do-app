const inputs = document.querySelector(".wrapper input");
const counts = document.querySelector(".count");
const add = document.querySelector(".add");
const para = document.querySelector(".para");
const error = document.querySelector(".error");

let taskCount = 0;

const displayCount = (taskCount) => {
  counts.innerHTML = taskCount;
};

const addtask = () => {
  const addnewtask = inputs.value.trim();
  error.style.display = "none";
  if (!addnewtask) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `<div class="parag">
    <div class="checkings">
      <input type="checkbox" class="check">
      <span class="taskname">${addnewtask}</span>
    </div>
    <div class="buttons">
      <button class="edit"> <i class="fa-solid fa-pen-to-square"></i> </button>
      <button class="delete"> <i class="fa-light fa-square-minus"></i> </button>
    </div>
  </div>`;

  inputs.value = '';
  para.insertAdjacentHTML("beforeend", task);

  taskCount++;
  displayCount(taskCount);


  
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((targetElement) => {
    targetElement.onclick = (e) => {
      const grandparentElement = e.target.closest(".parag");
      if (grandparentElement) {
        const checkbox = grandparentElement.querySelector(".check");
        if (!checkbox.checked) {
          const taskNameElement = grandparentElement.querySelector(".taskname");
          if (taskNameElement) {
            inputs.value = taskNameElement.innerText;
          }
          grandparentElement.remove();
          taskCount--;
          displayCount(taskCount);
        }
      }
    };
  });



  const deleteButtons = document.querySelectorAll(".delete");
deleteButtons.forEach((targetElement) => {
  targetElement.onclick = (e) => {
    const grandparentElement = e.target.closest(".parag");
    if (grandparentElement) {
      const checkbox = grandparentElement.querySelector(".check");
      if (!checkbox.checked) {
        grandparentElement.remove();
        taskCount--;
        displayCount(taskCount);
      } else {
        grandparentElement.remove();
        displayCount(taskCount);
      }
    }
  };
});

  

  const check = document.querySelectorAll('.check');
  check.forEach(checke => {
    checke.onchange = () => {
      checke.nextElementSibling.classList.toggle("completed");
      if (checke.checked) {
        taskCount--;
      } else {
        taskCount++;
      }
      displayCount(taskCount);
    };
  });
};

add.addEventListener("click", addtask);

