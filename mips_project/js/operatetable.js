// 获取执行按钮和canvas-container元素
let executeButton = document.querySelector('#inst-form button[type="submit"]');
let canvasContainer = document.querySelector('#canvas-container');
let selectedValue;
let operatorArray = [];
let draggable = document.getElementById('draggable-book');
let addressBook = document.getElementById('address-book');
let isDragging = false;
let prevX, prevY;
// 初始时设置canvas-container为隐藏
canvasContainer.style.display = 'none';

// 为执行按钮添加点击事件监听器
executeButton.addEventListener('click', function() {
    // 在点击事件发生时，改变canvas-container的样式，使其可见
    canvasContainer.style.display = 'flex';
    let instructionSelect = document.getElementById('instruction');
    selectedValue = instructionSelect.value;
    // 为operatorArray数组添加元素
    let index = 0;
    let array = table[selectedValue];
    operatorArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 1) {
            operatorArray.push(op_operation_index[i]);
        }
    }
    let tbody = document.querySelector('#address-body');
    tbody.innerHTML = '';
    operatorArray.forEach(function(item, index) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = item;
        td.classList.add('w-1/2');
        td.classList.add('text-center');
        tr.appendChild(td);
        // 如果索引是偶数，设置背景颜色为灰色
        if (index % 2 === 0) {
            tr.classList.add('tr-gray');
        } else { // 如果索引是奇数，设置背景颜色为白色
            tr.classList.add('tr-white');
        }
        tbody.appendChild(tr);
    });
    addressBook.style.display = 'block';
});

addressBook.addEventListener('mousedown', function(e) {
    if (e.target === draggable) {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
    }
});

window.addEventListener('mousemove', function(e) {
    if (isDragging) {
        let newX = addressBook.offsetLeft + (e.clientX - prevX);
        let newY = addressBook.offsetTop + (e.clientY - prevY);
        addressBook.style.left = newX + 'px';
        addressBook.style.top = newY + 'px';
        prevX = e.clientX;
        prevY = e.clientY;
    }
});

window.addEventListener('mouseup', function() {
    isDragging = false;
});

const op_code_index = {
    "Add": 0,
    "Sub": 1,
    "And": 2,
    "Or": 3,
    "Jr": 4,
    "Addi": 5,
    "Lw": 6,
    "Sw": 7,
    "Beq": 8,
    "J": 9
}

const op_operation_index = [
    "PC->Instruction Memory",
    "PC+1->PC",
    "Instruction Memory->Control",
    "1->RegDest",
    "1->RegWrite",
    "1->AluSrc",
    "1->MemWrite",
    "1->MemRead",
    "1->MemToReg",
    "1->Branch",

    "1->Jump",

    "(rs)+(rt)->rd",
    "(rs)-(rt)->rd",
    "(rs)&(rt)->rd",
    "(rs)|(rt)->rd",
    "(rs)->pc",
    "(rs)+(sign-extend)immediate->rt",
    "DataMemory[(rs)+(sign-extend)immediate]->rt",
    "rt->DataMemory[(rs)+(sign-extend)immediate]",
    "if rs=rt then PC+4+(sign-extend)immediate->PC else PC+4->PC",

    "Address->PC"

]

const table = {
    "Add":[1,1,1,1,1,
        0,0,0,0,0,0,
        1,0,0,0,0,
        0,0,0,0,0],
    "Sub":[1,1,1,1,1,
        0,0,0,0,0,0,
        0,1,0,0,0,
        0,0,0,0,0],
    "And":[1,1,1,1,1,
        0,0,0,0,0,0,
        0,0,1,0,0,
        0,0,0,0,0],
    "Or":[1,1,1,1,1,
        0,0,0,0,0,0,
        0,0,0,1,0,
        0,0,0,0,0],
    "Jr":[1,0,1,1,1,
        0,0,0,0,0,0,
        0,0,0,0,1,
        0,0,0,0,0],
    "Addi":[1,1,1,0,0,
        1,0,0,0,0,0,
        0,0,0,0,0,
        1,0,0,0,0],
    "Lw":[1,1,1,0,1,
        1,0,1,1,0,0,
        0,0,0,0,0,
        0,1,0,0,0],
    "Sw":[1,1,1,0,0,
        1,1,0,0,0,0,
        0,0,0,0,0,
        0,0,1,0,0],
    "Beq":[1,1,1,0,0,
        0,0,0,0,0,0,
        0,0,0,0,0,
        0,0,0,1,0],
    "J":[1,0,1,0,0,
        1,0,0,0,0,1,
        0,0,0,0,0,
        0,0,0,0,1]

}

function closeTable() {
    addressBook.style.display = 'none';
}


