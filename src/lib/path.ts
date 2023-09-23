import { returnValid } from "../utils/returnValid";

export const path = (paths: string[] | any[], query: object = {}) => {
	let _r = '', v = returnValid(query);
	paths.forEach((p) => {
		if (p && typeof p == 'string') {
			p = p.replace(/^\/|\/$/g, '');
			_r += `${p}/`
		}
	})
	return _r.replace(/\/+$/, '') + `${v ? `?${v}` : ''}`
}
