class Node {
  constructor(x, y, value = false) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.colorValue = color(255, 0, 0);
    this.isPopupOpen = false;
    this.rollover = false;
    this.hasValue = false;
    this.isDontCare = false;
    this.changeValue(value);
  }

  // 根据startnode的值改变endnode的值
  changeValue(value) {
    // value有可能是X，也有可能是true或false
    this.value = value;
    // 如果value是X，那么hasValue为true
    this.hasValue = value !== false && value !== true;
    if (this.hasValue) {
      if (value == "X") {
        this.colorValue = color(0, 255, 255);
      } else {

        this.colorValue = color(0, 0, 255);
      }
    } else {
      if (this.value) {
        this.colorValue = color(0, 255, 0);
      } else {
        this.colorValue = color(255, 0, 0);
      }
    }
  }

  showValue() {
    fill(0);
    noStroke();
    textSize(15);
    text(this.value, this.x - 15, this.y);
    fill(255);
    stroke(0);
    strokeWeight(2);
  }

  mouseToNodeDistance() {
    return (this.x - mouseX) ** 2 + (this.y - mouseY) ** 2;
  }

  update() {
    let d = this.mouseToNodeDistance();
    this.rollover = d < 40 && d > 0;
  }

  onClick() {
    if (this.rollover) {
      this.isPopupOpen = !this.isPopupOpen;
      this.rollover = false;
    }
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  showPopup() {
    let val = this.value.length > 6 ? binToHex(this.value) : this.value;
    let width = val.length * 10 + 50;

    fill(255);
    rect(this.x - width / 2, this.y - 50, width, 40, 20);
    fill(0);
    noStroke();
    textSize(15);
    text(val, this.x - width / 2 + 25, this.y - 25);
    fill(255);
    stroke(0);
    strokeWeight(2);
    noFill();
  }

  show() {
    fill(this.colorValue);
    ellipse(this.x, this.y, 14);
    noFill();
    this.hasValue && (this.isPopupOpen || this.rollover) && this.showPopup();
  }

  draw() {
    this.show();
    this.update();
  }
}
