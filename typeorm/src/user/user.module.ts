import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { UserProfile } from './mappers';

@Module({ providers: [UserProfile], imports: [DatabaseModule] })
export class UserModule {}
