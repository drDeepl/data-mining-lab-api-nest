import { HttpStatus } from '@nestjs/common';

export const researchPaperPrismaErrorMessage: {
  [key: string]: { statusCode: number; description: string };
} = {
  P2002: {
    statusCode: HttpStatus.FORBIDDEN,
    description: 'Тема научной статьи с таким названием уже существует',
  },
  P2025: {
    statusCode: HttpStatus.NOT_FOUND,
    description: 'Запрашиваемой темы с научной статьей  не существует',
  },
};
