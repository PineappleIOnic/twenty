import { DataSource } from 'typeorm';

import { SeedObjectMetadataIds } from 'src/database/typeorm-seeds/metadata/object-metadata';
import { FieldMetadataType } from 'src/metadata/field-metadata/field-metadata.entity';
import { SeedWorkspaceId } from 'src/database/typeorm-seeds/core/workspaces';

const fieldMetadataTableName = 'fieldMetadata';

export enum SeedAutomationFieldMetadataIds {
  Id = '20202020-f62b-4cff-91d1-931ece7831a2',
  CreatedAt = '20202020-7bb4-414d-861e-6e18f7b180eb',
  UpdatedAt = '20202020-0b79-444e-802f-3be382019949',

  Name = '20202020-c27e-4a34-b923-1eb94eaaecf7',
  Body = '20202020-d867-43c0-b0c1-1d51d998a0da',
  Type = '20202020-b05e-4f30-ab81-e0ee97b8265e',
  ReminderAt = '20202020-7d5d-4abb-96df-e9dfaf7d8b49',
  Cron = '20202020-8c05-4288-a650-500cd97e280f',
  CompletedAt = '20202020-dc29-497c-afc1-ffa6258538db',

  AutomationTriggers = '20202020-ada4-43c0-968a-4530ddc61a01',
  AutomationTargets = '20202020-3093-430f-809a-94556a71d735',
  Author = '20202020-58de-4f22-ba0f-13719f95fc3e',
  AuthorForeignKey = '20202020-6aa8-44f1-a60c-1675f493d8e9',
}

export const seedAutomationFieldMetadata = async (
  workspaceDataSource: DataSource,
  schemaName: string,
) => {
  await workspaceDataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${fieldMetadataTableName}`, [
      'id',
      'objectMetadataId',
      'isCustom',
      'workspaceId',
      'isActive',
      'type',
      'name',
      'label',
      'targetColumnMap',
      'description',
      'icon',
      'isNullable',
      'isSystem',
      'defaultValue',
    ])
    .orIgnore()
    .values([
      // Default fields
      {
        id: SeedAutomationFieldMetadataIds.Id,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.UUID,
        name: 'id',
        label: 'Id',
        targetColumnMap: {
          value: 'id',
        },
        description: undefined,
        icon: undefined,
        isNullable: false,
        isSystem: true,
        defaultValue: { type: 'uuid' },
      },
      {
        id: SeedAutomationFieldMetadataIds.CreatedAt,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.DATE_TIME,
        name: 'createdAt',
        label: 'Creation date',
        targetColumnMap: {
          value: 'createdAt',
        },
        description: undefined,
        icon: 'IconCalendar',
        isNullable: false,
        isSystem: true,
        defaultValue: { type: 'now' },
      },
      {
        id: SeedAutomationFieldMetadataIds.UpdatedAt,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.DATE_TIME,
        name: 'updatedAt',
        label: 'Update date',
        targetColumnMap: {
          value: 'updatedAt',
        },
        description: undefined,
        icon: 'IconCalendar',
        isNullable: false,
        isSystem: true,
        defaultValue: { type: 'now' },
      },
      // Primary identifier
      {
        id: SeedAutomationFieldMetadataIds.Name,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.TEXT,
        name: 'name',
        label: 'Name',
        targetColumnMap: {
          value: 'name',
        },
        description: 'Automation name',
        icon: 'IconNotes',
        isNullable: true,
        isSystem: false,
        defaultValue: { value: '' },
      },

      // Scalar fields
      {
        id: SeedAutomationFieldMetadataIds.Body,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.TEXT,
        name: 'body',
        label: 'Body',
        targetColumnMap: {
          value: 'body',
        },
        description: 'Automation body',
        icon: 'IconList',
        isNullable: true,
        isSystem: false,
        defaultValue: { value: '' },
      },
      {
        id: SeedAutomationFieldMetadataIds.Type,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.TEXT,
        name: 'type',
        label: 'Type',
        targetColumnMap: {
          value: 'type',
        },
        description: 'Automation type',
        icon: 'IconCheckbox',
        isNullable: false,
        isSystem: false,
        defaultValue: { value: 'Simple' },
      },
      {
        id: SeedAutomationFieldMetadataIds.ReminderAt,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.DATE_TIME,
        name: 'reminderAt',
        label: 'Reminder Date',
        targetColumnMap: {
          value: 'reminderAt',
        },
        description: 'Automation reminder date',
        icon: 'IconCalendarEvent',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedAutomationFieldMetadataIds.Cron,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.DATE_TIME,
        name: 'cron',
        label: 'Cron',
        targetColumnMap: {
          value: 'cron',
        },
        description: 'Automation cron timer',
        icon: 'IconCalendarEvent',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedAutomationFieldMetadataIds.CompletedAt,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.DATE_TIME,
        name: 'completedAt',
        label: 'Completion Date',
        targetColumnMap: {
          value: 'completedAt',
        },
        description: 'Automation completion date',
        icon: 'IconCheck',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },

      // Relationships
      {
        id: SeedAutomationFieldMetadataIds.AutomationTargets,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.RELATION,
        name: 'automationTargets',
        label: 'Targets',
        targetColumnMap: {},
        description: 'Automation targets',
        icon: 'IconCheckbox',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedAutomationFieldMetadataIds.Author,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.RELATION,
        name: 'author',
        label: 'Author',
        targetColumnMap: {
          value: 'authorId',
        },
        description:
          'Automation author. This is the person who created the automation',
        icon: 'IconUserCircle',
        isNullable: true,
        isSystem: false,
        defaultValue: undefined,
      },
      {
        id: SeedAutomationFieldMetadataIds.AuthorForeignKey,
        objectMetadataId: SeedObjectMetadataIds.Automation,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: FieldMetadataType.UUID,
        name: 'authorId',
        label: 'Author id (foreign key)',
        targetColumnMap: {},
        description: 'Automation author id foreign key',
        icon: undefined,
        isNullable: false,
        isSystem: true,
        defaultValue: undefined,
      },
    ])
    .execute();
};
