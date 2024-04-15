// 获取所有的a元素
const links = document.querySelectorAll('a.nav-link');

// 获取object元素
const objectElement = document.querySelector('object');

// 为每个a元素添加click事件监听器
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
        // 阻止a标签的默认行为
        event.preventDefault();

        // 根据被点击的a标签的内容，改变object元素的data属性
        if (this.textContent.trim() === '简易数据通路') {
            objectElement.data = './mips_project/index.html';
        }
        else if (this.textContent.trim() === '替换算法'){
            objectElement.data = './changePage_algorithm/index.html';
        }
        else if (this.textContent.trim() === '内存数据表示'){
            objectElement.data = './memory_data/index.html';
        }else{

        }
    });
}

const market_link = document.querySelector('#extensionMarket');
market_link.addEventListener('click', function(event) {
    event.preventDefault();
    objectElement.data = 'http://localhost:8080/';
});