const isProduction = process.env.NODE_ENV === "production";

export const getCookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  ...(maxAge ? { maxAge } : {}),
});