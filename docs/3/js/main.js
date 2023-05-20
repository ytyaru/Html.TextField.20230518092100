window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    console.log('textareas: ', [...document.querySelectorAll('textarea')]);
    console.log('text-box: ', [...document.querySelectorAll('text-box')]);
    console.log('text-box: ', [...document.querySelectorAll('text-box textarea')]);
//    console.log('text-box: ', [...document.querySelectorAll('text-box')].filter(tb=>tb.shadowRoot).map(tb=>tb.shadowRoot.querySelector("textarea")));
    console.log('text-box: ', window.getTextareasInTextbox());
    console.log('text-box: ', window.getTextareaInTextbox('ta1'));
    console.log('text-box: ', window.getTextareaInTextbox('ta0'));
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

