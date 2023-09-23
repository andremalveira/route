import { path as newPath } from './path'
import { Prefix, QueryValue, FnOptions, FnPrefixOption } from "./types";

export const query = <QueryKeys extends PropertyKey = PropertyKey>(path: string) => {
	return function <O extends FnPrefixOption>(queryKeys?: Partial<{ [key in QueryKeys]: QueryValue }>, _param2?: null, { baseUrl, prefix }: Partial<O & FnOptions> = {}) {
		let _return: any = path
		if (prefix && typeof prefix == 'string') return query<QueryKeys>(newPath([baseUrl, prefix, path]));

		if (queryKeys && Object.keys(queryKeys).length) _return = newPath([baseUrl, prefix, path], queryKeys);
		return _return as O extends Prefix ? ReturnType<typeof query<QueryKeys>> : string;
	}
}
