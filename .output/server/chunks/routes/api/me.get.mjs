import { d as defineEventHandler, b as getCookie, c as createError } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const me_get = defineEventHandler((event) => {
  const token = getCookie(event, "ad_session");
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated"
    });
  }
  return { loggedIn: true };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
