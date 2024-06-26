class Register extends Component {
    constructor(x, y) {
        super(x, y, 100, 150, "Registers", 4, 1.1);
        this.inputs = [];
        this.outputs = [];
        this.additionalInput;
        this.generateIO();
    }

    generateIO() {
        for (let i = 0; i < 4; i++) {
            this.inputs.push(new Node(this.x, this.y + 20 + i * 30, false));
        }

        for (let i = 1; i < 3; i++) {
            this.outputs.push(
                new Node(this.x + this.width, this.y + (this.height * i) / 3, false)
            );
        }

        this.additionalInput = new Node(this.x + this.width / 2, this.y, false);
        nodes.push(this.additionalInput);
        nodes = nodes.concat(this.inputs).concat(this.outputs);
    }

    update(writeToReg = false) {
        let regValues = organizer.getRegValues();
        this.outputs[0].changeValue(
            dectoBin(regValues[binToDec(this.inputs[0].value) - 1])
        );
        this.outputs[1].changeValue(
            dectoBin(regValues[binToDec(this.inputs[1].value) - 1])
        );
        if (writeToReg && this.additionalInput.value) {
            // 更改对应寄存器的值
            regValues[binToDec(this.inputs[2].value) - 1] = binToDec(
                this.inputs[3].value
            ).toString();

            updateRegisters(regValues);
        }
    }

    show() {
        rect(this.x, this.y, this.width, this.height);
    }
}