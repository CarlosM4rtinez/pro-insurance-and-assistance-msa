import {PrismaClient} from "@prisma/client";
import {mockDeep, mockReset, DeepMockProxy} from "jest-mock-extended";

import PrismaService from "../module/config/PrismaService";

jest.mock("../module/config/PrismaService", () => ({
    __esModule: true,
    default: mockDeep<PrismaService>(),
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = PrismaService as unknown as DeepMockProxy<PrismaClient>;