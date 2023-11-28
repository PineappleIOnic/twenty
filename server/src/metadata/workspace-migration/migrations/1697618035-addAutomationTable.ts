import {
  WorkspaceMigrationColumnActionType,
  WorkspaceMigrationTableAction,
} from 'src/metadata/workspace-migration/workspace-migration.entity';

export const addAutomationTable: WorkspaceMigrationTableAction[] = [
  {
    name: 'automation',
    action: 'create',
  },
  {
    name: 'automation',
    action: 'alter',
    columns: [
      {
        columnName: 'name',
        columnType: 'varchar',
        action: WorkspaceMigrationColumnActionType.CREATE,
        defaultValue: "''",
      },
      {
        columnName: 'body',
        columnType: 'varchar',
        action: WorkspaceMigrationColumnActionType.CREATE,
        defaultValue: "'{}'",
      },
      {
        columnName: 'type',
        columnType: 'varchar',
        action: WorkspaceMigrationColumnActionType.CREATE,
        defaultValue: "'Simple'",
      },
      {
        columnName: 'reminderAt',
        columnType: 'timestamp',
        action: WorkspaceMigrationColumnActionType.CREATE,
      },
      {
        columnName: 'cron',
        columnType: 'timestamp',
        action: WorkspaceMigrationColumnActionType.CREATE,
      },
      {
        columnName: 'completedAt',
        columnType: 'timestamp',
        action: WorkspaceMigrationColumnActionType.CREATE,
      },
      {
        columnName: 'authorId',
        columnType: 'uuid',
        action: WorkspaceMigrationColumnActionType.CREATE,
      },
    ],
  },
];
