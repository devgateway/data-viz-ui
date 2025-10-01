---
"@devgateway/dvz-ui-react": major
"@devgateway/wp-react-lib": major
---
This pull request introduces the initial Server Side Rendering (SSR) Work.
The main changes focus on better server-side rendering support for favicons, a migration to use route loaders instead of client loaders, and improved flexibility for page and post containers. There are also fixes to type exports and configuration updates.

**SSR Favicon and Loader Integration:**

- Added a new `SSRFavicon` component to handle favicons in SSR contexts, and integrated it into the example app's layout, fetching the favicon URL using a new route `loader` function. (`example/app/root.tsx`, `packages/dvz-ui/src/layout/SSRFavicon.tsx`, `packages/dvz-ui/src/layout/index.ts`, [[1]](diffhunk://#diff-0e710716db1ef10619bfa9b1aeef70f91db0c12a600f3cc2202756d335c5e2bdR8-L20) [[2]](diffhunk://#diff-0e710716db1ef10619bfa9b1aeef70f91db0c12a600f3cc2202756d335c5e2bdR47-R86) [[3]](diffhunk://#diff-cbee2b57dccdf4c9346e7a4338519123d6a127e73296c4d4886b005f19b21ec2R1-R17) [[4]](diffhunk://#diff-f27ef4fd16d5bcc237f2e17c5f39f4d3169ec18408b8d31b3f8be323dad51bedR12)
- The layout now displays a loading spinner during navigation transitions using `useNavigation`. (`example/app/root.tsx`, [example/app/root.tsxR47-R86](diffhunk://#diff-0e710716db1ef10619bfa9b1aeef70f91db0c12a600f3cc2202756d335c5e2bdR47-R86))

**Migration from Client Loader to Loader:**

- Updated route files to use the standard `loader` function instead of `clientLoader`, aligning with modern React Router data loading patterns. (`example/app/routes/home.tsx`, `example/app/routes/slug.tsx`, [[1]](diffhunk://#diff-0019b189bf560c2ff25048eaa3ae232ad68b7f978b10bed36cbbf04f6d60f7a1L3-R10) [[2]](diffhunk://#diff-8703ab07731e128d54737297c886a3ecb179029a346394ad698312953030593bL1-R7)

**Container Component Flexibility and Bug Fixes:**

- Enhanced `SlugContainer` and `SlugPostContainer` to accept pre-fetched `pages` or `posts` props, enabling server-passed data and simplifying SSR. (`packages/dvz-ui/src/layout/containers/SlugContainer.tsx`, `packages/dvz-ui/src/layout/containers/SlugPostContainer.tsx`, [[1]](diffhunk://#diff-5ba4a6b647dcffca9e57d83451be546fb1958b262fee743697b711b9bd3604f2L4-R28) [[2]](diffhunk://#diff-3b407a45c5543e2f777f15734a3a70a2eb3f81a68fa13325b54a2f097cd535ccL7-R25)
- Fixed prop usage in `PreviewTypeContainer` to correctly use route parameters for previewing content. (`packages/dvz-ui/src/layout/containers/PreviewTypeContainer.tsx`, [[1]](diffhunk://#diff-5082dc5d7ad5b3a09b06ead1a89da73147dc7594330f20b7207d5cf8d3070cd5L15-R22) [[2]](diffhunk://#diff-5082dc5d7ad5b3a09b06ead1a89da73147dc7594330f20b7207d5cf8d3070cd5L30-R33)

**Example Application Improvements:**

- Improved error handling and fallback UI in the `slug` route to display a "Page not found" message when appropriate. (`example/app/routes/slug.tsx`, [example/app/routes/slug.tsxL46-R43](diffhunk://#diff-8703ab07731e128d54737297c886a3ecb179029a346394ad698312953030593bL46-R43))
- Enabled prerendering for the home route in the example app config. (`example/react-router.config.ts`, [example/react-router.config.tsL12-R12](diffhunk://#diff-1f45d01a4a414bdca4031e14141356281755c3fb1d7b6e46b171a927208de9ecL12-R12))
- Updated Vite config to improve module resolution for development. (`example/vite.config.example.ts`, [example/vite.config.example.tsL89-R89](diffhunk://#diff-addf82a1f05611e3f2e4f335fcd7f19bb5087dea9508e735adc0c03d8fefa44fL89-R89))

**Type and Export Fixes:**

- Fixed type export paths in the `dvz-ui` package to point to the correct locations in the build output. (`packages/dvz-ui/package.json`, [packages/dvz-ui/package.jsonL134-R156](diffhunk://#diff-3db8fdb10038f4527fb49aeb768d5a3028b31b17e9f1daca9dcfc87d72e27d8bL134-R156))

**Minor Improvements:**

- Improved logging and parameter handling in `RootLayout` for better development debugging. (`packages/dvz-ui/src/layout/Layout.tsx`, [packages/dvz-ui/src/layout/Layout.tsxL41-R41](diffhunk://#diff-9a9cbafb73862afdd87a5a27a3711dbcfffc5a4a4d66a183970a11490f5ee910L41-R41))

These changes collectively improve SSR support, developer experience, and code maintainability.
