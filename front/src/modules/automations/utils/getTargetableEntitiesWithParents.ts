import { AutomationTargetableEntity } from '../types/AutomationTargetableEntity';

export const getTargetableEntitiesWithParents = (
  entities: AutomationTargetableEntity[],
): AutomationTargetableEntity[] => {
  const entitiesWithRelations: AutomationTargetableEntity[] = [];
  for (const entity of entities ?? []) {
    entitiesWithRelations.push(entity);
    if (entity.relatedEntities) {
      for (const relatedEntity of entity.relatedEntities ?? []) {
        entitiesWithRelations.push(relatedEntity);
      }
    }
  }
  return entitiesWithRelations;
};
