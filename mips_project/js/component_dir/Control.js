class Control extends Component {
    constructor(x, y, text) {
        super(x, y, 50, 200, text, 2.5, 5);
        this.input;
        this.outputs = [];
        this.generateIO();
    }

    generateIO() {
        this.input = new Node(this.x, this.y + this.height / 2, false);
        for (let i = 1; i < 11; i++) {
            this.outputs.push(
                new Node(this.x + this.width, this.y + (this.height * i) / 11, false)
            );
        }
        nodes.push(this.input);

        nodes = nodes.concat(this.outputs);
    }

    update() {
        let opCode = this.input.value;
        this.outputs[0].changeValue(opCode == "000000"); // regdest
        this.outputs[1].changeValue(opCode == "000010" || opCode == "000011"); //jump
        this.outputs[2].changeValue(opCode == "000000"); //jr

        this.outputs[3].changeValue(opCode == "000100"); //branch
        this.outputs[4].changeValue(opCode == "100011"); //memread
        this.outputs[5].changeValue(opCode == "100011"); // memtoreg
        if (["000000"].includes(opCode)) {
            this.outputs[6].changeValue("10");
        } else if (["100011", "101011"].includes(opCode)) { // 是否为lw或sw
            this.outputs[6].changeValue("00");
        } else if (opCode == "000100") { // 是否为beq
            this.outputs[6].changeValue("01");
        } else {
            this.outputs[6].changeValue("11"); //X
        } //aluop
        this.outputs[7].changeValue(opCode == "101011"); //memwrite
        this.outputs[8].changeValue(opCode != "000000" && opCode != "000100"); //alusrc
        this.outputs[9].changeValue(
            !["101011", "000010", "000100"].includes(opCode)
        ); //regwrite

    }

    drawText() {
        fill(5, 176, 239);
        noStroke();
        textSize(15);
        text(
            this.text,
            this.x + this.width / this.textXOffset,
            this.y + this.height / this.textYOffset
        );
        fill(255);
        stroke(0);
        strokeWeight(2);
    }

    show() {
        stroke(5, 176, 239);
        rect(this.x, this.y, this.width, this.height, 50);
    }
}