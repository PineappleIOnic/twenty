import { EntityForSelect } from '@/ui/input/relation-picker/types/EntityForSelect';

export type FieldUuidMetadata = {
  objectMetadataNameSingular?: string;
  fieldName: string;
};

export type FieldBooleanMetadata = {
  objectMetadataNameSingular?: string;
  fieldName: string;
};

export type FieldTextMetadata = {
  objectMetadataNameSingular?: string;
  placeHolder: string;
  fieldName: string;
};

export type FieldDateTimeMetadata = {
  objectMetadataNameSingular?: string;
  placeHolder: string;
  fieldName: string;
};

export type FieldNumberMetadata = {
  objectMetadataNameSingular?: string;
  fieldName: string;
  placeHolder: string;
  isPositive?: boolean;
};

export type FieldLinkMetadata = {
  objectMetadataNameSingular?: string;
  placeHolder: string;
  fieldName: string;
};

export type FieldCurrencyMetadata = {
  objectMetadataNameSingular?: string;
  fieldName: string;
  placeHolder: string;
  isPositive?: boolean;
};

export type FieldFullNameMetadata = {
  objectMetadataNameSingular?: string;
  placeHolder: string;
  fieldName: string;
};

export type FieldEmailMetadata = {
  objectMetadataNameSingular?: string;
  placeHolder: string;
  fieldName: string;
};

export type FieldPhoneMetadata = {
  objectMetadataNameSingular?: string;
  placeHolder: string;
  fieldName: string;
};

export type FieldProbabilityMetadata = {
  objectMetadataNameSingular?: string;
  fieldName: string;
};

export type FieldDefinitionRelationType =
  | 'FROM_MANY_OBJECTS'
  | 'FROM_ONE_OBJECT'
  | 'TO_MANY_OBJECTS'
  | 'TO_ONE_OBJECT';

export type FieldRelationMetadata = {
  objectMetadataNameSingular?: string;
  fieldName: string;
  useEditButton?: boolean;
  relationType?: FieldDefinitionRelationType;
  relationObjectMetadataNameSingular: string;
  relationObjectMetadataNamePlural: string;
};

export type FieldMetadata =
  | FieldBooleanMetadata
  | FieldNumberMetadata
  | FieldDateTimeMetadata
  | FieldTextMetadata
  | FieldUuidMetadata
  | FieldCurrencyMetadata
  | FieldLinkMetadata
  | FieldPhoneMetadata
  | FieldEmailMetadata
  | FieldProbabilityMetadata
  | FieldRelationMetadata
  | FieldFullNameMetadata;

export type FieldTextValue = string;
export type FieldUUidValue = string;
export type FieldDateTimeValue = string | null;
export type FieldNumberValue = number | null;
export type FieldBooleanValue = boolean;

export type FieldPhoneValue = string;
export type FieldEmailValue = string;
export type FieldLinkValue = { url: string; label: string };
export type FieldCurrencyValue = {
  currencyCode: string;
  amountMicros: number | null;
};
export type FieldFullNameValue = { firstName: string; lastName: string };
export type FieldProbabilityValue = number;

export type FieldRelationValue = EntityForSelect | null;
