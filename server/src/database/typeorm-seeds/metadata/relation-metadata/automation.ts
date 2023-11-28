import { DataSource } from 'typeorm';

import { RelationMetadataType } from 'src/metadata/relation-metadata/relation-metadata.entity';
import { SeedObjectMetadataIds } from 'src/database/typeorm-seeds/metadata/object-metadata';
import { SeedAutomationFieldMetadataIds } from 'src/database/typeorm-seeds/metadata/field-metadata/automation';
import { SeedAutomationTargetFieldMetadataIds } from 'src/database/typeorm-seeds/metadata/field-metadata/automation-target';
import { SeedWorkspaceId } from 'src/database/typeorm-seeds/core/workspaces';

const tableName = 'relationMetadata';

export const seedAutomationRelationMetadata = async (
  workspaceDataSource: DataSource,
  schemaName: string,
) => {
  await workspaceDataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${tableName}`, [
      'relationType',
      'fromObjectMetadataId',
      'toObjectMetadataId',
      'fromFieldMetadataId',
      'toFieldMetadataId',
      'workspaceId',
    ])
    .orIgnore()
    .values([
      {
        relationType: RelationMetadataType.ONE_TO_MANY,
        fromObjectMetadataId: SeedObjectMetadataIds.Automation,
        toObjectMetadataId: SeedObjectMetadataIds.AutomationTarget,
        fromFieldMetadataId: SeedAutomationFieldMetadataIds.AutomationTargets,
        toFieldMetadataId: SeedAutomationTargetFieldMetadataIds.Automation,
        workspaceId: SeedWorkspaceId,
      },
    ])
    .execute();
};
