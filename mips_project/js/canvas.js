let components = [];
let wires = [];
let points = [];
let nodes = [];
let cnv;
let pc;
let register;

function init() {
  setSelectOptions();
  setRegInputs();
  let originX = 0;
  let originY = 25;
  let skyColor = color(5, 176, 239);
  pc = new Pc(originX + 50, originY + 350);
  let alu1 = new Alu(originX + 140, originY + 50, true, "00100");
  let alu2 = new Alu(originX + 715, originY + 90, true);
  let alu3 = new Alu(originX + 650, originY + 325, false);
  let im = new InstructionMemory(originX + 150, originY + 350);
  register = new Register(originX + 400, originY + 350);
  let dm = new DataMemory(originX + 825, originY + 400);
  let mux1 = new Mux(originX + 325, originY + 410);
  let mux2 = new Mux(originX + 580, originY + 400, false);
  let mux3 = new Mux(originX + 975, originY + 300, true);
  let mux4 = new Mux(originX + 980, originY + 6.5, true, true);
  let mux5 = new Mux(originX + 880, originY + 50);
  let muxJR = new Mux(originX + 1060, originY + 80);
  // muxJR.text = "M\nu\nx\nJR";
  // mux1.text = "M\nu\nx\n1";
  // mux2.text = "M\nu\nx\n2";
  // mux3.text = "M\nu\nx\n3";
  // mux4.text = "M\nu\nx\n4";
  // mux5.text = "M\nu\nx\n5";
  let signExtend = new Ellipse(
    originX + 450,
    originY + 525,
    "Sign\nExtend",
    66
  );
  let aluControl = new Ellipse(
    originX + 580,
    originY + 580,
    "Alu\nControl",
    66,
    true
  );
  let shift = new Ellipse(originX + 600, originY + 195, "Shift\nLeft 2", 66);
  let topShift = new Ellipse(originX + 400, originY, "Shift\nLeft 2", 66);
  let truncate = new Ellipse(originX + 540, originY + 18, "", 30, true);

  let control = new Control(
    originX + 340,
    originY + 125,
    "C\nO\nN\nT\nR\nO\nL"
  );
  let and = new AndGate(originX + 800, originY + 290);

  let i20Node = new Node(im.output.x + 25, register.inputs[1].y);

  let mux3toReg4_2 = new Node(register.inputs[3].x - 25, mux3.output.y + 350);

  let seNode = new Node(signExtend.input.x - 50, signExtend.input.y);
  let aluNode = new Node(signExtend.input.x - 50, signExtend.input.y);

  let muxJRtoPc_1 = new Node(pc.input.x - 25, pc.input.y - 435);

  let regDest_1 = new Node(
    control.outputs[0].x - 125,
    control.outputs[0].y - 35
  );

  let regDest_2 = new Node(mux1.additionalInput.x, mux1.additionalInput.y + 25);

  let jump_1 = new Node(control.outputs[1].x + 220, control.outputs[1].y);

  let jump_2 = new Node(mux4.additionalInput.x, mux4.additionalInput.y - 25);

  let memToRegNode = new Node(
    mux3.additionalInput.x,
    mux3.additionalInput.y - 66
  );
  let aluOpNode = new Node(
    aluControl.additionalInput.x,
    aluControl.additionalInput.y + 50
  );

  let aluCOutputNode = new Node(alu3.additionalInput.x, aluControl.output.y);

  let aluCToJrNode = new Node(muxJR.additionalInput.x, aluControl.output.y);

  let alu3SecondNode = new Node(alu3.outputs[1].x + 40, alu3.outputs[1].y);

  let memWriteNode = new Node(dm.additionalInputs[0].x, control.outputs[7].y);

  let aluSrcNode = new Node(mux2.additionalInput.x - 40, control.outputs[8].y);

  let aluSrcNode1 = new Node(
    mux2.additionalInput.x,
    mux2.additionalInput.y + 15
  );

  let regNode = new Node(register.additionalInput.x, control.outputs[9].y);
  let memReadNode_1 = new Node(
    dm.additionalInputs[1].x + 175,
    control.outputs[4].y
  );

  let memReadNode_3 = new Node(
    dm.additionalInputs[1].x,
    dm.additionalInputs[1].y + 25
  );

  let branchNode = new Node(control.outputs[3].x + 265, control.outputs[3].y);
  let alu0Node = new Node(alu1.outputs[0].x + 50, alu1.outputs[0].y);
  let alu1Node = new Node(alu2.inputs[0].x - 65, mux5.inputs[0].y);

  let addToShiftNode = new Node(truncate.additionalInput.x, mux5.inputs[0].y);

  let regOutput1Node = new Node(
    register.outputs[1].x + 20,
    register.outputs[1].y
  );

  let andOutputNode = new Node(mux5.additionalInput.x, and.output.y);
  let reg0Node1 = new Node(alu3.inputs[0].x - 50, alu3.inputs[0].y);

  let reg0Node2 = new Node(and.output.x + 80, and.output.y - 35);

  components.push(
    pc,
    alu1,
    im,
    topShift,
    control,
    mux1,
    signExtend,
    register,
    mux2,
    aluControl,
    alu3,
    shift,
    alu2,
    truncate,
    dm,
    and,
    mux3,
    mux5,
    mux4,
    muxJR
  );

  let wire0 = new Wire({ startNode: pc.output, endNode: im.input });
  let wire1 = new Wire({ startNode: pc.output, endNode: alu1.inputs[0] });

  pc.setWires([wire0, wire1]);

  let wire2 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: topShift.input,
  });
  let wire3 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: control.input,
  });
  let wire4 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: register.inputs[0],
  });
  let wire5 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: i20Node,
  });
  let wire6 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: mux1.inputs[1],
  });
  let wire7 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: seNode,
  });
  let wire8 = new Wire({
    isManuel: true,
    startNode: im.output,
    endNode: aluNode,
  });
  let wire5_1 = new Wire({
    startNode: i20Node,
    endNode: register.inputs[1],
  });
  let wire5_2 = new Wire({
    startNode: i20Node,
    endNode: mux1.inputs[0],
  });
  let wire7_1 = new Wire({
    startNode: seNode,
    endNode: signExtend.input,
  });
  let wire8_1 = new Wire({
    startNode: aluNode,
    endNode: aluControl.input,
  });

  im.setWires([
    wire2,
    wire3,
    wire4,
    wire5,
    wire6,
    wire7,
    wire8,
    wire5_1,
    wire5_2,
    wire7_1,
    wire8_1,
  ]);

  let wire11 = new Wire({
    isManuel: true,
    startNode: alu1.outputs[0],
    endNode: alu0Node,
  });
  let wire11_1 = new Wire({
    startNode: alu0Node,
    endNode: alu1Node,
  });

  let wire11_1_1 = new Wire({
    startNode: alu1Node,
    endNode: alu2.inputs[0],
    backwards: true,
  });
  let wire11_2 = new Wire({
    startNode: alu1Node,
    endNode: mux5.inputs[0],
    backwards: true,
  });
  let wire12 = new Wire({
    isManuel: true,
    startNode: alu0Node,
    endNode: addToShiftNode,
  });
  let wire12_1 = new Wire({
    startNode: addToShiftNode,
    endNode: truncate.additionalInput,
    backwards: true,
  });

  alu1.setWires([wire11, wire12, wire11_1, wire11_1_1, wire11_2, wire12_1]);

  let wire13 = new Wire({
    startNode: mux1.output,
    endNode: register.inputs[2],
  });
  mux1.setWires([wire13]);

  let wire14 = new Wire({ startNode: signExtend.output, endNode: shift.input });
  let wire15 = new Wire({
    startNode: signExtend.output,
    endNode: mux2.inputs[1],
  });
  signExtend.setWires([wire14, wire15]);

  let wire16 = new Wire({
    startNode: register.outputs[0],
    endNode: reg0Node1,
  });

  let wire16_1 = new Wire({
    startNode: reg0Node1,
    endNode: alu3.inputs[0],
  });

  let wire16_2 = new Wire({
    startNode: reg0Node1,
    endNode: reg0Node2,
    backwards: true,
  });

  let wire16_2_1 = new Wire({
    startNode: reg0Node2,
    endNode: muxJR.inputs[1],
    backwards: true,
  });

  let wire17 = new Wire({
    startNode: register.outputs[1],
    endNode: regOutput1Node,
  });
  let wire17_1 = new Wire({
    startNode: regOutput1Node,
    endNode: mux2.inputs[0],
    backwards: true,
  });
  let wire17_2 = new Wire({
    startNode: regOutput1Node,
    endNode: dm.inputs[1],
    backwards: true,
  });

  register.setWires([
    wire16,
    wire17,
    wire16_1,
    wire16_2,
    wire16_2_1,
    wire17_1,
    wire17_2,
  ]);

  let wire18 = new Wire({ startNode: mux2.output, endNode: alu3.inputs[1] });
  mux2.setWires([wire18]);

  let wire35 = new Wire({
    startNode: alu3.outputs[0],
    endNode: and.input2,
  });

  let wire19 = new Wire({
    startNode: alu3.outputs[1],
    endNode: alu3SecondNode,
  });
  let wire19_1 = new Wire({
    startNode: alu3SecondNode,
    endNode: dm.inputs[0],
    backwards: true,
  });
  let wire19_2 = new Wire({
    startNode: alu3SecondNode,
    endNode: mux3.inputs[1],
    backwards: true,
  });
  alu3.setWires([wire19, wire35,
    wire19_1,
    wire19_2]);

  let wire20 = new Wire({ startNode: dm.output, endNode: mux3.inputs[0] });
  dm.setWires([wire20]);

  let wire21 = new Wire({ startNode: mux3.output, endNode: mux3toReg4_2 });

  let wire21_1_1 = new Wire({
    startNode: mux3toReg4_2,
    endNode: register.inputs[3],
    backwards: true,
  });
  mux3.setWires([wire21, wire21_1_1]);

  let wire22 = new Wire({ startNode: shift.output, endNode: alu2.inputs[1] });
  shift.setWires([wire22]);

  let wire23 = new Wire({
    startNode: truncate.output,
    endNode: mux4.inputs[0],
  });
  truncate.setWires([wire23]);

  let wire24 = new Wire({
    startNode: topShift.output,
    endNode: truncate.input,
    backwards: true,
  });
  topShift.setWires([wire24]);

  let wire25 = new Wire({
    startNode: alu2.outputs[0],
    endNode: mux5.inputs[1],
  });
  alu2.setWires([wire25]);

  let wire26 = new Wire({ startNode: mux4.output, endNode: muxJR.inputs[0] });

  mux4.setWires([wire26]);

  let wire27 = new Wire({
    startNode: control.outputs[0],
    endNode: regDest_1,
    wireColor: skyColor,
    text: "RegDest",
    textXOffset: 30,
    textYOffset: -5,
  });
  let wire27_1 = new Wire({
    startNode: regDest_1,
    endNode: regDest_2,
    backwards: true,
    wireColor: skyColor,
  });
  let wire27_1_1 = new Wire({
    startNode: regDest_2,
    endNode: mux1.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });

  let wire28 = new Wire({
    startNode: control.outputs[1],
    endNode: jump_1,
    wireColor: skyColor,
    text: "Jump",
    textXOffset: 35,
    textYOffset: 2,
  });
  let wire28_1 = new Wire({
    startNode: jump_1,
    endNode: jump_2,
    backwards: true,
    wireColor: skyColor,
  });
  let wire28_1_1 = new Wire({
    startNode: jump_2,
    endNode: mux4.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });
  let wire29 = new Wire({
    startNode: control.outputs[4],
    endNode: memReadNode_1,
    wireColor: skyColor,
    text: "MemRead",
    textXOffset: 35,
    textYOffset: 2,
  });
  let wire29_1 = new Wire({
    startNode: memReadNode_1,
    endNode: memReadNode_3,
    backwards: true,
    wireColor: skyColor,
  });
  let wire29_1_1 = new Wire({
    startNode: memReadNode_3,
    endNode: dm.additionalInputs[1],
    backwards: true,
    wireColor: skyColor,
  });
  let wire30 = new Wire({
    startNode: control.outputs[5],
    endNode: memToRegNode,
    wireColor: skyColor,
    text: "MemToReg",
    textXOffset: 35,
    textYOffset: 2,
  });

  let wire30_1 = new Wire({
    startNode: memToRegNode,
    endNode: mux3.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });
  let wire31 = new Wire({
    startNode: control.outputs[6],
    endNode: aluOpNode,
    wireColor: skyColor,
    text: "ALUOp",
    textXOffset: 15,
  });
  let wire31_1 = new Wire({
    startNode: aluOpNode,
    endNode: aluControl.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });
  let wire32 = new Wire({
    startNode: control.outputs[7],
    endNode: memWriteNode,
    wireColor: skyColor,
    text: "MemWrite",
    textXOffset: 40,
    textYOffset: 2,
  });
  let wire32_1 = new Wire({
    startNode: memWriteNode,
    endNode: dm.additionalInputs[0],
    backwards: true,

    wireColor: skyColor,
  });

  let wire33 = new Wire({
    startNode: control.outputs[8],
    endNode: aluSrcNode,
    wireColor: skyColor,
    text: "ALUSrc",
    textXOffset: 50,
    textYOffset: 2,
  });
  let wire33_1 = new Wire({
    startNode: aluSrcNode,
    endNode: aluSrcNode1,
    backwards: true,
    wireColor: skyColor,
  });

  let wire33_1_1 = new Wire({
    startNode: aluSrcNode1,
    endNode: mux2.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });
  let wire34 = new Wire({
    startNode: control.outputs[9],
    endNode: regNode,
    backwards: true,
    wireColor: skyColor,
    text: "RegWrite",
    textXOffset: 65,
    textYOffset: 20,
  });
  let wire34_1 = new Wire({
    startNode: regNode,
    endNode: register.additionalInput,
    backwards: true,
    wireColor: skyColor,
  });

  let wire36 = new Wire({
    startNode: control.outputs[3],
    endNode: branchNode,
    wireColor: skyColor,
    text: "Branch",
    textXOffset: 35,
    textYOffset: 2,
  });
  let wire36_1 = new Wire({
    startNode: branchNode,
    endNode: and.input1,
    wireColor: skyColor,
  });

  control.setWires([
    wire27,
    wire28,
    wire29,
    wire30,
    wire31,
    wire32,
    wire33,
    wire34,
    wire36,
    wire27_1,
    wire27_1_1,
    wire28_1,
    wire28_1_1,
    wire29_1,
    wire29_1_1,
    wire30_1,
    wire31_1,
    wire32_1,
    wire33_1,
    wire33_1_1,
    wire34_1,
    wire36_1,
  ]);

  let wireJr = new Wire({
    startNode: aluControl.output,
    endNode: aluCToJrNode,
    wireColor: skyColor,
    isManuel: true,
    isGradient: true,
  });

  let wire37 = new Wire({
    startNode: aluControl.output,
    endNode: aluCOutputNode,
  });

  let wireJr_1 = new Wire({
    startNode: aluCToJrNode,
    endNode: muxJR.additionalInput,
    backwards: true,
    wireColor: skyColor,
    text: "JumpReg",
  });

  let wire37_1 = new Wire({
    startNode: aluCOutputNode,
    endNode: alu3.additionalInput,
    backwards: true,
  });
  aluControl.setWires([wireJr, wire37, wire37_1, wireJr_1]);

  let wire38 = new Wire({
    startNode: and.output,
    endNode: andOutputNode,
  });

  let wire38_1 = new Wire({
    startNode: andOutputNode,
    endNode: mux5.additionalInput,
    backwards: true,
  });

  and.setWires([wire38, wire38_1]);

  let wire39 = new Wire({ startNode: mux5.output, endNode: mux4.inputs[1] });
  mux5.setWires([wire39]);

  let wire40 = new Wire({
    startNode: muxJR.output,
    endNode: muxJRtoPc_1,
  });

  let wire40_1 = new Wire({
    startNode: muxJRtoPc_1,
    endNode: pc.input,
    backwards: true,
  });

  muxJR.setWires([wire40, wire40_1]);

  wires = [];
  components.forEach((component) => {
    wires = [...wires, ...component.wires];
  });

  points.push(
    new BlackNode(originX + 125, originY + 425),
    new BlackNode(originX + 300, originY + 400),
    new BlackNode(originX + 540, originY + 453),
    new BlackNode(originX + 520, originY + 450),
    new BlackNode(originX + 790, originY + 425),
    new BlackNode(originX + 425, originY + 558),
    new BlackNode(originX + 650, originY + 76),
    new BlackNode(originX + 554.5, originY + 75),
    new BlackNode(originX + 600, originY + 355),
    new BlackNode(alu3.additionalInput.x, aluControl.output.y)
  );
}

function setup() {
  cnv = createCanvas(1200, 750);
  cnv.parent(select("#canvas-container"));
  init();
}

function draw() {
  background(255);

  noFill();
  for (let i = 0; i < wires.length; i++) {
    wires[i].draw();
  }
  fill(255);

  for (let i = 0; i < components.length; i++) {
    components[i].draw();
  }

  for (let i = 0; i < points.length; i++) {
    points[i].draw();
  }

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].draw();
  }
}

function mousePressed() {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].onClick();
  }
}