"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.users.findUnique({
                where: { email: 'jh@gmail.com' },
            });
            const jsonDogs = JSON.parse(yield (0, promises_1.readFile)(`${__dirname}/MOCK_DATADog.json`, 'utf-8'));
            const jsonConditions = JSON.parse(yield (0, promises_1.readFile)(`${__dirname}/MockDataConditions.json`, 'utf-8'));
            const dogs = jsonDogs.map((dog) => {
                return Object.assign(Object.assign({}, dog), { vetId: user === null || user === void 0 ? void 0 : user.id });
            });
            yield prisma.dogsConditions.deleteMany({});
            yield prisma.conditions.deleteMany({});
            yield prisma.dogs.deleteMany({
                where: { vetId: user === null || user === void 0 ? void 0 : user.id },
            });
            yield Promise.all(dogs.map((dog) => __awaiter(this, void 0, void 0, function* () {
                yield prisma.dogs.create({
                    data: dog,
                });
            })));
            yield Promise.all(jsonConditions.map((condition) => __awaiter(this, void 0, void 0, function* () {
                yield prisma.conditions.create({
                    data: condition,
                });
            })));
            const randomConditionIds = yield prisma.$queryRaw `
      SELECT id
      FROM "Conditions"
      ORDER BY RANDOM()
      LIMIT 5
    `;
            const conditionIdsArray = randomConditionIds.map((condition) => condition.id);
            const randomDogIds = yield prisma.$queryRaw `
  SELECT id
  FROM "Dogs"
  ORDER BY RANDOM()
  LIMIT 5
  `;
            const randomDogIdsArray = randomDogIds.map((dogId) => dogId.id);
            const dogsConditionsData = [];
            for (const dogId of randomDogIdsArray) {
                for (const conditionId of conditionIdsArray) {
                    dogsConditionsData.push({
                        dogId,
                        conditionId,
                    });
                }
            }
            yield Promise.all(dogsConditionsData.map((dogCondition) => __awaiter(this, void 0, void 0, function* () {
                yield prisma.dogsConditions.create({
                    data: dogCondition,
                });
            })));
            process.exit(0);
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    });
}
main();
