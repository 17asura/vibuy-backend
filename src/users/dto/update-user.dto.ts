import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// PartialType -> transforma todos os campos em opcionais
export class UpdateUserDto extends PartialType(CreateUserDto) {}
