import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/reset-password',
    '/reset-password/confirm',
    '/sso-callback',
    '/checklist/(.*)',
    '/api/trpc/checklist.getAll',
    '/api/trpc/checklist.get',
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
