import { param } from './param'
import { query } from './query'

/**Defines `K` as `null | undefined `of `T` */
export type AsNullable<T, K extends keyof T,> = {
	[P in keyof T]: P extends K ? null | undefined : T[P]
};

export type ParamValue = string | number;
export type QueryValue = string | number;

export type RouteObject = { [RouteKey: PropertyKey]: string | ParamReturnType | QueryReturnType };

export type Prefix = {
	/**Prefix for route path */
	prefix: string;
}
export type Namespace = {
	/**Returns the routes inside a new object called `namespace` */
	namespace: string;
}

export type BaseUrl = {
	/**Url base from path */
	baseUrl: string;
}

export type GroupOptions = Prefix & Namespace & BaseUrl;

export type GroupNamespaceOption = Pick<GroupOptions | AsNullable<GroupOptions, 'namespace'>, 'namespace'>

export type ParamType = typeof param;
export type ParamReturnType = ReturnType<typeof param>;

export type QueryType = typeof query;
export type QueryReturnType = ReturnType<typeof query>;

export type FnPrefixOption = Pick<Prefix | AsNullable<Prefix, 'prefix'>, 'prefix'>
export type FnOptions = Prefix & BaseUrl & { replace: boolean }