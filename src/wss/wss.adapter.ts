import { INestApplication, NotImplementedException } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { NextFunction } from "express";
import { ServerOptions, Server, Socket } from "socket.io";
import * as jwt from 'jsonwebtoken';
import config from "config";

const jwt_secret: string = config.get("JWT_SECRET");



export class CustomIoAdapter extends IoAdapter{
    constructor(app: INestApplication){
        super(app);
    }

    createIOServer(port: number, options?: ServerOptions): Server {
      throw new NotImplementedException("CREATE IO SERVER")
    }
}