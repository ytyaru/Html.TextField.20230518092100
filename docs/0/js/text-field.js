(function(){
class TextBox extends HTMLElement {
    constructor() {
        super()
        console.log('constructor')
    }
    connectedCallback() {
        console.log('connectedCallback')
        console.log(this.getAttributeNames())
        this.textContent = 'Hello World!';
        const shadow = this.attachShadow({ mode: 'closed' }); // mode: open, closed
        shadow.innerHTML = this.#makeHtml()
        //shadow.innerHTML = this.#makeStyle()
        //this.innerHTML = this.#makeHtml()
        //this.textarea = shadow.querySelector('textarea')
        this.#addEvent(shadow)
    }
    disconnectedCallback() {}
    adoptedCallback() {}
    static get observedAttributes() {
        return ['id', 'name', 'horizontal', 'vertical', 'sideway', 'horizontal-tb', 'vertical-rl', 'vertical-lr', 'sideways-rl', 'sideways-lr', '', '', '', '', '', ''];
    }
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) { return }
        this[ property ] = newValue;
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
    /*
    #makeHtml() { return `
<style>${this.#makeCss()}</style>
<div class="flex-textarea">
    <div class="flex-textarea-dummy" aria-hidden></div>
    <textarea></textarea>
</div>
`
    }
    */
    #makeHtml() { return `<style>${this.#makeCss()}</style>
<div class="flex-textarea">
    <div class="flex-textarea-dummy" aria-hidden></div>
    ${this.#makeTextarea()}
</div>` }
/*
    #makeStyle() { return `<style>${this.#makeCss()}</style>` }
    #makeHtml() { return `<div class="flex-textarea">
    <div class="flex-textarea-dummy" aria-hidden></div>
    ${this.#makeTextarea()}
</div>` }
*/
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
textarea {
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
    /*
    #addEvent() {
        const ta = this.querySelector('textarea')
        const dummy = this.querySelector('.flex-textarea-dummy')
        ta.addEventListener('input', e=>{ dummy.textContent = e.target.value + '\u200b' });
        ta.value = ''
        ta.dispatchEvent(new Event('input'))
    }
    */
    #addEvent(shadow) {
        const ta = shadow.querySelector('textarea')
        const dummy = shadow.querySelector('.flex-textarea-dummy')
        ta.addEventListener('input', e=>{ dummy.textContent = e.target.value + '\u200b' });
        ta.value = ''
        ta.dispatchEvent(new Event('input'))
    }
}
customElements.define('text-box', TextBox);
})()
