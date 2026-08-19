// Lets code outside the React tree (e.g. the axios response interceptor)
// trigger SPA navigation instead of doing a hard `window.location` reload.
//
// `NavigationSetter` (rendered once inside <BrowserRouter>) stores the
// `navigate` function from `useNavigate()` here on mount. Anything can then
// import `redirectTo` and call it, even outside of a React component.

let navigator = null;

export const setNavigator = (navigateFn) => {
  navigator = navigateFn;
};

export const redirectTo = (path, options) => {
  if (navigator) {
    navigator(path, options);
  } else {
    // Fallback in the unlikely case navigation is triggered before the
    // router has mounted.
    window.location.assign(path);
  }
};
