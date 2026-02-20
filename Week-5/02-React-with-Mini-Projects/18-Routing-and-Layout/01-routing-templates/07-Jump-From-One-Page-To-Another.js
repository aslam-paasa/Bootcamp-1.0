/**
 * How can we jump from one page to another just by clicking a button?
 * => Way-1: window.location.href = "/dashboard"
 *           window.location.href = "/"
 * => This global location object will have access to DOM to jump from
 *    one page to another.
 * => If we notice, whenever we click a button, there is some reloading
 *    happening in our topbar, which is saying we are still not doing
 *    client side routing, we are still refreshing the page/bringing
 *    html,js etc from the backend and putting it here. Because we have
 *    choose this way to route from one page to another.
 * => This is not the right way to go from one page to another if we
 *    are using client side routing.
*/
<div>
    <button onClick={() => { window.location.href = "/" }}>Landing Page</button>
    <button onClick={() => { window.location.href = "/dashboard" }}>Dashboard</button>
</div>
