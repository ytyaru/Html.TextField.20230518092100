window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    console.log('textareas: ', [...document.querySelectorAll('textarea')]);
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

