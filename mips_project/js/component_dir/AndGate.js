class AndGate extends Component {
    constructor(x, y) {
        super(x, y, 55, 55, "And", 4.5, 1.7);
        this.x = x;
        this.y = y;
        this.input1;
        this.input2;
        this.output;
        this.generateIO();
    }

    generateIO() {
        this.input1 = new Node(this.x, this.y + 10, false);
        this.input2 = new Node(this.x, this.y + 35, false);
        this.output = new Node(this.x + this.width, this.y + 25, false);

        nodes.push(this.input1, this.input2, this.output);
    }

    update() {
        this.output.changeValue(this.input2.value && this.input1.value);
    }

    show() {
        noFill();
        arc(
            this.x + 26,
            this.y + 26,
            this.width,
            this.height,
            radians(-85),
            radians(85)
        );
        beginShape();
        vertex(this.x + 30, this.y - 1);
        vertex(this.x, this.y - 1);
        vertex(this.x, this.y + this.height - 2);
        vertex(this.x + 30, this.y + this.height - 2);

        endShape();
    }
}