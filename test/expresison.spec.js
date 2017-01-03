'use strict';

var expect = require('chai').expect;
var Expression = require('../app/scripts/expression');

describe('expression', function () {

  it('should initialize expression with unmodified input string', function () {
    var expression = new Expression({
      string: ' p and q '
    });
    expect(expression).to.have.property('string', ' p and q ');
  });

  function testExprs(args) {
    // Generate a test for each supplied expression
    args.exprStrings.forEach(function (exprString) {
      var expression = new Expression({string: exprString});
      it('should evaluate `' + exprString + '`', function () {
        // Test each expression against the given permutations of variable
        // values and the expected outputs
        args.testCases.forEach(function (testCase) {
          var actualOutput = expression.evaluate(testCase.varValues);
          expect(actualOutput).to.equal(testCase.output);
        });
      });
    });
  }

  describe('NOT operation', function () {
    testExprs({
      exprStrings: ['not p', 'not  p', 'NoT p', '!p', '!  p'],
      testCases: [
        {varValues: {p: false}, output: true},
        {varValues: {p: true}, output: false}
      ]
    });
  });

  describe('AND operation', function () {
    testExprs({
      exprStrings: ['p and q', 'p  and   q', 'p AnD q', 'p&q', 'p  &  q'],
      testCases: [
        {varValues: {p: false, q: false}, output: false},
        {varValues: {p: false, q: true}, output: false},
        {varValues: {p: true, q: false}, output: false},
        {varValues: {p: true, q: true}, output: true},
      ]
    });
  });

  describe('NAND operation', function () {
    testExprs({
      exprStrings: ['p nand q', 'p  nand   q', 'p nAnD q'],
      testCases: [
        {varValues: {p: false, q: false}, output: true},
        {varValues: {p: false, q: true}, output: true},
        {varValues: {p: true, q: false}, output: true},
        {varValues: {p: true, q: true}, output: false},
      ]
    });
  });

  describe('OR operation', function () {
    testExprs({
      exprStrings: ['p or q', 'p  or   q', 'p oR q', 'p|q', 'p  |  q'],
      testCases: [
        {varValues: {p: false, q: false}, output: false},
        {varValues: {p: false, q: true}, output: true},
        {varValues: {p: true, q: false}, output: true},
        {varValues: {p: true, q: true}, output: true},
      ]
    });
  });

  describe('NOR operation', function () {
    testExprs({
      exprStrings: ['p nor q', 'p  nor   q', 'p NoR q'],
      testCases: [
        {varValues: {p: false, q: false}, output: true},
        {varValues: {p: false, q: true}, output: false},
        {varValues: {p: true, q: false}, output: false},
        {varValues: {p: true, q: true}, output: false},
      ]
    });
  });

  describe('XOR operation', function () {
    testExprs({
      exprStrings: ['p xor q', 'p  xor   q', 'p XoR q', 'p^q', 'p  ^  q'],
      testCases: [
        {varValues: {p: false, q: false}, output: false},
        {varValues: {p: false, q: true}, output: true},
        {varValues: {p: true, q: false}, output: true},
        {varValues: {p: true, q: true}, output: false},
      ]
    });
  });

});
