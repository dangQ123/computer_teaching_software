class DataMemory extends Component {
    constructor(x, y) {
        super(x, y, 100, 150, "Data Memory", 15, 1.1);
        this.inputs = [];
        this.output;
        this.additionalInputs = [];
        this.generateIO();
    }

    generateIO() {
        for (let i = 1; i < 3; i++) {
            this.inputs.push(new Node(this.x, this.y + (this.height * i) / 3, false));
        }

        this.output = new Node(
            this.x + this.width,
            this.y + this.height / 3,
            false
        );

        // 两个控制信号
        this.additionalInputs.push(
            new Node(this.x + this.width / 2, this.y, false),
            new Node(this.x + this.width / 2, this.y + this.height, false)
        );

        nodes = nodes.concat(this.inputs).concat(this.additionalInputs);
        nodes.push(this.output);
    }

    update() {
        if (this.additionalInputs[1].value) {
            this.output.changeValue(
                dectoBin(organizer.getMemValue(binToHex(this.inputs[0].value)))
            );
        }

        if (this.additionalInputs[0].value) {
            organizer.updateMemValue(
                binToHex(this.inputs[0].value),
                binToDec(this.inputs[1].value)
            );
            updateMemories();
        }
    }

    show() {
        rect(this.x, this.y, this.width, this.height);
    }
}