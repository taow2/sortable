const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    // dragstart is an event that will be fired as soon as a thing is dragged
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

containers.forEach(container => {
    // dragover fires when an obj is dragged & hoving on the container
    container.addEventListener('dragover', e => {
        // preventDefault is change the cursor when hoving, it shows at default a prohibited sign
        e.preventDefault();

        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if(afterElement == null) {
            container.appendChild(draggable);
        }
        else {
            container.insertBefore(draggable, afterElement);
        }


    });
});

// y is the y-pos of mouse, this fcn is to determine which block is closest to the dragged
function getDragAfterElement(container, y) {
    // :not(.dragging) will make it exclude the dragging class
    // [...] makes it an array
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    // the 2nd parameter is just initial closest, can set to infinity at default
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        // distance btw center of the box and the cursor, here box.top is margin-top
        const offset = y - box.top - box.height / 2
        // console.log(offset);
        if(offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        }
        else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}