import {Test, TestingModule} from "@nestjs/testing";
import AuthTokenAdapter from "../../module/adapters/AuthTokenAdapter";
import TechnicalException from "../../../../../../entities/src/module/common/exception/TechnicalException";
import Logger from "../../../../../helpers/logger/src/module/Logger";
import Channel from "../../../../../../entities/src/module/entities/channel/Channel";
import * as jwt from "jsonwebtoken";

describe("AuthTokenAdapter", () => {

    let authTokenAdapter: AuthTokenAdapter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthTokenAdapter, Logger],
        }).compile();
        authTokenAdapter = module.get<AuthTokenAdapter>(AuthTokenAdapter);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("createAuthorizationToken", () => {
        it("should retrieve authorization token.", async () => {
            const channel = new Channel("promotor", "pro");
            const authorizationToken = authTokenAdapter.createAuthorizationToken(channel, "any-secret-key");
            expect(authorizationToken.getDuration()).toEqual("1h");
        });
        it("should retrieve technical exception.", () => {
            jest.spyOn(jwt, 'sign').mockImplementation(() => { throw new Error('Simulated JWT sign error') });
            const channel = new Channel("promotor", "pro");
            expect(() => authTokenAdapter.createAuthorizationToken(channel, "any-secret-key")).toThrow(TechnicalException);
        });
    });
    
    describe("validateAuthorizationToken", () => {
        it("should return true when valid token.", async () => {
            const channel = new Channel("promotor", "pro");
            const secretKey = "any-secret-key";
            const authorizationToken = authTokenAdapter.createAuthorizationToken(channel, secretKey);
            expect(authTokenAdapter.validateAuthorizationToken(authorizationToken.getToken(), secretKey)).toEqual(true);
        });
        it("should retrieve technical exception.", () => {
            expect(() => authTokenAdapter.validateAuthorizationToken("any-token", "any-secret-key")).toThrow(TechnicalException);
        });
    });

    describe("getPayloadFromToken", () => {
        it("should return channel when token is valid.", async () => {
            const channel = new Channel("promotor", "pro");
            const secretKey = "any-secret-key";
            const authorizationToken = authTokenAdapter.createAuthorizationToken(channel, secretKey);
            const channelFromToken = authTokenAdapter.getPayloadFromToken(authorizationToken.getToken());
            expect(channelFromToken.getAcronym()).toEqual("pro");
        });
        it("should retrieve technical exception.", () => {
            expect(() => authTokenAdapter.getPayloadFromToken("any-token")).toThrow(TechnicalException);
        });
    });

    describe("isTokenExpired", () => {
        it("should return true when the token has not expired.", async () => {
            const channel = new Channel("promotor", "pro");
            const secretKey = "any-secret-key";
            const authorizationToken = authTokenAdapter.createAuthorizationToken(channel, secretKey);
            expect(authTokenAdapter.isTokenExpired(authorizationToken.getToken())).toEqual(false);
        });
        it("should return true when the token has expired.", async () => {
            const authorizationToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNoYW5uZWwiOiJCYW5jb2xvbWJpYSIsImFjcm9ueW0iOiJhcHAifSwiaWF0IjoxNzA4MDM1MTk0LCJleHAiOjE3MDgxMjE1OTR9.Sb5lHHH08SiRZORdsNgz4ke6VS3ZwwOXI7GBIskSt0M";
            expect(authTokenAdapter.isTokenExpired(authorizationToken)).toEqual(true);
        });
        it("should retrieve technical exception.", () => {
            expect(() => authTokenAdapter.isTokenExpired("any-token")).toThrow(TechnicalException);
        });
    });

});
