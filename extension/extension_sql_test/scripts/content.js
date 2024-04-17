const extensionName = 'extension_sql_test';
const start_html = 'hello.html';

let extension_ul = document.querySelector('#extension_ul');
let extension_li = document.createElement('li');
extension_li.classList.add('nav-item');
let extension_a = document.createElement('a');
extension_a.classList.add('nav-link', 'd-flex', 'align-items-center' ,'gap-2');
extension_a.textContent = extensionName;
let object_content = document.querySelector('object');
extension_li.appendChild(extension_a);
extension_ul.appendChild(extension_li);
extension_a.addEventListener('click', function(e) {
    e.preventDefault();
    object_content.data = './extension/' +
        // 此处配置 ‘插件名/展示页面’
        extensionName +
        '/' +
        start_html;
});