import * as Lab from "lab";
import notationSuite from "./suites/notation-suite";
import manyMappings from "./suites/many-mappings-suite";
import mappingSuite from "./suites/mapping-suite";

const lab = exports.lab = Lab.script();

notationSuite.run(lab, {
  LABELS: ["arrays", "single mapping array"],
  GET_ITEM: "array.[].id",
  SET_ITEM: "array.levels.[].id",
  SOURCE: {
    array: [{ id: 1 }, { id: 2 }, { id: 3 }]
  },
  EXPECTED: {
    array: {
      levels: [{ id: 1 }, { id: 2 }, { id: 3 }]
    }
  },
  NO_SOURCE_EXPECTED: {
  },
  MODIFY_VALUE: "modified",
  MODIFIED_EXPECTED: {
    array: {
      levels: [{ id: "modified" }]
    }
  }
});

// size is missing from source
const labels = ["arrays", "mix of available and missing data"];
const mappings = [
  { from: "propertySpaces.[].useType.parentCategory", to: "property.spaces.[].useTypeParentCategory" },
  { from: "propertySpaces.[].size", to: "property.spaces.[].size" }
];
const expected = {
  "property":
  {
    "spaces": [{
      "useTypeParentCategory": "Office"
    }]
  }
};
const source = {
  "propertySpaces": [
    {
      "useType": {
        "name": "Office",
        "sector": "Business (B1a)",
        "category": "Office",
        "parentCategory": "Office"
      }
    }
  ]
};

// manyMappings.run(lab, {
//   LABELS: labels,
//   MAPPINGS: mappings,
//   SOURCE: source,
//   EXPECTED: expected,
//   EXPERIMENTAL: true
// });

manyMappings.run(lab, {
  LABELS: labels,
  MAPPINGS: mappings,
  SOURCE: source,
  EXPECTED: expected,
  EXPERIMENTAL: false
});

mappingSuite.run(lab, {
  LABELS: ["arrays", "all items in an array are undefined"],
  GET_ITEM: "unit.levels[].useType",
  SET_ITEM: "[].useType",
  SOURCE: {
    "unit": {
      "levels": [{
        "name": "notEmpty",
        "number": 10,
        "size": {
          "measurement": "SqM",
          "value": 122
        }
      },
      {
        "name": "notEmpty2",
        "number": 12,
        "size": {
          "measurement": "SqM",
          "value": 142
        }
      }]
    }
  },
  EXPECTED: [],
  EXPERIMENTAL: false
});

mappingSuite.run(lab, {
  LABELS: ["arrays", "only some item in an array are undefined"],
  GET_ITEM: "unit.levels[].useType",
  SET_ITEM: "[].useType",
  SOURCE: {
    "unit": {
      "levels": [{
        "name": "notEmpty",
        "number": 10,
        "size": {
          "measurement": "SqM",
          "value": 122
        }
      },
      {
        "name": "notEmpty",
        "number": 10,
        "size": {
          "measurement": "SqM",
          "value": 122
        },
        "useType": "notEmpty"
      }]
    }
  },
  EXPECTED: [null, { useType: "notEmpty" }],
  EXPERIMENTAL: false
});

manyMappings.run(lab, {
  LABELS: ["arrays", "arrays of arrays"],
  MAPPINGS: [
    { from: "foo[].name", to: "bar[].label" },
    { from: "foo[].things[]", to: "bar[].values[]" }
  ],
  SOURCE: {
    foo: [
      { "name": "a", "things": ["a1", "a2"] },
      { "name": "b", "things": ["b1", "b2"] }
    ]
  },
  EXPECTED: {
    bar: [{
      label: "a",
      values: ["a1", "a2"]
    },
    {
      label: "b",
      values: ["b1", "b2"]
    }
    ]
  },
  EXPERIMENTAL: false
});


manyMappings.run(lab, {
  LABELS: ["arrays", "arrays of arrays inverted"],
  MAPPINGS: [
    { from: "foo[].things[]", to: "bar[].values[]" },
    { from: "foo[].name", to: "bar[].label" }
  ],
  SOURCE: {
    foo: [
      { "name": "a", "things": ["a1", "a2"] },
      { "name": "b", "things": ["b1", "b2"] }
    ]
  },
  EXPECTED: {
    bar: [{
      label: "a",
      values: ["a1", "a2"]
    },
    {
      label: "b",
      values: ["b1", "b2"]
    }
    ]
  },
  EXPERIMENTAL: false
});

