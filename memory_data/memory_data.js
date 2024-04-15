
const type_code = {
    'INT':'0',
    'FLOAT':'1'
}
function numToArray32(num, type) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    if (type === type_code.INT) {
        view.setInt32(0, num, false);
    } else if (type === type_code.FLOAT) {
        view.setFloat32(0, num, false);
    }

    let binaryString = '';
    for (let i = 0; i < 4; i++) {
        binaryString += ('00000000' + view.getUint8(i).toString(2)).slice(-8);
    }

    return binaryString.split('').map(bit => parseInt(bit, 10));
}

function array32ToNum(array, type) {
    const binaryString = array.join('');
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    for (let i = 0; i < 4; i++) {
        view.setUint8(i, parseInt(binaryString.slice(i * 8, i * 8 + 8), 2));
    }

    if (type === type_code.INT) {
        return view.getInt32(0, false);
    } else if (type === type_code.FLOAT) {
        return view.getFloat32(0, false);
    }
}

document.getElementById('decimalToBinaryButton').addEventListener('click', function() {
    const num = document.getElementById('decimalInput').value;
    const type = document.getElementById('dataType1').value;
    const array32 = numToArray32(num, type);
    document.getElementById('binaryOutput').textContent = '二进制输出: ' + array32.join('');
});

document.getElementById('binaryToDecimalButton').addEventListener('click', function() {
    const array = document.getElementById('binaryInput').value.split('').map(bit => parseInt(bit, 10));
    const type = document.getElementById('dataType2').value;
    const num = array32ToNum(array, type);
    document.getElementById('decimalOutput').textContent = '十进制输出: ' + num;
});