import './style.css'

import {html, render} from './lib'

let text = 'Hello'
let count = 0

const template = ()=> {
  text = count >= 10 ? 'Goodbye' : text
  count++
  return html`
  <div>
    <h1>${text} World!</h1>
    <p>${count -1}</p>
    <button>inc</button>
  </div>
`}


const r = () => {
  render('#app', template())
}


r()

document.querySelector('button').addEventListener('click', r);

