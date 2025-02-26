"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const winston_1 = __importDefault(require("winston"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const child_process_1 = require("child_process");
const toad_scheduler_1 = require("toad-scheduler");
let ScheduleService = class ScheduleService {
    constructor(logger) {
        this.logger = logger;
        this.scheduleStacks = new Map();
        this.intervalSchedule = new toad_scheduler_1.ToadScheduler();
    }
    async createCronTask({ id = 0, command, name, schedule = '' }) {
        const _id = this.formatId(id);
        this.logger.info('[创建cron任务]，任务ID: %s，cron: %s，任务名: %s，执行命令: %s', _id, schedule, name, command);
        this.scheduleStacks.set(_id, node_schedule_1.default.scheduleJob(id + '', schedule, async () => {
            try {
                (0, child_process_1.exec)(command, async (error, stdout, stderr) => {
                    if (error) {
                        await this.logger.info('执行任务%s失败，时间：%s, 错误信息：%j', command, new Date().toLocaleString(), error);
                    }
                    if (stderr) {
                        await this.logger.info('执行任务%s失败，时间：%s, 错误信息：%j', command, new Date().toLocaleString(), stderr);
                    }
                });
            }
            catch (error) {
                await this.logger.info('执行任务%s失败，时间：%s, 错误信息：%j', command, new Date().toLocaleString(), error);
            }
            finally {
            }
        }));
    }
    async cancelCronTask({ id = 0, name }) {
        var _a;
        const _id = this.formatId(id);
        this.logger.info('[取消定时任务]，任务名：%s', name);
        this.scheduleStacks.has(_id) && ((_a = this.scheduleStacks.get(_id)) === null || _a === void 0 ? void 0 : _a.cancel());
    }
    async createIntervalTask({ id = 0, command, name = '' }, schedule) {
        const _id = this.formatId(id);
        this.logger.info('[创建interval任务]，任务ID: %s，任务名: %s，执行命令: %s', _id, name, command);
        const task = new toad_scheduler_1.Task(name, async () => {
            try {
                (0, child_process_1.exec)(command, async (error, stdout, stderr) => {
                    if (error) {
                        await this.logger.info('执行任务%s失败，时间：%s, 错误信息：%j', command, new Date().toLocaleString(), error);
                    }
                    if (stderr) {
                        await this.logger.info('执行任务%s失败，时间：%s, 错误信息：%j', command, new Date().toLocaleString(), stderr);
                    }
                });
            }
            catch (error) {
                await this.logger.info('执行任务%s失败，时间：%s, 错误信息：%j', command, new Date().toLocaleString(), error);
            }
            finally {
            }
        });
        const job = new toad_scheduler_1.SimpleIntervalJob(Object.assign({}, schedule), task, _id);
        this.intervalSchedule.addIntervalJob(job);
    }
    async cancelIntervalTask({ id = 0, name }) {
        const _id = this.formatId(id);
        this.logger.info('[取消interval任务]，任务ID: %s，任务名：%s', _id, name);
        this.intervalSchedule.removeById(_id);
    }
    formatId(id) {
        return String(id);
    }
};
ScheduleService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('logger')),
    __metadata("design:paramtypes", [Object])
], ScheduleService);
exports.default = ScheduleService;
//# sourceMappingURL=schedule.js.map