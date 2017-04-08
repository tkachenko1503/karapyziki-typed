import { Module } from 'nest.js';
import { MainController } from './main.controller';

@Module({
    controllers: [ MainController ]
})
export class MainModule {}
