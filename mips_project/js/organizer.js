class Organizer {
  constructor() {
    this.instructionCode = "";
    this.instruction = "add";
    this.regValues = Array(31).fill("0");
    this.memValues = [];
    this.pcValues = {};
    this.currAddress = "00000000000000000000000101011000";
  }

  setICode(code) {
    this.instructionCode = code;
  }

  getICode() {
    return this.instructionCode;
  }

  setInstruction(i) {
    this.instruction = i;
    return this.instruction;
  }

  getInstruction() {
    return this.instruction;
  }

  getRegValues() {
    return this.regValues;
  }

  setRegValues(values) {
    this.regValues = values;
  }

  getMemValue(address) {
    if (!this.memValues[address]) {
      this.updateMemValue(address, 0);
      updateMemories();
    }
    return this.memValues[address];
  }

  updateMemValue(address, value) {
    this.memValues[address] = value;
  }

  getMemValues() {
    return this.memValues;
  }

  getPcValue(key) {
    return this.pcValues[key];
  }

  updatePcValues(pc_value) {
    this.pcValues[this.currAddress] = pc_value;
  }

  getCurrAddress() {
    return this.currAddress;
  }

  setCurrAddress(cur_address) {
    this.currAddress = cur_address;
    return this.currAddress;
  }
}
