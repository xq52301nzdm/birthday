/** Vue h函数 */

;`
    <div style='color: red'>
        <h1>111</h1>
    </div>
`

h(`div`, {}, [
	h(`h1`, {
		innerText: 111,
		style: {
			color: `red`
		}
	})
])

/** 递归设置props */
function setProp(source, props) {
	for (let propKey in props) {
		if (props[propKey] !== null && typeof props[propKey] === 'object' && !Array.isArray(props[propKey])) {
			// 只处理普通对象，不处理 DOM 对象或数组
			if (typeof source[propKey] !== 'object') {
				// 确保 source[propKey] 是对象
				source[propKey] = {}
			}
			setProp(source[propKey], props[propKey])
		} else {
			// 处理非对象属性，确保文本内容使用 textContent
			if (propKey === 'innerText') {
				// 直接使用 textContent
				source.textContent = props[propKey]
			} else {
				source[propKey] = props[propKey]
			}
		}
	}
}

function h(tagName, props, children) {
	const tag = document.createElement(tagName)

	setProp(tag)
	;(children || []).forEach(x => {
		tag.appendChild(x)
	})
	return tag
}
