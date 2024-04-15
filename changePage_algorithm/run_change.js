const confirm_button = document.getElementById('confirm_button');
let cache_size;
let algorithm;
let algorithm_span = document.getElementById('algorithm_span');
let cache_size_span = document.getElementById('cache_size_span');
let test_data;
let execute_button = document.getElementById('execute');

let test_data_button = document.getElementById('test_data_button');
test_data_button.addEventListener('click', function() {
    // Generate an array of random numbers
    let randomArray = Array.from({length: 15}, () => Math.floor(Math.random() * 11));

    // Convert the array to a string with line breaks
    let testDataString = randomArray.join('\n');

    // Set the content of the test_data element
    let testDataElement = document.getElementById('test_data');
    testDataElement.value = testDataString;

});

// 创建小方格
function createSquares(cache_size) {
    let display_result = document.getElementById("display_result");
    while (display_result.firstChild) {
        display_result.removeChild(display_result.firstChild);
    }
    for (let i = 0; i < cache_size; i++) {
        const square = document.createElement("div");
        square.style.width = "50px";
        square.style.height = "50px";
        square.style.border = "1px solid black";
        square.style.display = "inline-block";
        square.style.textAlign = "center";
        square.style.lineHeight = "50px";
        square.id = "square" + i;
        display_result.appendChild(square);
    }
}

// 填入数字
function setNumber(number, index) {
    const square = document.getElementById("square" + index);
    if (square&&number) {
        square.innerHTML = number;
    }
}

let arrayNum = [];
let array_span = document.getElementById('array')

confirm_button.addEventListener('click', function() {
    arrayNum=[];
    cache_size = document.getElementById('cache_size').value;
    cache_size = parseInt(cache_size);
    algorithm = document.getElementById('algorithm').value;
    test_data = document.getElementById('test_data').value;
    if (!(cache_size && algorithm && test_data)){
        alert('请设置参数');
    }else{
        algorithm_span.innerHTML = algorithm;
        cache_size_span.innerHTML = cache_size;
        let testData = document.getElementById('test_data').value;
        let lines = testData.split('\n');
        lines.forEach(line => {
            let num = parseInt(line, 10);
            if (!isNaN(num)) {
                arrayNum.push(num);
            }
        });
        let close_button = document.getElementById('close_button');
        close_button.click();
        createSquares(cache_size);
        runTime = 1;
        array_span.innerHTML = arrayNum.join(' ');
    }
});

let visitedNum= 0;
let hitNum = 0;
let missNum = 0;
let visitedTime = document.getElementById('visitedTime');
let hitTime = document.getElementById('hitTime');
let missTime = document.getElementById('missTime');

let hitPercent = document.getElementById('hitPercent');
let missPercent = document.getElementById('missPercent');

visitedTime.innerHTML = visitedNum;
hitTime.innerHTML = hitNum;
missTime.innerHTML = missNum;
hitPercent.innerHTML = 0+'%';
missPercent.innerHTML = 0+'%';

let runTime = 1;
function colorNum(index) {
    // 将array_span的内容分割为一个数组

    let array = arrayNum;

    // 检查索引是否在数组的范围内
    if (index >= 0 && index < array.length) {
        // 将指定索引的元素的颜色修改为红色
        array[index] = '<span style="color:red;">' + array[index] + '</span>';
    }

    // 将修改后的数组重新连接为一个字符串，并设置为array_span的内容
    array_span.innerHTML = array.join(' ');
}
execute_button.addEventListener('click', function() {
   if (!(cache_size && algorithm && test_data)){
       alert('请先设置参数');
   }
   else{
       let info;
       colorNum(runTime-1);
       if (algorithm==='FIFO'){
            info = FIFO_Run(runTime);
            runTime++;
       }
       else if(algorithm==='LRU'){
           info = LRU_Run(runTime);
           runTime++;
       }
       else if(algorithm==='OPT'){
           info = OPT_Run(runTime);
           runTime++;
       }
       else{
       }
       visitedTime.innerHTML = info.visitCount;
       hitTime.innerHTML = info.hitCount;
       missTime.innerHTML = info.missCount;
       hitPercent.innerHTML = ((0.0+info.hitCount)/info.visitCount*100).toFixed(2)+'%';
       missPercent.innerHTML = ((0.0+info.missCount)/info.visitCount*100).toFixed(2)+'%';
   }

});

function FIFO_Run(runTime){

    let info = {
      visitCount:runTime,
        hitCount:0,
        missCount:0
    };

    // 实际页面中的位置
    let cache = new Array(cache_size);

    // 最近访问队列
    let cacheQueue = [];
    let out ;

    if (runTime>arrayNum.length){
        console.log('error!')
        return;
    }
    let count = 0;
    for (let i=0;i<runTime;i++){
        if(cacheQueue.length<cache_size){
            let pos = cacheQueue.indexOf(arrayNum[i]);
            if(pos!==-1){
                // cacheQueue.splice(pos,1);
                info.hitCount++;
            }else{
                cache[count]=arrayNum[i];
                count++;
                cacheQueue.push(arrayNum[i]);
                info.missCount++;
            }

        }
        else{
            let pos = cacheQueue.indexOf(arrayNum[i]);
            if(pos!==-1){
                // cacheQueue.splice(pos,1);
                info.hitCount++;
            }else{
                let outItem = cacheQueue.shift();
                out = cache.indexOf(outItem);
                cache[out] = arrayNum[i];
                cacheQueue.push(arrayNum[i]);
                info.missCount++;
            }
            
        }

        for(let j=0;j<cache.length;j++){
            setNumber(cache[j],j);
        }
    }
    return info;

}
function LRU_Run(runTime){

    let info = {
        visitCount:runTime,
        hitCount:0,
        missCount:0
    };
    // 实际页面中的位置
    let cache = new Array(cache_size);

    // 最近访问队列
    let cacheQueue = [];
    let out ;

    if (runTime>arrayNum.length){
        console.log('error!')
        return;
    }
    let count = 0;
    for (let i=0;i<runTime;i++){
        if(cacheQueue.length<cache_size){
            let pos = cacheQueue.indexOf(arrayNum[i]);
            if(pos!==-1){
                cacheQueue.splice(pos,1);
                info.hitCount++;
            }else{
                cache[count]=arrayNum[i];
                count++;
                info.missCount++;
            }
            cacheQueue.push(arrayNum[i]);
        }
        else{
            let pos = cacheQueue.indexOf(arrayNum[i]);
            if(pos!==-1){
                cacheQueue.splice(pos,1);
                info.hitCount++;
            }else{
                let outItem = cacheQueue.shift();
                out = cache.indexOf(outItem);
                cache[out] = arrayNum[i];
                info.missCount++;
            }
            cacheQueue.push(arrayNum[i]);
        }

        for(let j=0;j<cache.length;j++){
            setNumber(cache[j],j);
        }
    }
    return info;
}

function findFarthest(cache, future){
    let farthest = cache[0];
    let farthestIndex = future.indexOf(farthest);

    for(let i = 0; i < cache.length; i++){
        let index = future.indexOf(cache[i]);
        if(index === -1){
            // 如果某个页面在未来不会被访问，直接返回它
            return cache[i];
        } else if(index > farthestIndex){
            farthest = cache[i];
            farthestIndex = index;
        }
    }

    return farthest;
}
function OPT_Run(runTime){

    let info = {
        visitCount:runTime,
        hitCount:0,
        missCount:0
    };

    // 实际页面中的位置
    let cache = [];
    if (runTime > arrayNum.length){
        console.log('error!')
        return;
    }
    for (let i = 0; i < runTime; i++){
        let pos = cache.indexOf(arrayNum[i]);
        if(pos !== -1){
            // 如果页面已经在缓存中，不做任何事
            info.hitCount++;
        } else if(cache.length < cache_size){
            // 如果缓存还有空位，直接添加
            cache.push(arrayNum[i]);
            info.missCount++;
        } else {
            // 否则，找到未来最不可能被访问的页面并替换它
            let farthest = findFarthest(cache, arrayNum.slice(i+1));
            let index = cache.indexOf(farthest);
            cache[index] = arrayNum[i];
            info.missCount++;
        }

        for(let j = 0; j < cache.length; j++){
            setNumber(cache[j], j);
        }
    }
    return info;
}