"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bus = void 0;
var mitt_1 = __importDefault(require("mitt"));
var eventBus = (0, mitt_1.default)();
exports.bus = eventBus;
