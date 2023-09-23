import { query } from "./query";
import { path as newPath } from './path'
import { ParamValue, Prefix, FnPrefixOption, FnOptions, QueryValue } from "./types";

export const param = <ParamKeys extends PropertyKey = PropertyKey, QueryKeys extends PropertyKey = PropertyKey>(path: string) => {
	return <O extends FnPrefixOption>(paramKeys: { [key in ParamKeys]: ParamValue } | ParamValue, queryKeys?: Partial<{ [key in QueryKeys]: QueryValue }>, { baseUrl, prefix, replace }: Partial<O & FnOptions> = {}) => {
		let _return: any = path;
		if (prefix && baseUrl) { return param<ParamKeys, QueryKeys>(newPath([baseUrl, prefix, path])) };

		if (!paramKeys && !replace) { throw new Error(`Param 'paramKeys' is ${paramKeys == null ? 'null' : typeof paramKeys} \n See in https://github.com/andremalveira/route/blob/main/docs/errors.md#param-paramkeys-is-null--undefined`) }

		if (paramKeys && typeof paramKeys === 'object' && Object.keys(paramKeys).length) {
			const pms: { [key: PropertyKey]: any } = paramKeys as { [key in ParamKeys]: ParamValue };
			const keyParams = Object.keys(paramKeys as { [key in ParamKeys]: ParamValue });

			if (!keyParams.length) throw new Error(`Params object is empty! \n See in https://github.com/andremalveira/route/blob/main/docs/errors.md#parameters-object-is-empty`)

			keyParams.forEach((key: string) => {
				const param = pms[key];
				const rgx = new RegExp(`:([${key}]+)|{([${key}]+)}|\\[(${key}+)]`);
				const match = path.match(rgx);

				if (!match) throw new Error(`Key ${key} not found in path ${path} \n See in https://github.com/andremalveira/route/blob/main/docs/errors.md#key-keyname-not-found-in-path-pathname`)

				const matchKey = match![1] ?? match![2] ?? match![3];
				if (!param) {
					throw new Error(`Param ${matchKey} is ${typeof param}`)
				}
				_return = _return.replace(rgx, String(param));
			})

		} else if (paramKeys) {
			const rgx = new RegExp(`:([\\w]+)*|{([\\w]+)*}|\\[(\\w+)*]`);
			const match = path.match(rgx);

			if (!match) throw new Error(`No parameter key was found in the given path ${path} \n See in https://github.com/andremalveira/route/blob/main/docs/errors.md#no-parameter-key-was-found-in-the-specified-path-path`)

			const matchKey = match![1] ?? match![2] ?? match![3];
			if (!paramKeys) {
				throw new Error(`Param ${matchKey} is ${typeof paramKeys}`)
			}
			_return = path.replace(rgx, String(paramKeys));
		}
		const _result = query(_return)(queryKeys);
		return _result as O extends Prefix ? ReturnType<typeof param<ParamKeys, QueryKeys>> : string;
	}
}
