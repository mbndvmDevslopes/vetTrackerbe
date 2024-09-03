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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.dogs.deleteMany();
        const dogData = [
            {
                name: 'M',
                breed: 'toy poodle',
                sex: 'M',
                weight: 100,
                birthDate: new Date(),
                isActive: true,
                dateVisited: new Date(),
                notes: 'Max is a very good dog',
                vetId: '33ef9df6-0cfe-4b36-ac92-82b102004865',
                ownerName: 'Jeremy Schiller',
            },
            {
                name: 'Benson',
                breed: 'Poodle',
                sex: 'M',
                weight: 100,
                birthDate: new Date(),
                isActive: true,
                dateVisited: new Date(),
                notes: 'Max is a very good dog',
                vetId: '33ef9df6-0cfe-4b36-ac92-82b102004865',
                ownerName: 'Jenny Schiller',
            },
            {
                name: 'Minnie',
                breed: 'toy poodle',
                sex: 'm',
                weight: 9,
                birthDate: new Date(),
                isActive: true,
                dateVisited: new Date(),
                notes: 'Minnie will bite',
                vetId: '33ef9df6-0cfe-4b36-ac92-82b102004865',
                ownerName: 'John Jones',
            },
            {
                name: 'Milie',
                breed: 'Poodle',
                sex: 'F',
                weight: 65,
                birthDate: new Date(),
                isActive: true,
                dateVisited: new Date(),
                notes: 'Milie smiles',
                vetId: '33ef9df6-0cfe-4b36-ac92-82b102004865',
                ownerName: 'Joan Jett',
            },
        ];
        for (const dog of dogData) {
            yield prisma.dogs.create({
                data: dog,
            });
        }
    });
}
main().catch((e) => {
    console.error('Something went wrong');
    console.error(e);
});
