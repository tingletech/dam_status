UC Discovery Service
====================

Middleman project to build simple shibboleth "discovery service"
for UC campuses

# How would I use this?

This is for use with [shibboleth](https://shibboleth.net) a single
sign on software used by the [InCommon](http://www.incommon.org) identity federation
that the University of California participates in.

# Building

 * Install http://bower.io for web dev package magic
   * requires https://npmjs.org and http://nodejs.org
   * `npm install -g bower`

 * Install http://bundler.io for ruby package magic
   * requires http://rubygems.org and https://www.ruby-lang.org/
   * `gem install bundler`

```
bower install                  # install all web libraries required
bundle                         # install middle man / ruby asset pipline
bundle exec middleman          # test server for middleman
bundle exec middleman build    # build static templates
```

# Install
Serve `./build/` from the path `/ds/` on your apache/mod_shib server.

# Customize
If you are a Shibboleth SP and your application is just available to the 
campuses and UCOP, then you can customize help email address:
```
HELP_EMAIL='my_email@example.com' bundle exec middleman build
```
or 
```
./change_email my_email@example.com
```
will just hack the email with `sed` (no need for `node` and `ruby`).

If you want to customize more than the email, you can edit the templates in `source`.  

In the HTML source use `data-entityid` to specify the IdP entityID.
```html
<a data-entityid="urn:mace:incommon:berkeley.edu">UC Berkeley</a>
```

The Shibboleth SP software, as part of the user login flow, will redirect the user
to `/ds/?entityID=...&return=...`.  `return` is a URL.  Javascript is used to turn
`data-entityID` attributes into the proper hrefs to continue in the login workflow
once a campus is selected.

```html
<a href="{return}&entityID={data-entityid}">UC Berkeley</a></div>
```

Simply edit the HTML to use the entityIDs for your IdPs you wish to use.

# gh-pages

```
rake publish
```

# License 

Copyright © 2014, Regents of the University of California
All rights reserved.

Redistribution and use in source and binary forms, with or without 
modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, 
  this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, 
  this list of conditions and the following disclaimer in the documentation 
  and/or other materials provided with the distribution.
- Neither the name of the University of California nor the names of its
  contributors may be used to endorse or promote products derived from this 
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
POSSIBILITY OF SUCH DAMAGE.
