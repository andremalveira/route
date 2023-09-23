
import { GroupOptions, ParamValue } from "./lib/types";

import { path as pth } from './lib/path'
import { param as p } from "./lib/param";
import { query as q } from "./lib/query";
import { group as g } from "./lib/group";

type PathFunction = (paths: string[] | any[], query: { [key: PropertyKey]: any }) => string;
type ParamFunction = <ParamKeys extends PropertyKey = PropertyKey, QueryKeys extends PropertyKey = PropertyKey>(path: string) => (paramKeys: { [key in ParamKeys]: ParamValue } | ParamValue, queryKeys?: Partial<{ [key in QueryKeys]: ParamValue }>) => string;
type QueryFunction = <QueryKeys extends PropertyKey = PropertyKey>(path: string) => (queryKeys?: Partial<{ [key in QueryKeys]: ParamValue }>) => string;
type GroupFunction = <Routes extends {}>(options: Partial<GroupOptions> | null, routes: Routes) => Routes

/**Returns formatted path segment
 * ```
 * const newPath = path(['api', 'user', 'posts'], { status: true })
 * // api/user/posts?status=true
 * ```
*/
export const path = pth as PathFunction

/**Add dynamic parameters and query parameters in the path
 * ```ts
 * const routes = {
 *     user: param('/user/:userId')
 * }
 * const userId = 032;
 * routes.user(userId); // /user/032
 * ```
 */
export const param = p as ParamFunction

/**Add query parameters in path
 * ```ts
 * const routes = {
 *   posts: query('/posts')
 * }
 * routes.posts({ category: 'movies', type:'science-fiction' }); 
 * // /posts?category=movies&type=science-fiction
 * ```
 */
export const query = q as QueryFunction

/**Creates a group of routes based on the options
 * ```
 * const routes = {
 *     post: group({ prefix: '/prefix' }, {
 *         add: '/add',
 *         update: param('/update/:postId'),
 *         delete: param('/delete/:postId'),
 *     })
 * }
 * routes.post.add             //  /prefix/add
 * routes.post.update(postId)  //  /prefix/update/12
 * routes.post.delete(postId)  //  /prefix/delete/12
 * ```
 */
export const group = g as GroupFunction


