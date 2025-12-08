export type ReportReason =
  | 'spam'
  | 'harassment'
  | 'hate'
  | 'nudity'
  | 'violence'
  | 'plagiarism'
  | 'misinformation'
  | 'other';

export interface Report {
  id: string;
  reporterId: string;
  targetId: string; // story/chapter/comment/user id
  targetType: 'story' | 'chapter' | 'comment' | 'user';
  reason: ReportReason;
  message?: string;
  createdAt: Date;
}

import { faker } from '@faker-js/faker';

const REPORT_REASONS: ReportReason[] = [
  'spam',
  'harassment',
  'hate',
  'nudity',
  'violence',
  'plagiarism',
  'misinformation',
  'other',
];

const TARGET_TYPES = ['story', 'chapter', 'comment', 'user'] as const;

export function generateFakeReport(): Report {
  return {
    id: faker.string.uuid(),
    reporterId: faker.string.uuid(),
    targetId: faker.string.uuid(),
    targetType: faker.helpers.arrayElement(TARGET_TYPES),
    reason: faker.helpers.arrayElement(REPORT_REASONS),
    message: faker.lorem.sentences(2),
    createdAt: faker.date.recent({ days: 20 }),
  };
}

export function generateFakeReports(count: number = 30): Report[] {
  return Array.from({ length: count }, () => generateFakeReport());
}
