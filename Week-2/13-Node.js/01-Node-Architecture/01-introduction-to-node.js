/**
 * Q. What is NodeJS?
 * => NodeJS is a cross platform, open-source JS Runtime built on Chrome's V8 JS Engine.
 *    a. Cross Platform: NodeJS can run on windows, macOS, Linux etc platforms.
 *    b. Open-Source: Features are added by the Committee of OpenJS.
 *    c. JS Runtime Env
 *    d. V8 JS Engine
 * 
 * - When JS as a language came, it gained popularity because of its
 *   application on the web browser. 
 * - JS is always been a language which dominates on the web browser.
 * - But when NodeJS came in, we can run JS everyone means now we can 
 *   run JS outside browser also. And that is the reason NodeJS says
 *   "Run JS Everywhere".
 * 
 * - Node.js has an event-driven architecture capable of asynchronous
 *   I/O (non-blocking I/O).
*/

/**
 * History of NodeJS:
 * 1. 2009: Ryan Dahl created NodeJS.
 *    - Without JS Engine, we cannot run NodeJS. So, we can say:
 *      wherever there is a JS, there will always be a JS Engine.
 *    - When Ryan Dahl first developed JS, he built it on top of
 *      Spidermonkey. Spider Monkey is JS Engine that is found in 
 *      Firefox. It means that every browser has their own JS Engine.
 *    - After spidermonkey, he developed it using V8 Engine and it
 *      was a successfull solution.
 *    - NodeJS was created as a side project, but seeing its potential
 *      Joyent Organization/Company offered Ryan Dahl to the funding
 *      and development of the project.
 *    - Earlier NodeJS is named as Web.js which is for creating web
 *      server. But later on when he relaize the potential, he renamed
 *      it into Node.js, because with this we can not only build web
 *      server but anything out of it.
 * 2. Non-Blocking I/P:
 *    - Earlier Apache was used to create HTTP Server, and this was kind
 *      of 'blocking' server. So, Ryan want to create 'non-blocking' 
 *      server and that is why Node.js is 'non-blocking i/o'. 
 *    - The advantage of non-blocking server is that, it can handle
 *      lesser number of threads.
 * 3. NPM
 *    - In 2010, NPM is developed, which is a package manager for node.
 *    - When NodeJS was developed, a developer from Joyent decided to
 *      create a package manager for Node so that everybody can 
 *      contribute and build small small packages of library.
 *    - NPM is basically a central place(registry) where we can add
 *      new packages.
 *    - A package can be anything. Suppose you want to handle time &
 *      date in your NodeJS Application so there is a package for it.
 *      Similarly, there is a package to create web server also.
 * 4. Window Support
 *    - Initially when NodeJS was built, it was just built for MacOS
 *      and Linux. But in 2011, there was a windows support came up
 *      that was led by Joyent + Microsoft. This makes it more accessible
 *      to lot bigger developer community.
 * 5. In 2012, Ryan Dahl left the project and give the responsibility
 *    to Isaac(creator of NPM). But after Ryan Dahl, the pace of
 *    development becomes very slow. The development process becomes
 *    slow which limits the release cycle of NodeJS, because of this
 *    NodeJS started loosing its popularity and many thought NodeJS is
 *    about to die.
 * 6. In 2014, a developer named Fedon developed 'io.js' which is fork
 *    of NodeJS because NodeJS is managed by Joyent Company but it was
 *    Open Source. So, basically now there are two NodeJS which basically
 *    running in parallel, one is managed by Joyent and other one is
 *    managed by Fedor & some group of developer (io.js), which messed 
 *    up the NodeJS.
 * 7. In September 2015, there was a NodeJS Foundation formed, and this
 *    NodeJS Committee said we will maintain NodeJS from now on. Then
 *    they created separate website for NodeJS. And today we use this
 *     merged version of NodeJS.
 * 8. There are two major foundations:
 *    a. JS Foundation
 *    b. NodeJS Foundation
 *    These two committee were merged and formed, which was named as
 *    'OpenJS' Foundation. And in 2019, this OpenJS Committee took the
 *    control over NodeJS, and since 2019, this committee is responsible
 *    for responsible for all the active development.
*/