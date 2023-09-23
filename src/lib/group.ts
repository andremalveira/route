import { path as newPath } from './path'
import { GroupOptions, GroupNamespaceOption, RouteObject, ParamReturnType, QueryReturnType } from "./types";

export const group = <O extends GroupNamespaceOption, R>(options: Partial<Pick<GroupOptions, 'prefix'>> & Partial<O & GroupOptions>, routes: R) => {
	const { prefix, namespace, baseUrl } = options ?? {};

	if (!routes || (routes && !Object.keys(routes).length)) { throw new Error(`Param 'routes' is ${routes == null ? 'null' : typeof routes} \n See in https://github.com/andremalveira/route/blob/main/docs/errors.md#param-paramkeys-is-null--undefined`) }

	let rt;
	const cbk = routes as RouteObject;
	const obj = new Object() as RouteObject;
	Object.values(cbk).forEach((path: string | ParamReturnType | QueryReturnType, key: number) => {
		if (typeof path == 'function' && path.constructor.name == 'Function') {
			obj[Object.keys(cbk)[key]] = path(null as any, null as any, { baseUrl, prefix, replace: true }) as any
		} else {
			obj[Object.keys(cbk)[key]] = newPath([prefix as string, path as string])
		}
	})
	rt = namespace ? ({ [namespace]: obj }) : obj;

	return rt as R as O extends Pick<GroupOptions, 'namespace'> ? { [key in O['namespace']]: { [key in keyof typeof routes]: typeof routes[key] } } : { [key in keyof typeof routes]: typeof routes[key] }
}
