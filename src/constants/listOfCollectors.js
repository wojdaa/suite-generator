const listOfCollectors =
[
  {
    type: "Open",
    tag: "open",
    parameters: null,
    deps: null,
    depType: null,
    dropTo: "Collectors",
    group: "Open",
    proxy: "false",
  },
  {
    visibility: false,
    type: 'Accessibility',
    tag: "accessibility",
    parameters: {
      standard: {
        name: "Standard",
        tag: "standard",
        values: ['WCAG2A', 'WCAG2AA', 'WCAG2AAA'],
        default: 'WCAG2AA',
        isMandatory: false,
        description: "The parameter specifies the standard which the page is validated against",
        current: null,
      }
    },
    deps: "accessibility-comparators",
    depType: "Warning",
    dropTo: "Collectors",
    group: "Collectors",
    proxy: "false",
    wiki: "https://github.com/Cognifide/aet/wiki/AccessibilityCollector",
  },
  {
    visibility: false,
    type: 'Client Side Performance',
    tag: "client-side-performance",
    parameters: null,
    deps: "clientsideperformance-comparators",
    depType: "Warning",
    dropTo: "Collectors",
    group: "Collectors",
    proxy: "true",
    wiki: "https://github.com/Cognifide/aet/wiki/ClientSidePerformanceComparator",
  },
  {
    visibility: false,
    type: 'Cookie',
    tag: "cookie",
    parameters: null,
    deps: "cookie-comparators",
    depType: "Warning",
    dropTo: "Collectors",
    group: "Collectors",
    proxy: "false",
    wiki: "https://github.com/Cognifide/aet/wiki/CookieCollector",
  },
  {
    visibility: false,
    type: 'JS Errors',
    tag: "js-errors",
    parameters: null,
    deps: "jserrors-comparators",
    depType: "Warning",
    dropTo: "Collectors",
    group: "Collectors",
    proxy: "false",
    wiki: "https://github.com/Cognifide/aet/wiki/JSErrorsCollector",
  },
  {
    type: 'Screen',
    tag: "screen",
    parameters: {
      name: {
        name: "Name",
        tag: "name",
        values: null,
        default: null,
        isMandatory: false,
        description: "Name of that test.",
        current: null,
      },
      xpath: {
        name: "XPath",
        tag: "xpath",
        values: null,
        default: null,
        isMandatory: false,
        description: "XPath to element(s)",
        current: null,
      },
      css: {
        name: "CSS",
        tag: "css",
        values: null,
        default: null,
        isMandatory: false,
        description: "CSS selector to element(s)",
        current: null,
      },
      timeout: {
        name: "Timeout",
        tag: "timeout",
        values: null,
        default: "1000ms",
        isMandatory: false,
        description: "The timeout for the element to appear, in milliseconds. The max value of this parameter is 15000ms",
        current: null,
      },
      excludeelements: {
        name: "Exclude Elements",
        tag: "exclude-elements",
        values: null,
        default: null,
        isMandatory: false,
        description: "Elements found with that selector will be ignored by layout comparator (they won't affect its results) but will be rendered on the report as captured.",
        current: null,
      },
    },
    deps: "screen-comparators",
    depType: "Warning",
    dropTo: "Collectors",
    group: "Collectors",
    proxy: "false",
    wiki: "https://github.com/Cognifide/aet/wiki/ScreenCollector",
  },
  {
    visibility: false,
    type: 'Source',
    tag: "source",
    parameters: null,
    deps: "source-comparators",
    depType: "Warning",
    dropTo: "Collectors",
    group: "Collectors",
    proxy: "false",
    wiki: "https://github.com/Cognifide/aet/wiki/SourceCollector",
  },
  {
    visibility: false,
    type: 'Status Codes',
    tag: "status-codes",
    parameters: null,
    deps: "statuscodes-comparators",
    depType: "Warning",
    dropTo: "Collectors",
    group: "Collectors",
    proxy: "true",
    wiki: "https://github.com/Cognifide/aet/wiki/StatusCodesCollector",
  },
];

export default listOfCollectors;
