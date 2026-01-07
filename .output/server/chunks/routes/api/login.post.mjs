import { d as defineEventHandler, r as readBody, b as getCookie, u as useRuntimeConfig, e as setCookie } from '../../nitro/nitro.mjs';
import ldap from 'ldapjs';
import { SignJWT } from 'jose';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;
  const isHttps = event.node.req.headers["x-forwarded-proto"] === "https";
  const token = getCookie(event, "ad_session");
  if (token) {
    return { success: false, message: "\u60A8\u5DF2\u767B\u5165\uFF0C\u8ACB\u5148\u767B\u51FA\u518D\u5617\u8A66" };
  }
  if (!username || !password) {
    return { success: false, message: "\u8ACB\u8F38\u5165\u5E33\u865F\u8207\u5BC6\u78BC" };
  }
  const config = useRuntimeConfig();
  const LDAP_URL = config.LDAP_URL;
  const DOMAIN = config.LDAP_DOMAIN;
  const client = ldap.createClient({ url: LDAP_URL });
  const userDN = `${username}@${DOMAIN}`;
  return new Promise((resolve) => {
    client.bind(userDN, password, async (err) => {
      if (err) {
        resolve({ success: false, message: "\u5E33\u865F\u6216\u5BC6\u78BC\u932F\u8AA4" });
      } else {
        const token2 = await new SignJWT({ user: username }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("2h").sign(new TextEncoder().encode(config.JWT_SECRET));
        setCookie(event, "ad_session", token2, {
          httpOnly: true,
          // secure: config.NODE_ENV === 'production',
          secure: isHttps,
          path: "/",
          maxAge: 60 * 60 * 2,
          sameSite: "lax"
        });
        resolve({ success: true, message: "\u767B\u5165\u6210\u529F" });
      }
      client.unbind();
    });
  });
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
