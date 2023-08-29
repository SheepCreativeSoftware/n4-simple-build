"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProject = void 0;
const buntstift_1 = require("buntstift");
const initCliPromt_1 = require("./initCliPromt");
const initProject = () => {
    buntstift_1.buntstift.verbose('Init Project');
    (0, initCliPromt_1.initCliPromt)();
};
exports.initProject = initProject;
