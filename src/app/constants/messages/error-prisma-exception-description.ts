import { HttpStatus } from '@nestjs/common';

export const userPrismaErrorMessage: {
  [key: string]: { statusCode: number; description: string };
} = {
  P2002: {
    statusCode: HttpStatus.FORBIDDEN,
    description: 'Пользователь с таким публичным именем уже существует',
  },
  P2003: {
    statusCode: HttpStatus.NOT_FOUND,
    description: 'выбранной группы не существует',
  },
  P2025: {
    statusCode: HttpStatus.NOT_FOUND,
    description: 'пользователь не существует',
  },
};

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

export const contestPrismaErrorMessage: {
  [key: string]: { statusCode: number; description: string };
} = {
  P2003: {
    statusCode: HttpStatus.FORBIDDEN,
    description: 'Конкурс с таким названием уже существует',
  },
  P2025: {
    statusCode: HttpStatus.NOT_FOUND,
    description: 'Запрашиваемого конкурса не существует',
  },
};
