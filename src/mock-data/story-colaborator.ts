export interface IStoryCollaborator {
  storyId: string;
  userId: string;
  role: 'OWNER' | 'CO_AUTHOR' | 'MODERATOR' | 'REVIEWER' | 'CONTRIBUTOR';
  invitedBy?: string;
  invitedAt: Date;
  acceptedAt?: Date | null;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'REMOVED';
  createdAt: Date;
  updatedAt: Date;
}

import { faker } from '@faker-js/faker';

const ROLES = ['OWNER', 'CO_AUTHOR', 'MODERATOR', 'REVIEWER', 'CONTRIBUTOR'] as const;

const STATUS = ['PENDING', 'ACCEPTED', 'DECLINED', 'REMOVED'] as const;

export function generateFakeStoryCollaborator(): IStoryCollaborator {
  const status = faker.helpers.arrayElement(STATUS);

  const acceptedAt =
    status === 'ACCEPTED' ? faker.date.between({ from: '2023-01-01', to: '2025-01-01' }) : null;

  return {
    storyId: faker.database.mongodbObjectId(),
    userId: faker.string.uuid(),
    role: faker.helpers.arrayElement(ROLES),

    invitedBy: faker.string.uuid(),
    invitedAt: faker.date.past({ years: 1 }),

    acceptedAt,

    status,

    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent({ days: 10 }),
  };
}

export function generateFakeStoryCollaborators(count: number = 20) {
  return Array.from({ length: count }, () => generateFakeStoryCollaborator());
}
