/**
 * Issue with window.location.href:
 * When using window.location.href for navigation in a React application,
 * it triggers a full page reload, which is not desirable in client-side
 * routing. A full page reload involves fetching the HTML, CSS, and
 * other assets again, leading to a slower and less efficient user exp.
 * 
 * To address this issue, React Router DOM provides a solution in the
 * form of the "useNavigate()" hook. This hook is designed for programmatic
 * navigation within a React component without triggering a full page reload.
 * By using "useNavigate()", you can ensure smoother transitions between
 * different views in a single-page application(SPA) without unnecessary
 * overhead.
*/
