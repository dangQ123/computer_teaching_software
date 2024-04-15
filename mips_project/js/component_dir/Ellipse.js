class Ellipse extends Component {
  constructor(x, y, text, r, hasAdditional = false) {
    super(x, y, r, r, text, 7, 2.5);
    this.input;
    this.output;
    this.hasAdditional = hasAdditional;
    this.additionalInput;
    this.generateIO();
  }

  generateIO() {
    if (this.hasAdditional) {
      this.additionalInput = new Node(
        this.x + this.width / 2,
        this.y + this.height,
        false
      );
      nodes.push(this.additionalInput);
    }
    this.input = new Node(this.x, this.y + this.height / 2, false);
    this.output = new Node(
      this.x + this.width,
      this.y + this.height / 2,
      false
    );
    nodes.push(this.input, this.output);
  }

  update() {
    // https://www.comp.nus.edu.sg/~adi-yoga/CS2100/ch08c2/
    // https://www.cs.princeton.edu/courses/archive/fall15/cos375/lectures/08-Control-3x1.pdf
    let value = this.input.value;
    let aluOp = this.additionalInput?.value;

    if (this.text == "Shift\nLeft 2") {
      // shift left 2
      value = "00" + value;
      this.output.changeValue(value.slice(2) + value.slice(0, 2));
    } else if (this.text == "Sign\nExtend") {
        // sign extend
      this.output.changeValue(
        (value = value[0].repeat(32 - value.length) + value)
      );
    } else if (this.text == "Alu\nControl") {
      // alu control
      // ADD 010
      // SUB 110
      // AND 000
      // OR  001
      // jr  011
      // Addi 010
      // lw 010
      // sw 010
      // beq 110
      // J 010

      let aluop1 = aluOp[0] == "1";
      let aluop0 = aluOp[1] == "1";

      // value共有6位，取其后4位
      let f0 = value[5] == "1";
      let f1 = value[4] == "1";
      let f2 = value[3] == "1";
      let f3 = value[2] == "1";

      let a1 = aluop0 && aluop1;
      let a2 = (f1 && aluop1) || aluop0;
      let op3 = "";
      let op2 = a1 ^ a2; // (!a1 && a2) || (!a2 && a1)
      let op1 = !f2 || !aluop1 || a1;
      let op0 = (f0 || f3) && aluop1 && !aluop0;

      this.output.changeValue(op3 + +op2 + +op1 + +op0);
      // 判断是否jr，激活后续的mux
      this.wires[0].endNode.changeValue(value == "001000" && aluOp == "10");
    } else {
      // truncate
      this.output.changeValue(aluOp + "" + this.input.value);
    }
  }

  show() {
    rect(this.x, this.y, this.width, this.height, 50);
  }
}