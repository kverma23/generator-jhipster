'use strict';

const expect = require('chai').expect,
    JDLValidation = require('../../../lib/core/jdl_validation');

describe('JDLValidation', function () {
  describe('::new', function () {
    describe('when not passing any argument', function () {
      it("defaults on the 'required' validation", function () {
        var validation = new JDLValidation();
        expect(validation.name).to.eq('required');
        expect(validation.value).to.be.null;
      });
    });
    describe('when passing arguments', function () {
      it('uses them', function () {
        var validation = new JDLValidation({
          name: 'min',
          value: 42
        });
        expect(validation.name).to.eq('min');
        expect(validation.value).to.eq(42);
      });
    });
  });
  describe('::isValid', function() {
    describe('when checking the validity of an object', function() {
      it('returns false', function() {
        expect(JDLValidation.isValid(null)).to.be.false;
        expect(JDLValidation.isValid(undefined)).to.be.false;
      });
    });
    describe('when checking the validity of an object without a name attribute', function() {
      it('returns false', function() {
        expect(JDLValidation.isValid({})).to.be.false;
      });
    });
    describe('when checking the validity of an object with a name attribute', function() {
      it('returns true', function() {
        expect(JDLValidation.isValid({name: 'required'})).to.be.true;
      });
    });
  });
  describe('#toString', function () {
    describe('with no value', function () {
      it('stringifies its content', function () {
        var validation = new JDLValidation();
        expect(validation.toString()).to.eq('required');
      });
    });
    describe('with a value', function () {
      it('stringifies its content', function () {
        var args = {
          name: 'min',
          value: 42
        };
        var validation = new JDLValidation(args);
        expect(validation.toString()).to.eq(`${args.name}(${args.value})`)
      });
    });
  });
});
