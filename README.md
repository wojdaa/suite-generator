![Cognifide logo](http://cognifide.github.io/assets/cognifide-logo.png)

# AET
<p align="center">
  <img src="https://github.com/Cognifide/aet/blob/master/misc/img/aet-logo-black.png?raw=true"
         alt="AET Logo"/>
</p>

## Suite Generator

Client side application that can be used for generating *suite.xml* files used in AET testing. The app is written using React + Redux.

### Development environment

To run the app locally you need: 
* [Node.js][node-js] with [npm][npm-install] package manager
* Webpack installed globally: `npm i webpack -g`

#### Running web application locally

1. Navigate to app's main directory. 
2. Run `npm i` to install required npm modules.
3. To start the app run `npm start`

### Known bugs

1. URL `name` parameter is being ignored. 

[node-js]: https://nodejs.org/en/
[npm-install]: https://docs.npmjs.com/getting-started/installing-node#updating-npm
[docker install guide]: https://docs.docker.com/docker-for-windows/install/
[AET]: https://github.com/Cognifide/aet
[AET Wiki]: https://github.com/Cognifide/aet/wiki
[Open]: https://github.com/Cognifide/aet/wiki/Open
[Collectors]: https://github.com/Cognifide/aet/wiki/Collectors
[Modifiers]: https://github.com/Cognifide/aet/wiki/Modifiers
[url]: https://github.com/Cognifide/aet/wiki/Urls#url

## How to set up Dockerised version (WIP)

1. Install Docker Windows version - [docker install guide]. Ommit this step if already installed.
2. Navigate to app's main workspace folder.
3. Run `docker-compose up -d --build`

### Please remember that the Suite Generator is based on and uses limited features of the [AET] solution made by Cognifide. For further info, please read the [AET Wiki].

## User Guide

Please read the short description on how to use the basic features of the generator.

### Test suite setup.
1. After the tool is successfully built (using Docker), in order to use it, open localhost:3000 in web browser.
2. On first run of the Suite Generator tool, user is asked to fill out the test suite information:
![alt text](/assets/Test-suite-setup.png "Test Suite Wizard")
3. Hit SUBMIT button.
4. The page is built around 3 sections:
	* Left side panel containing all available instructions from the AET features library.
![alt text](/assets/left-side-panel.png "left-side-panel")
	* Main section with current test where the instructions will be drag & dropped.
![alt text](/assets/main-section.png "main-section")
	* Right side panel where the list of created test cases for the test suite are listed. 
	Also, it holds the buttons to Load Suite, Download Suite and Run Suite.	
![alt text](/assets/right-side-panel.png "right-side-panel")

5. Explanation of the main section structure:
	* ####Collect
	This tag contains list of collectors and modifiers which will be run. It specifies what pages' data should be collected and it allows for some data modification before collection step. All collect steps are processed in defined order.
	Following elements are available in collect element:
		* [Open]
		* [Collectors]
		* [Modifiers]
		
	* ####Compare
	This tag contains list of Comparators. Screen comparator takes collected screenshot of the page or just part of it and runs it against comparator. 
	
	* ####URLs
	<urls> element lists all urls which will be processed within the current test. It contains one or more [url] elements.
	
### How to create a working test.
All instructions can be dragged & dropped from the left-side panel to the main section. 

During dragging the components, generator will mark the places those instructions can be placed.
After it’s dropped we can: open wiki page with description of the component, edit its parameters or delete it:
![alt text](/assets/options.png "options")

Let’s create a simple test as a presentation of the tool features.

1. In *Collectors* section you need to add *Open* parameter, which is not editable.
2. The *Cookie* instruction (from *Modifiers*) is used when we need to close an overlay (like newsletter popup or legal disclaimer) before we take the screenshot. It uses parameters like: _action_, _Cookie Name_ or _Cookie Value_. Each site can use different parameters so please use it carefully.
3. Next modifier we need to use is *WaitForPageLoaded*. As the name states - it will wait until the page is fully loaded.
4. We need to tell the runner to set the proper viewport. We use *Resolution* modifier for that.
5. Now it’s time to use *Screen* collector which holds the following parameters: screen *Name*, *XPath/CSS* selectors (used when we want to take a screenshot of a specific component on the page), *Timeout* (how long will the runner wait for specified selector to be available before it takes a screenshot) or *Exclude Elements* (this will tell the runner which specified components are to be ignored by screen comparator).
6. Next step is to add *Screen* comparator - type should be set to layout. We can also set thresholds: pixel or percentage type - this will tell the runner how many differences (in pixels or in screen percentage) are acceptable.
7. Last thing to add here is the *URL* - we can add here the path to the tested page.
8. Now the only thing left to do is to hit *Run Suite* button - overlay with progress and further options will appear: 
![alt text](https://github.com/wojdaa/suite-generator/tree/master/assets/overlay.png "overlay")
We can either close the overlay or show the report - let’s use the latter - you will be redirected to AET report.

#####IMPORTANT: _AdBlock needs to be disabled in order to display the report._

9. After the Run Suite link is clicked - AET report will open:
![alt text](/assets/AET_raport.png "AET_raport")

### Exemplary test.

```xml
<?xml version="1.0" encoding="utf-8"?>
<suite name="TestSuite" company="Cognifide" domain="https://agency-starterkit.unileversolutions.com/us/en" project="ShipIT">
  <test name="PDP">
    <collect>
      <modify-cookie action="add" cookie-name="__ric" cookie-value="true" cookie-domain=".unileversolutions.com"/>
      <open/>
      <wait-for-page-loaded/>
      <scroll css=".bv-content-container"/>
      <resolution width="1920" height="1080"/>
      <screen name="PDP" css="" timeout="15000" exclude-elements=".olapic.component.section.initialized"/>
    </collect>
    <compare>
      <screen comparator="layout" percentageThreshold="0.5"/>
    </compare>
    <urls>
      <url href="/products/skin-care/protect/flex-hand-balm--shoppable-.html"/>
    </urls>
  </test>
  <test name="SignUp">
    <collect>
      <modify-cookie action="add" cookie-name="__ric" cookie-value="true" cookie-domain=".unileversolutions.com"/>
      <open/>
      <wait-for-page-loaded/>
      <click css=".formButton>div>button" timeout="15000"/>
      <resolution width="1920" height="3500"/>
      <screen name="test2" css="#content"/>
    </collect>
    <compare>
      <screen comparator="layout" percentageThreshold="0.5"/>
    </compare>
    <urls>
      <url href="/sign-up.html"/>
    </urls>
  </test>
</suite>
```
