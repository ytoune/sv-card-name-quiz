import { render } from 'preact'

import { App } from '~/app'

const style = document.createElement('style')
style.innerHTML = `
button, form input[type=text] {
	width: 100%;
	box-sizing: border-box;
	padding: 0.5em;
}
select, progress {
	width: 100%;
	box-sizing: border-box;
}
.card {
	width: 100%;
	box-sizing: border-box;
	text-align: center;
}
.card img {
	max-width: 100%;
	max-height: 60vh;
	box-sizing: border-box;
	height: auto;
}
.result-title {
	text-align: center;
}
.answers > * {
	margin-right: .5em;
}
.answers .mark {
	font-weight: bold;
}
.answers.ok .mark {
	color: aqua;
}
.answers.bad .mark {
	color: red;
}
.answers .name.small {
	font-size: small;
}
`
document.head.appendChild(style)

render(<App />, document.body)
