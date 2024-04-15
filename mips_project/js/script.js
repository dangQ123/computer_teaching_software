// 显示的3个寄存器输入例子
const reg_3display_input = [...document.querySelectorAll(".reg-input-1")];
// 隐示的3个地址、偏移量、立即数输入例子
const reg_3notdisplay_input = [...document.querySelectorAll(".reg-input-2")];
// 立即数的标签
const input3Label = document.getElementById("input3-label");
// 寄存器选择标签
const regSelects = document.querySelectorAll(".reg-select");
// 寄存器输入表格
const regInputContainer = document.getElementById("reg-input-container");
// 内存记录
const memContainer = document.getElementById("mem-container");
// container包含寄存器输入表格和内存记录
const container = document.getElementById("container");

// 寄存器表单，包含提交按钮
const regForm = document.getElementById("reg-form");

// 所有select标签
const instFormInputs = document.querySelectorAll(".inst-form-input");

// 指令二进制表示
const instructionCodeContainer = document.getElementById("instruction-code");
const organizer = new Organizer();

function startCycle(code) {
  organizer.updatePcValues(code);
  for (let i = 0; i < components.length; i++) {
    // setTimeout(() => {
    components[i].update();
    components[i].updateWires();
    components[i].isVisited = true;
    // }, i * 200);
  }
  register.update(true);
}

// function goOneCycle() {
//   for (let i = 0; i < components.length; i++) {
//     // setTimeout(() => {
//     components[i].update();
//     components[i].updateWires();
//     components[i].isVisited = true;
//     // }, i * 200);
//   }
//   register.update(true);
// }

// 初始化输入寄存器表格
function setSelectOptions() {
  regSelects.forEach((regSelect) => {
    for (let i = 1; i < 32; i++) {
      let opt = document.createElement("option");
      opt.value = "$" + i;
      opt.innerHTML = "$" + i;
      regSelect.append(opt);
    }
  });
}

// 设置寄存器输入表格样式
function setRegInputs() {
  for (let i = 1; i < 32; i++) {
    let inpContainer = document.createElement("div");
    inpContainer.classList.add("border-2");
    let p = document.createElement("p");
    p.classList.add("text-center");
    p.innerText = "$" + i;
    let inpInnerContainer = document.createElement("div");
    inpInnerContainer.classList.add("text-center");
    let inp = document.createElement("input");
    inp.setAttribute("type", "text");
    inp.setAttribute("placeholder", "..");
    inp.setAttribute("size", "2");
    inp.setAttribute("maxlength", "2");
    inp.setAttribute("name", "reg-" + i);
    inp.setAttribute("value", 0);
    inp.classList.add("text-center", "border-2", "rounded", "mb-1");
    inpInnerContainer.append(inp);
    inpContainer.append(p);
    inpContainer.append(inpInnerContainer);
    regInputContainer.append(inpContainer);
  }
}

// 指令改变时的监听函数
function setInstruction(e) {
  organizer.setInstruction(e.target.value);
  resetInputs();
  let instruction = organizer.getInstruction();
  if (instruction == "Jr") {
    showInput([0]);
  } else if (["J", "Jal"].includes(instruction)) {
    showInput[0];
    showSecondInput(0);
  } else if (instruction == "Addi") {
    showInput([0, 1, 2]);
    showSecondInput(2);
  } else if (["Lw", "Sw"].includes(instruction)) {
    showInput([0, 1, 2]);
    showSecondInput(1);
  } else if (instruction == "Beq") {
    showInput([0, 1, 2]);
    showSecondInput(2);
    input3Label.innerText = "Target";
  } else {
    showInput([0, 1, 2]);
  }
}

// 重置，全hidden
function resetInputs() {
  [...reg_3display_input, ...reg_3notdisplay_input].map((inp) => inp.classList.add("hidden"));
  input3Label.innerText = "Immediate";
}

// 重新展现出来，删除hidden
function showInput(indexes) {
  indexes.map((index) => {
    reg_3display_input[index].classList.remove("hidden");
  });
}

// 将默认的第一个输入框hidden，第二个展现
function showSecondInput(index) {
  reg_3display_input[index].classList.add("hidden");
  reg_3notdisplay_input[index].classList.remove("hidden");
}

function updateIC() {
  instructionCodeContainer.innerText = organizer.getICode();
}

// 按下execute, 执行指令
function run(e) {
  e.preventDefault();
  let inpValues = [];
  // 获取所有输入框的值，放入到inpValues中，如 inpValues = Array(4) [Add,$3,$1,$2]
  instFormInputs.forEach((inp) => {
    if (!inp.parentElement.classList.contains("hidden")) {
      inpValues.push(inp.value);
    }
  });
  let instruction = organizer.setInstruction(inpValues[0]).toLowerCase();
  let opCode = opCodes[instruction];
  let icArray = [opCode];
  let codeLength = 6;
  let iData;

  const type =
    opCode === "000000"
      ? "R"
      : opCode === "000010" || opCode === "000011"
      ? "J"
      : "I";

  for (let i = 1; i < inpValues.length; i++) {
    const element = inpValues[i].split("$");
    if (element.length == 2) {
      icArray.push(dectoBin(element[1], 5));
      codeLength += 5;
    } else {
      iData = element[0];
    }
  }

  if (opCode != "000100" && opCode != "000010" && opCode != "000011") {
    // 修改寄存器的顺序，使其满足mips的要求
    icArray.push(icArray.splice(1, 1)[0]);
  }
  if (type == "R")
  {
    let funcCode = functionBits[instruction];
    console.log(instruction, funcCode);
    icArray.push(dectoBin(0, 5));
    icArray.push(funcCode);
    if (funcCode == "001000") {
      icArray.splice(3, 0, dectoBin(0, 5));
      icArray.splice(3, 0, dectoBin(0, 5));
      codeLength += 10;
    }
    codeLength += 5 + funcCode.length;
  }

  if (iData) {
    icArray.push(dectoBin(iData, 32 - codeLength));
  }

   organizer.setICode(icArray.join(" "));
  instructionCodeContainer.innerText = organizer.getICode();
  startCycle(organizer.getICode());
}

// 十进制转换为二进制
function dectoBin(num, size) {
  let bin = (Number(num) >>> 0).toString(2);
  while (bin.length < size) {
    bin = "0" + bin;
  }
  return bin;
}

// 二进制转换为十进制
function binToDec(bin) {
  return parseInt(bin, 2);
}

// 二进制转换为十六进制
function binToHex(bin) {
  let hex = parseInt(bin, 2).toString(16).toUpperCase();
  while (hex.length < 8) {
    hex = "0" + hex;
  }
  return "0x" + hex;
}

//切换container元素的展示和隐藏状态
function toggleForm() {
  if (container.getAttribute("isExpanded") == "true") {
    container.style.maxHeight = "0px";
    container.setAttribute("isExpanded", "false");
  } else {
    container.style.maxHeight = "500px";
    container.setAttribute("isExpanded", "true");
  }
}

// 获取寄存器表单的内容，填充到organizer中，点击submit按钮时触发
function setOrganizerRegValues(e) {
  e.preventDefault();
  const formData = new FormData(regForm);
  organizer.setRegValues([...formData.values()]);
}

// 设置寄存器表单的内容，展示给用户看
function updateRegisters(regValues) {
  let regs = regInputContainer.children;
  for (let i = 0; i < regValues.length; i++) {
    regs[i + 1].children[1].querySelector("input").value = regValues[i];
  }
  organizer.setRegValues(regValues);
}

// 更新内存记录
function updateMemories() {
  let tempContainer = document.createElement("div");
  let memValues = organizer.getMemValues();
  for (const [key, value] of Object.entries(memValues)) {
    let con = document.createElement("div");
    con.classList.add("flex");
    let child1 = document.createElement("div");
    child1.classList.add("border-2", "border-gray-500", "border-r-0", "p-3");
    child1.innerText = key;
    let child2 = document.createElement("div");
    child2.classList.add("border-2", "border-gray-500", "p-3");
    child2.innerText = value;
    con.append(child1, child2);
    tempContainer.append(con);
  }
  memContainer.innerHTML = tempContainer.innerHTML;
}

function openPopups() {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].openPopup();
  }
}

function closePopups() {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].closePopup();
  }
}

// 渐变色线条
function gradientLine(x1, y1, x2, y2, color1, color2) {
  var grad = this.drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);

  this.drawingContext.strokeStyle = grad;
}
