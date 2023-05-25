(function(){
class EditBox extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        console.log('edit-box this:', this)
        console.log('this.textContent:', this.textContent)
        console.log('this.innerText:', this.innerText)
        console.log('this.innerHTML:', this.innerHTML)
        const shadow = this.attachShadow({ mode:'closed' })
        console.log('shadow.textContent:', shadow.textContent)
        //shadow.innerHTML = this.#makeHtml()
        shadow.innerHTML = `<div contenteditable>${this.textContent}</div>`
        this.#addEvent(shadow)
        this.removeAttribute('id')
    }
    #show() {
        for (let key of ['fontSize', 'lineHeight', 'letterSpacing', 'writingMode', 'textOrientation', 'padding', 'margin']) {
            console.debug(key, this[key])
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
    static get observedAttributes() { return [''] }
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) { return }
//        console.debug(this)
//        console.debug(TextBox.#attrs)
//        console.debug(this.#attrs)
        /*
        if (TextBox.#attrs.get('writing-mode-flag').includes(property)) { this.writingMode = this.#writingModeValue(property) }
        else if (property.includes('-')) {
            this[this.#kebabToCamel(property)] = newValue
//            console.debug(this.#kebabToCamel(property), newValue)
        } else { this[ property ] = newValue; }
        */
    }
    #writingModeValue(v) {
        switch(v.toLowerCase()) {
            case 'horizontal':
            case 'en':
                return 'horizontal-tb'
            case 'vertical':
            case 'ja':
                return 'vertical-rl'
            case 'sideways': return 'sideways-rl'
            default: return v
        }
    }
    #kebabToCamel(str) { return str.split('-').map((word,index)=>(0===index) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('') }
    //#makeStyle() { return ((document.getElementById('text-box-style'))) ? '' : `<style id="text-box-style">${this.#makeCss()}</style>` }
    //#makeHtml() { return `${this.#makeStyle()}
    #makeHtml() { return `<style>${this.#makeCss()}</style>
<div class="flex-textarea">
    <div class="flex-textarea-dummy" aria-hidden></div>
    ${this.#makeTextarea()}
</div>` }
    #makeTextarea() { 
        const attrs = this.getAttributeNames().filter(n=>['id','name'].includes(n)).map(n=>`${n}="${this.getAttribute(n)}"`).join(' ')
        return `<textarea${(attrs) ? ' '+attrs : ''}>${this.textContent}</textarea>`
    }
    #makeCss() { return `
.flex-textarea {
    position: relative;
    margin:${this.margin}; padding:${this.padding};
    font-size: ${this.fontSize};
    line-height: ${this.lineHeight};
    letter-spacing: ${this.letterSpacing};
    writing-mode: ${this.writingMode};
    text-orientation: ${this.textOrientation};
}
.flex-textarea-dummy {
    margin:${this.margin}; padding:${this.padding};
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
    margin:${this.margin}; padding:${this.padding};
    display: block;
    overflow: hidden;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    min-inline-size: 10vw;
    width: 100%;
    height: 100%;
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
    #addEvent(shadow) {
        /*
        const target = (shadow) ? shadow : this
        const ta = target.querySelector('textarea')
        const dummy = target.querySelector('.flex-textarea-dummy')
        ta.addEventListener('input', e=>{ dummy.textContent = e.target.value + '\u200b' });
        ta.value = ''
        ta.dispatchEvent(new Event('input'))
        */
    }
}
customElements.define('edit-box', EditBox);
/*
window.getTextareasInTextbox= function() { return [...document.querySelectorAll('text-box')].filter(tb=>tb.shadowRoot).map(tb=>tb.shadowRoot.querySelector("textarea")) }
window.getTextareaInTextbox= function(id) { return getTextareasInTextbox().filter(ta=>ta.id===id)[0] }
*/
})()
