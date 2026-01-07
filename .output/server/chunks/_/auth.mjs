import { b as getCookie, c as createError, u as useRuntimeConfig } from '../nitro/nitro.mjs';
import { jwtVerify } from 'jose';

async function verifyAuth(event) {
  const token = getCookie(event, "ad_session");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "\u672A\u767B\u5165" });
  }
  const config = useRuntimeConfig();
  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(config.JWT_SECRET)
    );
  } catch (err) {
    console.error("JWT \u9A57\u8B49\u5931\u6557\uFF1A", err);
    throw createError({ statusCode: 401, statusMessage: "JWT \u7121\u6548\u6216\u904E\u671F" });
  }
}

export { verifyAuth as v };
//# sourceMappingURL=auth.mjs.map
