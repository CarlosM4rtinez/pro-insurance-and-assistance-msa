import {HttpStatus, INestApplication} from "@nestjs/common";
import Channel from "../../../../../entities/src/module/entities/channel/Channel";
import {Response} from "supertest";
import * as request from "supertest";
import IChannelRepository from "entities/src/module/entities/channel/gateway/IChannelRepository";

export function checkBadRequest(response: Response) {
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    checkErrorSignature(response.body);
}

export function checkUnauthorized(response: Response) {
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    checkErrorSignature(response.body);
}

export function checkInternalServerError(response: Response) {
    expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    checkErrorSignature(response.body);
}

export function checkConflict(response: Response) {
    expect(response.status).toBe(HttpStatus.CONFLICT);
    checkErrorSignature(response.body);
}

export function checkCreated(response: Response) {
    expect(response.status).toBe(HttpStatus.CREATED);
}

export function checkOk(response: Response) {
    expect(response.status).toBe(HttpStatus.OK);
}

export function checkErrorSignature(body: any) {
    expect(body).toHaveProperty("traceId");
    expect(body).toHaveProperty("code");
    expect(body).toHaveProperty("message");
    expect(body).toHaveProperty("reason");
}

export function buildChannel() {
    return new Channel("promotor", "pro", "$2b$10$6vOWi8ZCRFwnu8IbnqKAtOgAoO9Rgts/LJFK1DujvBtr9dPP0zU8G");
}

export function mockChannel(channelRepositoryMock: jest.Mocked<IChannelRepository>) {
    channelRepositoryMock.findByAcronym.mockResolvedValueOnce(buildChannel());
}

export async function createAuthToken(app: INestApplication, channelRepositoryMock: jest.Mocked<IChannelRepository>) {
    mockChannel(channelRepositoryMock);
    const response = await request(app.getHttpServer())
        .post("/api/v1/channel/auth-token")
        .send({
            channel: "pro",
            secretKey: "OTY5NWYzZWQzYTg4NDYyZjkyMTdmMTRkMGY3MWFlMjU5Njk1ZjNlZDNhODg0NjJmOTIxN2YxNGQwZjcxYWUyNQ",
        })
        .set("Accept", "application/json");
    return response.body.token;
}
