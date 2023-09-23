
export function returnValid(object: { [x: PropertyKey]: any }) {
	let obj = new Object() as { [x: PropertyKey]: any };
	Object.keys(object).forEach((key) => {
		if (object[key] !== null && object[key] !== undefined && object[key] !== '') {
			obj[key] = object[key]
		}
	})
	return Object.keys(obj).length ? obj : null
}
