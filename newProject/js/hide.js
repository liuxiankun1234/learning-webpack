// 操作 DOM 元素，把 content 显示到网页上
function hide(content) {
    window.document.getElementById('app').innerText = 'Hello,' + content;
}

console.log('init hide')
// 通过 CommonJS 规范导出 hide 函数
module.exports = hide;