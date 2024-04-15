class Mux extends Component {
    constructor(x, y, toTop = false, updateAddress = false) {
        super(x, y, 35, 80, "M\nU\nX", 3, 3);
        this.inputs = [];
        this.output;
        this.additionalInput;
        this.toTop = toTop;
        this.generateIO();
        this.updateAddress = updateAddress;
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

        this.additionalInput = new Node(
            this.x + this.width / 2,
            this.y + (this.toTop ? 0 : this.height),
            false
        );

        nodes.push(this.additionalInput, this.output);
        nodes = nodes.concat(this.inputs);
    }

    update() {
        if (this.additionalInput.value == "X") {
            this.output.changeValue("X");
            return;
        }
        if (this.additionalInput.value) {
            this.output.changeValue(
                this.toTop ? this.inputs[0].value : this.inputs[1].value
            );
        } else {
            this.output.changeValue(
                this.toTop ? this.inputs[1].value : this.inputs[0].value
            );
        }

        this.updateAddress && organizer.setCurrAddress(this.output.value);
    }

    show() {
        rect(this.x, this.y, this.width, this.height, 55);
    }
}