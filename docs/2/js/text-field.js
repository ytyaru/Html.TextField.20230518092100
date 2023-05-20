(function(){
class TextBox extends HTMLElement {
    //static #attrs = new Map()
    static #attrs = new Map([
        ['css', ['font-size', 'line-height', 'letter-spacing', 'writing-mode', 'text-orientation', 'padding', 'margin']], 
        ['css-flag', ['horizontal', 'vertical', 'sideway', 'horizontal-tb', 'vertical-rl', 'vertical-lr', 'sideways-rl', 'sideways-lr']], 
        ['attr', ['id', 'name']]])
    constructor() { super(); this.#initValues(); }
    connectedCallback() {
        console.log('connectedCallback')
        console.log(this.getAttributeNames())
        this.innerHTML = this.#makeHtml()
        this.#addEvent()
        this.removeAttribute('id')
        delete this.id
        this.#show()
    }
    #show() {
        for (let key of ['fontSize', 'lineHeight', 'letterSpacing', 'writingMode', 'textOrientation', 'padding', 'margin']) {
            console.log(key, this[key])
        }
    }
    #initValues() {
        this.fontSize = '1em'
        this.lineHeight = '1.7em'
        this.letterSpacing = '0.05em'
        this.writingMode = 'horizontal-tb'
        this.textOrientation = 'mixed'
        this.padding = '0'
        this.margin = '0'
    }
    disconnectedCallback() {}
    adoptedCallback() {}
    static get observedAttributes() { return [...this.#attrs.values()].map(names=>names.flat()).flat() }
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) { return }
        this[ property ] = newValue;

        if (property.includes('-')) {
            this[this.#kebabToCamel(property)] = newValue
            console.log(this.#kebabToCamel(property), newValue)
        }
        if ('id'===property) {
            console.log('attributeChangedCallback')
            //this.textarea[property] = newValue
            /*
            const shadow = this.attachShadow({ mode: 'closed' }); // mode: open, closed
            console.log(shadow)
            const ta = shadow.querySelector('textarea')
            ta[property] = newValue
            */
        }
    }
    #kebabToCamel(str) { return str.split('-').map((word,index)=>(0===index) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('') }
    /*
    #kebabToCamel(str) {
        return str.split('-').map((word,index)=>{
            if (index === 0) { return word.toLowerCase(); }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
    }
    */
    #makeStyle() { return ((document.getElementById('text-box-style'))) ? '' : `<style id="text-box-style">${this.#makeCss()}</style>` }
    #makeHtml() { return `${this.#makeStyle()}
<div class="flex-textarea">
    <div class="flex-textarea-dummy" aria-hidden></div>
    ${this.#makeTextarea()}
</div>` }
    #makeTextarea() { 
        const attrs = this.getAttributeNames().filter(n=>['id','name'].includes(n)).map(n=>`${n}="${this.getAttribute(n)}"`).join(' ')
        return `<textarea${(attrs) ? ' '+attrs : ''}></textarea>`
    }
    #makeCss() { return `
.flex-textarea {
    position: relative;
    margin:0; padding:0;
    font-size: 1em;
    line-height: 1.7em;
    letter-spacing: 0.05em;
    writing-mode: horizontal-tb;
    text-orientation: mixed;
}
.flex-textarea-dummy {
    margin:0; padding:0;
    overflow: hidden;
    visibility: hidden;
    box-sizing: border-box;
    min-height: 1.7em;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    border: 1px solid;
}
.flex-textarea textarea {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    margin:0; padding:0;
    display: block;
    overflow: hidden;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width: 100%;
    height: 100%;
    min-inline-size: 90vw;
    font: inherit;
    letter-spacing: inherit;
    resize: none;
    border: 1px solid #b6c3c6;
    border-radius: 4px;
    color: inherit;
    background-color: transparent;
}`   
    }
    #makeCssV() { return `
.flex-textarea {
    -ms-writing-mode: tb-rl;
    writing-mode: vertical-rl;
    text-orientation: upright;
}
a { text-decoration: overline; }
.text-combine {
  -webkit-text-combine: horizontal;
  -ms-text-combine-horizontal: all;
  text-combine-upright: all;
}
`
    }
    #addEvent() {
        const ta = this.querySelector('textarea')
        const dummy = this.querySelector('.flex-textarea-dummy')
        ta.addEventListener('input', e=>{ dummy.textContent = e.target.value + '\u200b' });
        ta.value = ''
        ta.dispatchEvent(new Event('input'))
    }
}
customElements.define('text-box', TextBox);
window.getTextareasInTextbox= function() { return [...document.querySelectorAll('text-box')].filter(tb=>tb.shadowRoot).map(tb=>tb.shadowRoot.querySelector("textarea")) }
window.getTextareaInTextbox= function(id) { return getTextareasInTextbox().filter(ta=>ta.id===id)[0] }
})()
