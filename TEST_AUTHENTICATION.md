# 🧪 Authentication Testing Guide

## Quick Test Checklist

### ✅ Step 1: Start the Application
```bash
npm run dev
```
Visit: `http://localhost:3000`

### ✅ Step 2: Test Navigation (Logged Out)
1. Visit homepage
2. Check header navigation
3. **Should see:** Find Talent, Find Work, Learn, About
4. **Should NOT see:** Submit Project, Dashboard
5. **Should see:** "Sign In" and "Get Started" buttons

### ✅ Step 3: Test Login
1. Click "Sign In" button
2. Use test account:
   - Email: `client@example.com`
   - Password: `client123`
3. Click "Sign in"
4. **Expected:** Redirect to `/dashboard`
5. **Expected:** See welcome message with user name

### ✅ Step 4: Test Navigation (Logged In)
1. Check header navigation
2. **Should see:** Find Talent, Find Work, Submit Project, Learn, Dashboard, About
3. **Should see:** User avatar/name with dropdown
4. **Should NOT see:** "Sign In" button

### ✅ Step 5: Test User Menu
1. Click on user avatar/name in header
2. **Should see dropdown with:**
   - User name and role
   - Dashboard link
   - Profile Settings link
   - Sign Out button

### ✅ Step 6: Test Protected Routes
1. Click "Dashboard" in navigation
2. **Expected:** Dashboard loads with user data
3. Click "Submit Project" in navigation
4. **Expected:** Project submission form loads

### ✅ Step 7: Test Logout
1. Click user avatar/name
2. Click "Sign Out"
3. **Expected:** Redirect to homepage
4. **Expected:** Navigation returns to logged-out state
5. **Expected:** "Submit Project" and "Dashboard" hidden

### ✅ Step 8: Test Protected Route Redirect
1. While logged out, manually visit: `http://localhost:3000/dashboard`
2. **Expected:** Redirect to `/auth/signin?redirect=/dashboard`
3. Login with test account
4. **Expected:** Redirect back to `/dashboard`

### ✅ Step 9: Test Signup
1. Click "Get Started" button
2. Fill in form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com (use unique email)
   - Password: test123
   - Confirm Password: test123
   - Select role: Client or Freelancer
   - Check "I agree to terms"
3. Click "Create account"
4. **Expected:** Redirect to `/dashboard`
5. **Expected:** Logged in as new user

### ✅ Step 10: Test Different Roles
1. Logout
2. Login as Freelancer: `sarah@example.com` / `password123`
3. **Expected:** Dashboard shows freelancer-specific data
4. Logout
5. Login as Student: `student@example.com` / `student123`
6. **Expected:** Dashboard shows student-specific data
7. Logout
8. Login as Admin: `admin@codeaxis.com` / `admin123`
9. **Expected:** Dashboard shows admin-specific data

## 🎯 Expected Behaviors

### When Logged Out
- ✅ Can view: Homepage, Learn page, Talent directory, Work listings
- ❌ Cannot view: Dashboard, Submit Project
- ✅ Navigation shows: Public links only
- ✅ Header shows: Sign In + Get Started buttons

### When Logged In
- ✅ Can view: All pages including Dashboard, Submit Project
- ✅ Navigation shows: All links including protected ones
- ✅ Header shows: User avatar/name with dropdown menu
- ✅ Can logout from user menu

### Protected Routes
- `/dashboard` → Requires any authenticated user
- `/submit-project` → Requires Client or Admin role
- Course enrollment → Requires any authenticated user

## 🐛 Common Issues & Solutions

### Issue: "Server Error" on Login
**Solution:**
1. Check browser console for errors
2. Verify database is running
3. Check `.env` file has correct DATABASE_URL
4. Run `http://localhost:3000/api/health` to check connection

### Issue: Navigation Not Updating After Login
**Solution:**
1. Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cookies for localhost:3000
3. Check browser console for errors

### Issue: Redirect Loop
**Solution:**
1. Clear all cookies
2. Restart dev server
3. Check middleware.ts for conflicts

### Issue: "Invalid Credentials" on Login
**Solution:**
1. Verify database is initialized: `http://localhost:3000/api/init`
2. Check you're using correct test account credentials
3. Passwords are case-sensitive

### Issue: Can't Access Dashboard After Login
**Solution:**
1. Check browser console for errors
2. Verify JWT token is being set (check Application > Cookies in DevTools)
3. Check middleware.ts is not blocking the route

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

[ ] Navigation (Logged Out) - Shows only public links
[ ] Login Functionality - Redirects to dashboard
[ ] Navigation (Logged In) - Shows all links including protected
[ ] User Menu - Dropdown works correctly
[ ] Protected Routes - Dashboard accessible
[ ] Logout - Returns to logged-out state
[ ] Protected Route Redirect - Redirects to signin then back
[ ] Signup - Creates new user and logs in
[ ] Different Roles - Each role shows appropriate dashboard
[ ] Mobile Navigation - Works on mobile devices

Issues Found:
_________________________________
_________________________________
_________________________________

Overall Status: [ ] PASS [ ] FAIL
```

## 🚀 Advanced Testing

### Test API Directly

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "action": "login",
    "email": "client@example.com",
    "password": "client123"
  }' \
  -c cookies.txt
```

**Get Profile (with cookie):**
```bash
curl http://localhost:3000/api/users/profile \
  -b cookies.txt
```

**Logout:**
```bash
curl -X DELETE http://localhost:3000/api/auth \
  -b cookies.txt
```

### Test with Different Browsers
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Test on Different Devices
- [ ] Desktop
- [ ] Tablet
- [ ] Mobile

## ✅ Success Criteria

All tests pass when:
1. ✅ Login works with all test accounts
2. ✅ Signup creates new users successfully
3. ✅ Navigation updates based on auth status
4. ✅ Protected routes redirect to signin when logged out
5. ✅ Protected routes accessible when logged in
6. ✅ Logout clears session and updates UI
7. ✅ User menu shows correct information
8. ✅ Different roles see appropriate dashboards
9. ✅ No console errors during auth flow
10. ✅ Cookies are set and cleared properly

---

**Status:** Ready for testing
**Last Updated:** After authentication fixes
**Next Steps:** Run through all test cases and report any issues
