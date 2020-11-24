const btn = document.querySelector('.j-btn-test');
const wiheight = window.innerHeight;
const wiwidth = window.innerWidth;
let showstr = 'Размер экрана с учетом полосы прокрутки:' + '\n' + 'Height: ' + wiheight + ' Width: ' + wiwidth ;

const docwidth = document.documentElement.clientWidth;
const docheight = document.documentElement.clientHeight;
let showstr2 = 'Размер экрана без учета полосы прокрутки:' + '\n' + 'Height: ' + docheight + ' Width: ' + docwidth ;


btn.addEventListener('click', () => {
  window.alert(showstr);
  window.alert(showstr2);
});