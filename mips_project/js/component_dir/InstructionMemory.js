class InstructionMemory extends Component {
    constructor(x, y) {
        super(x, y, 100, 150, "Instruction\nMemory", 4, 1.2);
        this.input;
        this.output;
        this.generateIO();
        this.wires = [];
    }

    generateIO() {
        this.input = new Node(this.x, this.y + this.height / 2, false);
        this.output = new Node(
            this.x + this.width,
            this.y + this.height / 2,
            false
        );

        nodes.push(this.input, this.output);
    }

    update() {
        let code = organizer.getPcValue(this.input.value).replaceAll(" ", "");
        this.output.changeValue(code);
        // 不包含操作码
        this.wires[0].endNode.changeValue(code.substring(6));
        // 操作码
        this.wires[1].endNode.changeValue(code.substring(0, 6));
        // 从寄存器中读取的第一个操作数
        this.wires[2].endNode.changeValue(code.substring(6, 11));
        // 从寄存器中读取的第二个操作数
        this.wires[3].endNode.changeValue(code.substring(11, 16));
        // 从寄存器中读取的第三个个操作数
        this.wires[4].endNode.changeValue(code.substring(16, 21));
        // 立即数
        this.wires[5].endNode.changeValue(code.substring(16));
        // 获取function code
        this.wires[6].endNode.changeValue(code.substring(26));
    }

    show() {
        rect(this.x, this.y, this.width, this.height);
    }
}