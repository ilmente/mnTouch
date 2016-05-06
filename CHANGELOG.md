# Changelog

**1.3.2**
- minor bugfixes

**1.3.1**
- example code updated
- README updated

**1.3.0**
- new hold engine system (more accurate)
- event returns times (start, end and duration)
- event object normalized (tap and other events return the sam event object)
- example code updated
- `test` folder is now `example` (test will be used for tests - coming soon)
- `package.json` edited: 
    - added `uglify-js` devDependency
    - added `npm run build` task for minifing the code
    - main property addresses `dist/mn-touch.js`
- `bower.json` edited: 
    - main property addresses `dist/mn-touch.min.js`
- `dist` folder added (with normal and compressed version with source map)
- `src` folder added
- README updated

**1.2.5**
- README file changed
- CHANGELOG file added

**1.2.4**
- minor bugfixes

**1.2.3**
- package.json added

**1.2.2**
- bower.json added (thanks to [DEllingsworth](https://github.com/DEllingsworth))

**1.2.1**
- documentation updated
- minor bugfixing

**1.2.0**
- default module name changed from 'ng' (not supported anymore for external components) to 'mn'
- hold event added (not tested on WindowsPhone yet... sorry!)
- holdfor attribute added

**1.1.1**
- new event handling system

**1.1.0**
- core improvements
- `$event` object (event infos) added and optionally wrappable

**1.0.4**
- threshold attribute added

**1.0.3**
- support for cancel events (touchcancel, MSPointerOut) added 
- dynamic handlers improved
